# 洲鹏 / ZhouPeng Smart Home Mall

Modern smart home storefront for 福建洲鹏实业有限公司 / Fujian ZhouPeng Industrial Co., Ltd. It uses
public material from `fjzpsy.com` and a premium custom-home shopping flow
inspired by `oppoliahome.com`.

## Features

- Company homepage sections with factory, equipment, contact, and product-system information.
- Product catalogue for door, wall, cabinet, kitchen, hardware, and supporting systems.
- Quote cart, contact/order form, and customer-service chat flow.
- Front-end login/register demo stored in browser local storage.
- Region modes for Europe/America and Middle East/GCC, including RTL layout.
- GitHub Pages static export under `/zhoupeng`.

## Development

```bash
npm ci
npm run dev
```

Local dev runs through vinext. The app is client-side for storefront workflows,
so the same source can also export to static GitHub Pages.

## Validation

```bash
npm run lint
npm run build
npm run build:pages
```

`npm run build` validates the vinext/Sites build. `npm run build:pages` exports
the static site to `out/` with `/zhoupeng` as the production base path.

## GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`. On every push to
`main`, GitHub Actions installs dependencies, runs `npm run build:pages`, uploads
`out/`, and deploys it with GitHub Pages.

Expected public URL:

```text
https://ravinque.github.io/zhoupeng/
```
