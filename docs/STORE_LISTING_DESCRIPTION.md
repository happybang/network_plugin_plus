# Chrome Web Store Listing Description / 商店文案

> Copy-paste ready for the **Chrome Web Store Developer Dashboard** (Store Listing tab).  
> Suitable for global audiences with both **English (Primary)** and **Chinese (中文)** versions.

---

## 🇺🇸 English Version (Primary Store Listing)

### Summary (Short Description - max 132 chars)
1-click clean cURL, instant Bearer tokens, response JSON & custom export templates right in Chrome DevTools. Zero noise, 100% local.

---

### Detailed Description (Full Text)

**Tired of the "DevTools Mouse Dance" just to copy an API request?**

Picture this: It's 4:30 PM. Your backend teammate drops a message in Slack: *"Hey, that checkout API returned a 500 error, can you send me the request?"*

You open Chrome DevTools:
1. Right-click the request row.
2. Hover over `Copy` -> select `Copy as cURL (bash)`.
3. Paste it into Slack... and suddenly, a **45-line wall of junk** fills the chat!
   `sec-ch-ua: "Not_A Brand";v="8"`, `sec-fetch-dest: empty`, `priority: u=1, i`, and 20 tracking cookies nobody asked for.
   Your teammate sighs: *"Bro, which header actually matters? And where is the payload?"*

Or worse: You just need the `Authorization: Bearer eyJhbG...` token to test an endpoint in Postman. You click the request, switch to Headers, scroll past 30 headers, carefully highlight the token without accidentally selecting trailing spaces, and copy it. You do this **30 times a day**. That's 150 clicks and 15 minutes of wasted cognitive energy every single day.

---

### 🚀 Enter Network+ — The DevTools Supercharger

**Network+** is the DevTools extension built by developers who refuse to tolerate repetitive friction. It adds an ultra-fast, customizable Quick Copy toolbar directly to your Network request table.

No more drawer hunting. No more 40-line bloated cURLs. **One click, and you're done.**

---

### ✨ Core Features That Will Save You Hours

#### ⚡️ 1. Clean cURL (Zero Noise)
- Automatically strips browser noise headers: `sec-ch-*`, `sec-fetch-*`, `user-agent`, `accept-language`, `priority`.
- Preserves only the essentials: `Authorization`, `Content-Type`, `Cookie`, and your custom headers.
- Single-quote shell escaped and terminal-ready. Paste into terminal or Postman and it just works.

#### 🎯 2. Instant Row-Level Quick Actions
Every single request in your table gets immediate 1-click action pills:
- **`[Tpl]`**: Copies your active custom template (e.g., Bug Report snippet).
- **`[cURL]`**: Copies sanitized clean cURL.
- **`[URL]`**: Copies the full request URL.
- **`[Req]`**: Copies pretty-printed or raw Request body.
- **`[Resp]`**: Copies pretty-printed Response JSON payload.
- **`[Cookie]` / `[Auth]`**: Extracts exact header values instantly.

#### 🧩 3. Magic Custom Template Engine
Never manually write another bug report or API note. Define dynamic templates using intuitive placeholders:
- `{{url}}`, `{{path}}`, `{{method}}`, `{{status}}`
- `{{header.Authorization}}`, `{{resp.header.Content-Type}}`
- `{{request.body}}`, `{{response.body}}`, `{{curl}}`

Click **`[Tpl]`** on any row, and a perfectly formatted Markdown bug report or Postman test payload is on your clipboard in **0.1 seconds**.

#### ⚙️ 4. Fully Customizable Quick Buttons (Your Workflow, Your Way)
Every engineering team has different habits. Click **⚙️** in the table header to open the Quick Button Manager:
- **Reorder & Rename**: Move your most-used buttons to the front.
- **Custom Header Buttons**: Add a 1-click button for `x-trace-id`, `x-request-id`, or `tenant-id`.
- **Multiple Template Buttons**: Bind specific buttons to specific templates (e.g. `[BugReport]`, `[PostmanJSON]`).
- **Show/Hide**: Keep your table clean and minimal.

#### 🌓 5. Native DevTools Aesthetics & Split Drawer
- Seamlessly mirrors Chrome DevTools Dark and Light themes.
- Dedicated detail drawer with live syntax tabs: **Headers**, **Payload**, **Response**, and **Live Template Preview**.

#### 🌐 6. Global Internationalization (10 Languages)
Automatically detects your Chrome language or DevTools settings:
- English, 简体中文, 繁體中文, 日本語, 한국어, Español, Français, Deutsch, Русский, Português (Brasil).

#### 🔒 7. 100% Local & Privacy Guaranteed
- **Zero telemetry. Zero external servers. Zero analytics.**
- Pure Vanilla JavaScript running locally within DevTools.
- Open source under the MIT License.

---

### 🛠 How to Use
1. Open Chrome DevTools (`F12` or `Cmd + Option + I`).
2. Switch to the **Network+** tab in the top navigation.
3. Browse your web application — network requests stream in real-time.
4. Click any quick pill (`Tpl`, `cURL`, `Req`, `Resp`) on any row to copy instantly.
5. Click **Templates** or **⚙️** in the header to tailor templates and buttons to your exact flow.

---

*Made with ❤️ for frontend engineers, backend developers, QA testers, and API architects.*

---
---

## 🇨🇳 中文版（Chrome 商店中文文案 / 推广文案）

