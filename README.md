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

## 站内 WhatsApp 客服

网站的两个浮动客服按钮会先打开站内会话面板，不会直接跳转浏览器。该功能采用“网页会话 + 阿里云网关 + WhatsApp Business Cloud API”的方式实现：访客消息由同域名的 `/api/whatsapp/` 接口接收，Meta 访问令牌只保存在服务器；项目顾问在 WhatsApp 中按 `#会话编号 回复内容` 回复后，网页会自动拉取并显示回复。

这不是把 WhatsApp Web 嵌入网页。WhatsApp 官方没有提供可直接嵌入的完整聊天窗口，真实收发必须完成 Meta Business、WhatsApp Business Account 和 Cloud API 的开通。未配置时，面板会如实显示“正在配置”，并提供外部 WhatsApp 与项目表单作为降级入口，不会伪装发送成功。

### Meta 侧准备

需要准备以下资料，敏感值不得提交到 Git：

- WhatsApp Business Account（WABA）和已接入 Cloud API 的发送号码。
- Phone Number ID。
- 长期有效的系统用户访问令牌。
- Meta App Secret。
- 自定义 Webhook Verify Token。
- 接收网站提醒的顾问 WhatsApp 号码。它不能与 Cloud API 的发送号码相同。
- 如需在顾问与 Cloud API 号码之间不存在 24 小时会话窗口时主动发送提醒，还需创建并获批一个包含“会话编号、访客消息”两个正文变量的消息模板，并填写 `WHATSAPP_ALERT_TEMPLATE`。模板语言填写在 `WHATSAPP_TEMPLATE_LANGUAGE`。

在服务器创建仅 root 可读的配置：

```bash
cp /opt/zhoupeng-src/deploy/zhoupeng-whatsapp.env.example /etc/zhoupeng-whatsapp.env
chmod 600 /etc/zhoupeng-whatsapp.env
vi /etc/zhoupeng-whatsapp.env
```

一键部署脚本会在该文件不存在时自动创建权限为 `600` 的离线配置并启动网关。因此即使尚未填入 Meta 凭据，健康接口也会返回 `configured: false`，前端能够准确显示配置中状态；填入凭据后重启服务即可启用站内收发。

`WHATSAPP_GRAPH_VERSION` 必须填写 Meta 当前支持的 Graph API 版本，不要沿用过期示例值。填写完成后执行正常的一键部署，脚本会安装并启动 `zhoupeng-whatsapp.service`。Webhook 回调地址配置为：

```text
https://www.zhoupengindustry.com/api/whatsapp/webhook
```

验证状态与日志：

```bash
systemctl status zhoupeng-whatsapp --no-pager
journalctl -u zhoupeng-whatsapp -n 100 --no-pager
curl -fsS https://www.zhoupengindustry.com/api/whatsapp/health
```

健康接口返回 `{"ok":true,"configured":true}` 后，站内输入框才会启用。顾问收到类似 `Website chat #A1B2C3D4` 的提醒后，需要以 `#A1B2C3D4 回复内容` 的格式回复，系统才能把回复准确路由到对应网页会话。

### 本地网关测试

无需 Meta 凭据即可使用 dry-run 验证存储和前端协议：

```bash
WHATSAPP_DRY_RUN=1 CHAT_STORE_DIR=./tmp/chat PORT=8787 node services/whatsapp-chat-gateway.mjs
```

生产环境禁止设置 `WHATSAPP_DRY_RUN=1`。
