#!/usr/bin/env bash
set -Eeuo pipefail

# ZhouPeng static-site deployment for Alibaba Cloud Light Application Server.
# Safe to run repeatedly. Each successful run keeps the previous release.

REPO_URL="${REPO_URL:-https://github.com/ravinque/zhoupeng.git}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
DOMAIN="${DOMAIN:-zhoupengindustry.com}"
WWW_DOMAIN="${WWW_DOMAIN:-www.zhoupengindustry.com}"
SOURCE_DIR="${SOURCE_DIR:-/opt/zhoupeng-src}"
SITE_DIR="${SITE_DIR:-/www/wwwroot/zhoupengindustry.com}"
RELEASES_DIR="${SITE_DIR}/releases"
CURRENT_LINK="${SITE_DIR}/current"
CERT_DIR="${CERT_DIR:-/etc/ssl/zhoupengindustry.com}"
CERT_FULLCHAIN="${CERT_DIR}/fullchain.pem"
CERT_KEY="${CERT_DIR}/privkey.pem"
RELEASE_ID="$(date -u +%Y%m%d%H%M%S)"
NEW_RELEASE="${RELEASES_DIR}/${RELEASE_ID}"
PREVIOUS_RELEASE="$(readlink -f "${CURRENT_LINK}" 2>/dev/null || true)"

log() { printf '[zhoupeng] %s\n' "$*"; }
die() { printf '[zhoupeng] ERROR: %s\n' "$*" >&2; exit 1; }

[[ "${EUID}" -eq 0 ]] || die "Please run this script as root."

install_packages() {
  local packages=("$@")
  if command -v apt-get >/dev/null 2>&1; then
    apt-get update -y
    DEBIAN_FRONTEND=noninteractive apt-get install -y "${packages[@]}"
  elif command -v dnf >/dev/null 2>&1; then
    # Alibaba's Baota image may exclude Nginx packages even when Nginx is not
    # installed. Disabling repository excludes for this explicit package list
    # keeps first-run provisioning deterministic.
    dnf --disableexcludes=all install -y "${packages[@]}"
  elif command -v yum >/dev/null 2>&1; then
    yum --disableexcludes=all install -y "${packages[@]}"
  else
    die "No supported package manager was found."
  fi
}

