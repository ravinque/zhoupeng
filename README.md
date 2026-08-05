# 福建洲鹏实业全球独立站

福建洲鹏实业有限公司的多语言定制家居独立站，正式域名为
[https://www.zhoupengindustry.com](https://www.zhoupengindustry.com)。项目基于 Next.js
静态导出，支持中文、英文、阿拉伯语、RTL、响应式页面及移动端压缩视频。

## 本地开发

环境要求：Node.js 22.13 或更高版本。

```bash
npm ci
npm run dev
```

提交前执行：

```bash
npm run lint
npm run build:aliyun
```

`build:aliyun` 会在 `out/` 生成部署到根域名的静态站点。`build:pages` 用于生成带
`/zhoupeng` 前缀的 GitHub Pages 版本。

## 生产环境

| 项目 | 当前配置 |
| --- | --- |
| 云服务 | 阿里云轻量应用服务器 |
| 地区 | 美国（硅谷）`us-west-1` |
| 公网 IP | `47.254.66.200` |
| 正式域名 | `www.zhoupengindustry.com` |
| 系统用户 | `root` |
| 源码目录 | `/opt/zhoupeng-src` |
| 网站目录 | `/www/wwwroot/zhoupengindustry.com` |
| 当前版本软链接 | `/www/wwwroot/zhoupengindustry.com/current` |
| 健康检查 | `https://www.zhoupengindustry.com/healthz` |

生产服务器防火墙必须允许 TCP `80` 和 `443`。DNS 记录为：

```text
@    A    47.254.66.200
www  A    47.254.66.200
```

## 首次部署

确认 DNS 和防火墙后，以 `root` 登录服务器并运行：

```bash
curl -fsSL https://raw.githubusercontent.com/ravinque/zhoupeng/main/deploy/aliyun-deploy.sh | bash
```

首次发布完成后启用 HTTPS：

```bash
curl -fsSL https://raw.githubusercontent.com/ravinque/zhoupeng/main/deploy/aliyun-enable-https.sh | bash
```

HTTPS 脚本使用 Let's Encrypt 和 `acme.sh` 签发证书，并安装自动续期与重新加载钩子。
证书续期时会重新执行幂等部署脚本，使 Nginx 始终加载最新证书。

## 日常一键发布

代码合并并推送到 `main` 后，在阿里云轻量应用服务器的“命令助手”执行：

```bash
bash /opt/zhoupeng-src/deploy/aliyun-deploy.sh
```

命令助手推荐配置：

- 命令类型：Shell
- 执行用户：`root`
- 执行路径：`/root`
- 超时时间：`900` 秒

也可以直接执行远程一键命令：

```bash
curl -fsSL https://raw.githubusercontent.com/ravinque/zhoupeng/main/deploy/aliyun-deploy.sh | bash
```

部署脚本会自动：

1. 拉取远程 `main` 最新代码。
2. 使用 `npm ci` 安装锁定版本依赖。
3. 运行 ESLint 质量门禁。
4. 构建根域名静态导出。
5. 创建带 UTC 时间戳的独立发布目录。
6. 原子切换 `current` 软链接，避免半成品文件上线。
7. 校验并平滑重新加载 Nginx。
8. 请求本机 `/healthz`，失败时自动恢复上一版本。
9. 只保留最近三个发布版本，控制磁盘占用。

## 发布后验收

每次发布后至少执行：

```bash
curl -fsS https://www.zhoupengindustry.com/healthz
curl -I http://zhoupengindustry.com/
curl -I https://www.zhoupengindustry.com/
curl -I https://www.zhoupengindustry.com/products/
```

预期结果：

- `/healthz` 返回 `ok`。
- HTTP 根域名和 `www` 均以 `301` 跳转到 HTTPS `www` 域名。
- 首页、产品页、证书页、隐私说明和使用条款返回 `200`。
- 浏览器桌面、平板、手机尺寸下无横向溢出或破图。
- 中英阿语言切换、阿拉伯语 RTL、移动导航、表单校验和两套视频均正常。
- 视频 Range 请求返回 `206`，静态 CSS/JS 带长期缓存并启用 Gzip。

## 回滚和故障处理

脚本会在 Nginx 校验或上线后健康检查失败时自动回滚。需要人工回滚时，先查看可用版本：

```bash
ls -1dt /www/wwwroot/zhoupengindustry.com/releases/*
```

确认目标目录后再切换并检查：

```bash
ln -sfn /www/wwwroot/zhoupengindustry.com/releases/<RELEASE_ID> /www/wwwroot/zhoupengindustry.com/current
/www/server/nginx/sbin/nginx -t
/www/server/nginx/sbin/nginx -s reload
curl -fsS -H 'Host: www.zhoupengindustry.com' http://127.0.0.1/healthz
```

不要在没有确认绝对路径的情况下删除 `releases`、`current` 或网站根目录。

## Zscaler 新域名拦截

如果企业网络提示 `Newly Registered and Observed Domains`，这是 Zscaler 对新域名的
信誉分类，不是服务器故障。处理方式：

1. 请企业 IT 将 `zhoupengindustry.com` 和 `www.zhoupengindustry.com` 加入允许列表。
2. 在 [Zscaler Site Review](https://sitereview.zscaler.com/) 提交重新分类，建议归类为商业或制造业网站。
3. 复审完成前可用移动网络或不经过该企业 Zscaler 策略的网络验收。

## GitHub Pages 预览

推送 `main` 后，`.github/workflows/deploy-pages.yml` 会构建并发布预览站：

[https://ravinque.github.io/zhoupeng/](https://ravinque.github.io/zhoupeng/)

阿里云细节也可查看 [`deploy/README.md`](deploy/README.md)。
