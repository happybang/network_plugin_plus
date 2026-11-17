# Network+ (Chrome Network Copier 扩展)

一款为极致提效打造的 Chrome DevTools 扩展，高仿 Chrome 原生 Network 面板，完美解决原生面板无法自定义右键菜单、无法一键提取特定 Header 和 Request Body 的痛点。

---

## ✨ 核心特性

1. **高仿原生 Network 界面与交互**：
   - 完美适配 Chrome 明亮/暗黑主题；
   - 顶部提供实时搜索过滤（支持过滤 URL、接口路径、Method 等）；
   - 支持资源分类筛选（All / Fetch/XHR / Doc / JS / CSS / Img / Other）；
   - 点击请求行可在右侧抽屉直接查看 Headers、Payload（载荷）、Response（响应体）。

2. **五大一键复制功能（专属定制右键菜单）**：
   在任意请求行**点击右键**，直达定制菜单：
   - 📋 **Copy as cURL (Clean)**：精简版 cURL（自动剔除 `sec-ch-ua*`、`sec-fetch-*` 等浏览器冗余噪点头，只保留核心 Header，清爽直接在终端或 Postman 运行）；
   - 📋 **Copy as cURL (Full)**：完整版 cURL；
   - 🔗 **Copy URL**：一键复制完整请求 URL；
   - 📥 **Copy Response (Plaintext)**：一键复制响应体（格式化 JSON / 纯文本）；
   - 📤 **Copy Request Body (Plaintext)**：一键复制请求载荷（JSON / 纯文本）；
   - 🏷️ **Copy Header: Authorization**：一键复制 Token / 身份认证头；
   - 🏷️ **Copy Header: Cookie**：一键复制该请求携带的 Cookie；
   - ⚙️ **Copy Header: Custom...**：输入任意 Header 名称（如 `x-request-id`、`trace-id`）直接提取其值；
   - 📑 **Copy via Template (模版复制)**：直接使用你预设的模版生成自定义格式。

3. **自由定制复制模版（Custom Template Engine）**：
   - 点击顶部 **`Templates (定制模版)`** 按钮唤出模版管理器；
   - 支持新建、修改、删除模版，并提供**实时渲染预览**；
   - 点击变量胶囊标签（如 `{{url}}`、`{{header.Authorization}}` 等）可一键插入到模版光标处；
   - 模版自动持久化保存在本地；
   - 在请求右侧详情抽屉切换到 **`Template (模版预览)`** 标签，可实时下拉切换模版并一键复制。

4. **行内胶囊快捷按钮（0 次右键，1 击即拷）**：
   表格右侧直接提供 `[cURL]`、`[URL]`、`[Req]`、`[Resp]`、`[Tpl]`、`[Auth]`、`[Cookie]` 快捷胶囊，鼠标轻点一下即可写入系统剪贴板并弹出浮动提示。

---

## 📝 模版变量速查表

| 变量 | 对应内容 | 示例 |
| :--- | :--- | :--- |
| `{{url}}` | 完整请求 URL | `https://api.com/v1/user?id=1` |
| `{{path}}` | 路径 Pathname | `/v1/user` |
| `{{method}}` | 请求方法 | `POST` / `GET` |
| `{{status}}` | 状态码 | `200` |
| `{{time}}` | 耗时 | `48 ms` |
| `{{size}}` | 资源大小 | `1.4 kB` |
| `{{request.body}}` | 请求载荷（格式化 JSON） | `{\n  "name": "tom"\n}` |
| `{{response.body}}` | 响应体（格式化 JSON） | `{\n  "code": 0\n}` |
| `{{header.HeaderName}}` | 提取任意指定请求头 | `{{header.Authorization}}` |
| `{{resp.header.HeaderName}}` | 提取任意指定响应头 | `{{resp.header.Content-Type}}` |
| `{{curl}}` | 精简版 cURL 命令行 | `curl '...' -H '...'` |
| `{{curl.full}}` | 完整版 cURL 命令行 | 包含所有浏览器噪点头 |

---

## 🚀 安装步骤（1 分钟即可完成）

1. **打开 Chrome 扩展程序管理页**：
   在 Chrome 地址栏输入并回车：
   ```text
   chrome://extensions/
   ```

2. **开启“开发者模式”**：
   在页面右上角，打开 **“开发者模式” (Developer mode)** 开关。

3. **加载本扩展**：
   - 点击左上角的 **“加载已解压的扩展程序” (Load unpacked)**；
   - 在弹出的文件选择器中，选择本项目的根目录：
     ```text
     /Users/fengwan/.gemini/antigravity/scratch/chrome-network-copier
     ```
   - 确认选择后，页面中即会出现 **Network+ (Custom Network Copier)** 扩展。

---

## 🎯 使用方法

1. 打开任意网页（例如你的业务系统、Github 或测试网站）；
2. 按 `F12` 或右键选择“检查 (Inspect)”打开 Chrome DevTools；
3. 在 DevTools 顶部标签栏（Elements, Console, Network 旁边）找到并点击 **`Network+`**；
4. 刷新网页或触发业务操作，网络请求便会实时滚动显示；
5. **右键点击任意一条请求**，体验你专属的一键复制菜单！

---

## 🧪 单元测试

本项目核心逻辑（cURL 生成、去除噪点 Header、响应体格式化、大小及耗时转换）均已编写完整单元测试：

```bash
npm test
# 或者使用 Node.js 原生测试器：
node --test tests/utils.test.js
```