ensure_tools() {
  local missing=()
  command -v git >/dev/null 2>&1 || missing+=(git)
  command -v curl >/dev/null 2>&1 || missing+=(curl)
  command -v tar >/dev/null 2>&1 || missing+=(tar)
  ((${#missing[@]} == 0)) || install_packages "${missing[@]}"
}

ensure_node() {
  local node_major=0
  if command -v node >/dev/null 2>&1; then
    node_major="$(node -p 'Number(process.versions.node.split(".")[0])' 2>/dev/null || printf 0)"
  fi
  if ((node_major >= 22)); then
    log "Using Node.js $(node --version)."
    return
  fi

  log "Installing Node.js 22 LTS."
  if command -v apt-get >/dev/null 2>&1; then
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
    DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs
  elif command -v dnf >/dev/null 2>&1; then
    curl -fsSL https://rpm.nodesource.com/setup_22.x | bash -
    dnf install -y nodejs
  elif command -v yum >/dev/null 2>&1; then
    curl -fsSL https://rpm.nodesource.com/setup_22.x | bash -
    yum install -y nodejs
  else
    die "Cannot install Node.js: unsupported package manager."
  fi
}

ensure_swap() {
  local memory_kb swap_kb swap_file
  memory_kb="$(awk '/MemTotal/ {print $2}' /proc/meminfo)"
  swap_kb="$(awk '/SwapTotal/ {print $2}' /proc/meminfo)"
  swap_file="/swapfile-zhoupeng"
  if ((memory_kb < 1572864 && swap_kb < 1048576)); then
    log "Adding a 2 GiB swap file for the production build."
    if [[ ! -f "${swap_file}" ]]; then
      if command -v fallocate >/dev/null 2>&1; then
        fallocate -l 2G "${swap_file}"
      else
        dd if=/dev/zero of="${swap_file}" bs=1M count=2048 status=progress
      fi
      chmod 600 "${swap_file}"
      mkswap "${swap_file}"
    fi
    swapon "${swap_file}" 2>/dev/null || true
    grep -qF "${swap_file} none swap sw 0 0" /etc/fstab || \
      printf '%s\n' "${swap_file} none swap sw 0 0" >> /etc/fstab
  fi
}

find_nginx() {
  if [[ -x /www/server/nginx/sbin/nginx ]]; then
    NGINX_BIN=/www/server/nginx/sbin/nginx
    VHOST_DIR=/www/server/panel/vhost/nginx
  elif command -v nginx >/dev/null 2>&1; then
    NGINX_BIN="$(command -v nginx)"
    if [[ -d /etc/nginx/conf.d ]]; then
      VHOST_DIR=/etc/nginx/conf.d
    else
      VHOST_DIR=/etc/nginx/sites-enabled
    fi
  else
    log "Installing Nginx."
    install_packages nginx
    NGINX_BIN="$(command -v nginx)"
    VHOST_DIR=/etc/nginx/conf.d
  fi
  mkdir -p "${VHOST_DIR}"
  VHOST_FILE="${VHOST_DIR}/${DOMAIN}.conf"
}

checkout_source() {
  if [[ -d "${SOURCE_DIR}/.git" ]]; then
    log "Updating source from ${DEPLOY_BRANCH}."
    git -C "${SOURCE_DIR}" fetch --prune origin "${DEPLOY_BRANCH}"
    git -C "${SOURCE_DIR}" checkout -B deployment "origin/${DEPLOY_BRANCH}"
    git -C "${SOURCE_DIR}" reset --hard "origin/${DEPLOY_BRANCH}"
    git -C "${SOURCE_DIR}" clean -fd -e .env -e .env.local
  else
    rm -rf "${SOURCE_DIR}"
    git clone --depth 1 --branch "${DEPLOY_BRANCH}" "${REPO_URL}" "${SOURCE_DIR}"
  fi
}

build_release() {
  log "Installing locked dependencies."
  cd "${SOURCE_DIR}"
  npm ci --no-audit --no-fund
  log "Running the production lint gate."
  npm run lint
  log "Building the root-domain static export."
  NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=768}" npm run build:aliyun
  [[ -f out/index.html ]] || die "Static export did not produce out/index.html."
  mkdir -p "${NEW_RELEASE}"
  cp -a out/. "${NEW_RELEASE}/"
  printf '%s\n' "${RELEASE_ID}" > "${NEW_RELEASE}/.release"
}

write_nginx_config() {
  VHOST_BACKUP=""
  if [[ -f "${VHOST_FILE}" ]]; then
    VHOST_BACKUP="${VHOST_FILE}.bak.${RELEASE_ID}"
    cp -a "${VHOST_FILE}" "${VHOST_BACKUP}"
  fi
  if [[ -s "${CERT_FULLCHAIN}" && -s "${CERT_KEY}" ]]; then
    cat > "${VHOST_FILE}" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} ${WWW_DOMAIN};
    location ^~ /.well-known/acme-challenge/ { root ${CURRENT_LINK}; }
    location = /healthz {
        access_log off;
        add_header Content-Type text/plain;
        return 200 "ok\n";
    }
    location / { return 301 https://www.zhoupengindustry.com\$request_uri; }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ${DOMAIN} ${WWW_DOMAIN};
    ssl_certificate ${CERT_FULLCHAIN};
    ssl_certificate_key ${CERT_KEY};
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    root ${CURRENT_LINK};
    index index.html;
    charset utf-8;
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 5;
    gzip_types text/plain text/css application/javascript application/json application/xml image/svg+xml;

    location / { try_files \$uri \$uri/ \$uri/index.html =404; }
    location ^~ /_next/static/ {
        try_files \$uri =404;
        access_log off;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    location ~* \.(?:avif|webp|jpg|jpeg|png|gif|svg|ico|woff2|mp4|webm)\$ {
        try_files \$uri =404;
        access_log off;
        expires 30d;
        add_header Cache-Control "public";
    }
    location = /healthz {
        access_log off;
        add_header Content-Type text/plain;
        return 200 "ok\n";
    }
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
}
EOF
  else
    cat > "${VHOST_FILE}" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN} ${WWW_DOMAIN} 47.254.66.200;
    root ${CURRENT_LINK};
    index index.html;
    charset utf-8;
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 5;
    gzip_types text/plain text/css application/javascript application/json application/xml image/svg+xml;

    location / { try_files \$uri \$uri/ \$uri/index.html =404; }
    location ^~ /_next/static/ {
        try_files \$uri =404;
        access_log off;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    location ~* \.(?:avif|webp|jpg|jpeg|png|gif|svg|ico|woff2|mp4|webm)$ {
        try_files \$uri =404;
        access_log off;
        expires 30d;
        add_header Cache-Control "public";
    }
    location = /healthz {
        access_log off;
        add_header Content-Type text/plain;
        return 200 "ok\n";
    }
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
}
EOF
  fi
}

activate_release() {
  ln -sfn "${NEW_RELEASE}" "${CURRENT_LINK}.next"
  mv -Tf "${CURRENT_LINK}.next" "${CURRENT_LINK}"
  if ! "${NGINX_BIN}" -t; then
    log "Nginx validation failed; restoring the previous version."
    if [[ -n "${PREVIOUS_RELEASE}" && -d "${PREVIOUS_RELEASE}" ]]; then
      ln -sfn "${PREVIOUS_RELEASE}" "${CURRENT_LINK}"
    fi
    if [[ -n "${VHOST_BACKUP}" && -f "${VHOST_BACKUP}" ]]; then
      cp -a "${VHOST_BACKUP}" "${VHOST_FILE}"
    else
      rm -f "${VHOST_FILE}"
    fi
    "${NGINX_BIN}" -t || true
    die "Deployment rolled back because the Nginx configuration was invalid."
  fi
  "${NGINX_BIN}" -s reload 2>/dev/null || \
    systemctl reload nginx 2>/dev/null || \
    systemctl enable --now nginx 2>/dev/null || \
    "${NGINX_BIN}"
  local health_attempt health_passed=0
  for health_attempt in {1..10}; do
    if curl --noproxy '*' -fsS -H "Host: ${WWW_DOMAIN}" http://127.0.0.1/healthz | grep -qx 'ok'; then
      health_passed=1
      break
    fi
    sleep 1
  done
  if ((health_passed == 0)); then
    log "Post-deployment health check failed; restoring the previous version."
    if [[ -n "${PREVIOUS_RELEASE}" && -d "${PREVIOUS_RELEASE}" ]]; then
      ln -sfn "${PREVIOUS_RELEASE}" "${CURRENT_LINK}"
    fi
    if [[ -n "${VHOST_BACKUP}" && -f "${VHOST_BACKUP}" ]]; then
      cp -a "${VHOST_BACKUP}" "${VHOST_FILE}"
    fi
    "${NGINX_BIN}" -t && ("${NGINX_BIN}" -s reload 2>/dev/null || systemctl reload nginx)
    die "Deployment rolled back because the health check failed."
  fi
  log "Post-deployment health check passed."
  find "${RELEASES_DIR}" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' \
    | sort -nr | awk 'NR>3 {sub(/^[^ ]+ /, ""); print}' \
    | xargs -r rm -rf --
}

main() {
  log "Starting release ${RELEASE_ID}."
  ensure_tools
  ensure_node
  ensure_swap
  find_nginx
  checkout_source
  build_release
  mkdir -p "${RELEASES_DIR}"
  write_nginx_config
  activate_release
  log "Deployment complete: ${NEW_RELEASE}"
  log "Health check: http://47.254.66.200/healthz"
  if [[ -s "${CERT_FULLCHAIN}" && -s "${CERT_KEY}" ]]; then
    log "Domain: https://${WWW_DOMAIN}"
  else
    log "Domain: http://${WWW_DOMAIN} (run deploy/aliyun-enable-https.sh after DNS propagation)"
  fi
}

main "$@"
