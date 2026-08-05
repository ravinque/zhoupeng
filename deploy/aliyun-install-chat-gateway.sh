#!/usr/bin/env bash
set -Eeuo pipefail

SOURCE_DIR="${SOURCE_DIR:-/opt/zhoupeng-src}"
VHOST_FILE="${VHOST_FILE:-/www/server/panel/vhost/nginx/zhoupengindustry.com.conf}"
NGINX_BIN="${NGINX_BIN:-/www/server/nginx/sbin/nginx}"
BACKUP_FILE=""

[[ "${EUID}" -eq 0 ]] || { printf 'Please run as root.\n' >&2; exit 1; }
[[ -x "${NGINX_BIN}" ]] || { printf 'Nginx binary not found: %s\n' "${NGINX_BIN}" >&2; exit 1; }
[[ -s /etc/ssl/zhoupengindustry.com/fullchain.pem && -s /etc/ssl/zhoupengindustry.com/privkey.pem ]] || {
  printf 'HTTPS certificate files are missing.\n' >&2
  exit 1
}

install -d -m 755 /opt/zhoupeng-whatsapp
install -m 644 "${SOURCE_DIR}/services/whatsapp-chat-gateway.mjs" /opt/zhoupeng-whatsapp/whatsapp-chat-gateway.mjs
install -d -o nobody -m 700 /var/lib/zhoupeng-chat
install -m 644 "${SOURCE_DIR}/deploy/zhoupeng-whatsapp.service" /etc/systemd/system/zhoupeng-whatsapp.service
if [[ ! -e /etc/zhoupeng-whatsapp.env ]]; then
  install -m 600 "${SOURCE_DIR}/deploy/zhoupeng-whatsapp.env.example" /etc/zhoupeng-whatsapp.env
fi
chmod 600 /etc/zhoupeng-whatsapp.env
systemctl daemon-reload
systemctl enable --now zhoupeng-whatsapp
systemctl restart zhoupeng-whatsapp

install -d -m 755 "$(dirname "${VHOST_FILE}")"
if [[ -e "${VHOST_FILE}" ]]; then
  BACKUP_FILE="${VHOST_FILE}.bak.$(date -u +%Y%m%d%H%M%S)"
  cp -a "${VHOST_FILE}" "${BACKUP_FILE}"
fi
install -m 644 "${SOURCE_DIR}/deploy/zhoupengindustry.com.nginx.conf" "${VHOST_FILE}"
if ! "${NGINX_BIN}" -t; then
  if [[ -n "${BACKUP_FILE}" ]]; then cp -a "${BACKUP_FILE}" "${VHOST_FILE}"; else rm -f "${VHOST_FILE}"; fi
  "${NGINX_BIN}" -t || true
  printf 'Nginx validation failed; previous configuration restored.\n' >&2
  exit 1
fi
"${NGINX_BIN}" -s reload

curl -fsS http://127.0.0.1:8787/health | grep -F '"ok":true'
curl -fsS -H 'Host: www.zhoupengindustry.com' http://127.0.0.1/api/whatsapp/health | grep -F '"ok":true'
printf 'WhatsApp gateway and Nginx proxy are healthy.\n'