### 一句话简介（132 字符以内）
DevTools 网络面板效率神器：一键复制纯净 cURL、Token 与响应 JSON，支持自定义导出模版与行快捷键。零冗余、纯本地。

---

### 详细介绍（沉浸式文案）

**你每天在 Chrome 开发者工具里，还要做多少次低效的“鼠标体操”？**

想象这样一个场景：下午 4:30，后端同事在 Slack / 钉钉发来消息：  
*“刚才那个下单接口报了 500，把完整的请求发我看看。”*

你熟练地打开 Chrome DevTools：
1. 在 Network 面板找到那行请求，右键。
2. 鼠标小心翼翼移到 `Copy` -> 点击 `Copy as cURL (bash)`。
3. 粘贴到聊天窗口……瞬间弹出 **40 多行冗余垃圾**！  
   `sec-ch-ua: "Not_A Brand"`, `sec-fetch-dest: empty`, `priority: u=1, i`，还有一堆和业务无关的追踪 Cookie。  
   后端叹气：*“兄弟，哪个才是真正的 Header？Body 在哪儿？”*

还有更折磨的：你只是想取一下 `Authorization: Bearer eyJhbG...` 的 Token 去 Postman 跑一下测试。  
你得先点进请求，切换到 Headers 标签，在一大串 Header 里翻滚寻找，小心翼翼用光标选准 Token 字符，千万别带多空格，复制，再切回 Postman。  
**这样的操作，每个研发每天要重复 30 到 50 次。每天平白无故浪费十多分钟，全被消磨在这种无意义的机械点击中！**

---

### 🚀 拯救效率的 DevTools 神器：Network+

**Network+** 是一款专为拒绝低效机械劳动的开发者打造的 Chrome 扩展。  
它直接在 DevTools 网络面板的每一行请求右侧，赋予你极致顺手的**一键复制胶囊**。

不再需要点进抽屉翻找，不再需要忍受 40 行的冗余 cURL。**一次点击，秒级搞定。**

---

### ✨ 亮点功能：为日常开发痛点而生

#### ⚡️ 1. 极致纯净的 Clean cURL（告别噪音）
- 自动剔除浏览器的无用指纹 Header（`sec-ch-*`、`sec-fetch-*`、`user-agent`、`priority` 等）。
- 仅保留核心凭证与业务数据：`Authorization`、`Content-Type`、`Cookie` 以及你的自定义 Header。
- 自动进行 Shell 字符转义，粘贴到终端或接口调试工具即可直接运行！

#### 🎯 2. 行内即开即用的快捷复制胶囊
每一行请求右侧，直接外露最常用的操作按钮：
- **`[Tpl]`**：一键按激活的模版复制（如 Bug 单一键导出）。
- **`[cURL]`**：一键复制纯净 cURL。
- **`[URL]`**：一键提取完整请求链接。
- **`[Req]`**：一键提取格式化或原始请求体。
- **`[Resp]`**：一键提取返回的 JSON 数据。
- **`[Cookie]` / `[Auth]`**：一键提取 Token 凭据。

#### 🧩 3. 强大且灵活的自定义模版引擎
写 Bug 缺陷单、接口交接文档、或导出自动化测试用例，再也不用手动拼凑！支持丰富的占位符：
- `{{url}}`, `{{path}}`, `{{method}}`, `{{status}}`
- `{{header.Authorization}}`, `{{resp.header.Content-Type}}`
- `{{request.body}}`, `{{response.body}}`, `{{curl}}`

配置好模版后，在任何请求行点击 **`[Tpl]`**，一份排版优美的 Markdown 缺陷报告瞬间已在你的剪贴板中！

#### ⚙️ 4. 彻底自由的快捷按钮定制（你的工作流，由你定义）
每个团队习惯各不相同。点击表头的 **⚙️** 按钮，即可打开快捷按钮管理抽屉：
- **自由排序与改名**：把最常用的按钮移到最前面，给按钮起顺手的名字。
- **添加自定义 Header 按钮**：一键提取 `x-trace-id`、`x-request-id`、`tenant-id` 等全链路追踪 ID。
- **绑定多个模版按钮**：可同时放置 `[缺陷单]` 和 `[Postman]` 多个不同模版按钮。
- **显隐控制**：不需要的按钮随时关闭，保持面板清爽。

#### 🌓 5. 像素级还原 DevTools 原生体验
- 自动跟随 Chrome 开发者工具的浅色/深色主题。
- 提供直观的右侧详情抽屉，包含 Headers、Payload、Response 和实时模版预览。

#### 🌐 6. 完备的 10 国语言国际化支持
根据浏览器语言或 Chrome 设置无缝切换：
- 英语、简体中文、繁体中文、日语、韩语、西班牙语、法语、德语、俄语、葡萄牙语。

#### 🔒 7. 100% 本地运行与绝对隐私保护
- **无后台网络上报、无埋点、无第三方数据收集。**
- 纯本地原生 JavaScript 驱动，所有计算在 DevTools 隔离沙箱内完成。
- 基于 MIT 协议开源。

---

### 🛠 使用方法
1. 打开 Chrome 开发者工具（快捷键 `F12` 或 `Cmd + Option + I`）。
2. 在顶部导航栏切换至 **Network+** 标签页。
3. 像平时一样在网页中进行操作，网络请求将实时显示。
4. 在任意行点击快捷胶囊（`Tpl`、`cURL`、`Req`、`Resp` 等）即可瞬间复制所需内容！
5. 点击表头的 **Templates** 或 **⚙️** 即可量身定制属于你的高效模版与快捷键。
