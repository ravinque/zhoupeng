#!/usr/bin/env bash
set -Eeuo pipefail

DOMAIN="${DOMAIN:-zhoupengindustry.com}"
WWW_DOMAIN="${WWW_DOMAIN:-www.zhoupengindustry.com}"
SITE_ROOT="${SITE_ROOT:-/www/wwwroot/zhoupengindustry.com/current}"
CERT_DIR="${CERT_DIR:-/etc/ssl/zhoupengindustry.com}"
EMAIL="${EMAIL:-sales@zhoupengindustry.com}"
DEPLOY_SCRIPT="${DEPLOY_SCRIPT:-/opt/zhoupeng-src/deploy/aliyun-deploy.sh}"

log() { printf '[zhoupeng-https] %s\n' "$*"; }
die() { printf '[zhoupeng-https] ERROR: %s\n' "$*" >&2; exit 1; }

[[ "${EUID}" -eq 0 ]] || die "Please run this script as root."
[[ -f "${SITE_ROOT}/index.html" ]] || die "Deploy the site before enabling HTTPS."

wait_for_dns() {
  local name resolved attempts=0
  for name in "${DOMAIN}" "${WWW_DOMAIN}"; do
    until resolved="$(getent ahostsv4 "${name}" 2>/dev/null | awk 'NR==1 {print $1}')" && \
      [[ "${resolved}" == "47.254.66.200" ]]; do
      attempts=$((attempts + 1))
      ((attempts <= 30)) || die "DNS for ${name} does not resolve to 47.254.66.200 yet."
      log "Waiting for DNS: ${name} (attempt ${attempts}/30)."
      sleep 10
    done
  done
}

wait_for_dns

if [[ ! -x /root/.acme.sh/acme.sh ]]; then
  log "Installing acme.sh."
  curl -fsSL https://get.acme.sh | sh -s email="${EMAIL}"
fi

log "Requesting a Let's Encrypt certificate."
set +e
/root/.acme.sh/acme.sh --issue --server letsencrypt --ecc \
  -d "${DOMAIN}" -d "${WWW_DOMAIN}" -w "${SITE_ROOT}"
issue_status=$?
set -e
if ((issue_status != 0 && issue_status != 2)); then
  die "Certificate issuance failed with status ${issue_status}."
fi

mkdir -p "${CERT_DIR}"
/root/.acme.sh/acme.sh --install-cert --ecc -d "${DOMAIN}" \
  --key-file "${CERT_DIR}/privkey.pem" \
  --fullchain-file "${CERT_DIR}/fullchain.pem" \
  --reloadcmd "${DEPLOY_SCRIPT}"

chmod 600 "${CERT_DIR}/privkey.pem"
log "HTTPS enabled: https://${WWW_DOMAIN}"
