# Alibaba Cloud deployment

Run as `root` on the Alibaba Cloud Light Application Server:

```bash
curl -fsSL https://raw.githubusercontent.com/ravinque/zhoupeng/main/deploy/aliyun-deploy.sh | bash
```

After both `@` and `www` DNS A records resolve to `47.254.66.200`, enable HTTPS once:

```bash
curl -fsSL https://raw.githubusercontent.com/ravinque/zhoupeng/main/deploy/aliyun-enable-https.sh | bash
```

The certificate renews automatically through `acme.sh`; its renewal hook reruns the
idempotent deploy script so Nginx always receives the renewed certificate.

The script is idempotent. It builds from `main`, publishes to a timestamped
release directory, atomically switches the `current` symlink, validates Nginx,
and restores the previous release if validation fails. The three newest
releases are retained.

Required DNS records:

- `@` A `47.254.66.200`
- `www` A `47.254.66.200`

Required firewall ports: TCP `80` and `443`.
