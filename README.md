<div align="center">

# ⚡️ Network+ 

### Fast Network Inspection, Clean cURL & Custom Template Exporter for Chrome DevTools

[![Manifest V3](https://img.shields.io/badge/Chrome-Manifest%20V3-blue.svg?logo=google-chrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![CI](https://github.com/happybang/network_plugin_plus/actions/workflows/ci.yml/badge.svg)](https://github.com/happybang/network_plugin_plus/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/happybang/network_plugin_plus/pulls)
[![Pure Vanilla JS](https://img.shields.io/badge/Dependencies-0-orange.svg)](#)

<p align="center">
  <b>Stop painful copy-pasting: One-click Clean cURL, instant Token extraction, and customizable template exporting.</b>
  <br />
  Zero learning curve • Native DevTools look & feel • 100% offline & local
  <br /><br />
  <b>English</b> • <a href="README_zh.md">简体中文</a>
</p>

[Pain Points](#-pain-points-why-network) • [Key Features](#-key-features) • [Template Syntax](#-custom-template-engine) • [Installation](#-quick-start) • [Security & Privacy](#-security--privacy)

---

</div>

## 😩 Pain Points: Why Native Network Panel Slows You Down

When debugging APIs, reporting bugs, writing docs, or collaborating with backend engineers, native DevTools is full of friction:

| Scenario | Native Chrome DevTools Frustrations | ⚡️ Network+ Solution |
| :--- | :--- | :--- |
| **Copy cURL** | Copies 20+ lines of cluttering browser noise (`sec-ch-ua*`, `sec-fetch-*`), messing up terminal output and scripts | **One-click Clean cURL**: Strips noisy headers automatically, keeping commands crisp, clean, and share-ready |
| **Copy Token / Header** | Click request -> switch to Headers tab -> scroll & find -> mouse-select token value carefully | **Direct extraction**: One-click to copy `Authorization` token or `Cookie` |
| **Copy Request Body** | Click request -> switch to Payload tab -> click `view source` -> select all -> copy | **Instant `[Req]` capsule button** on the row |
| **Report API Bug to Team** | Manually copy URL, request body, response, and token, then stitch and format in Slack/Teams/Jira | **One-click `[Tpl]`**: Formats all data automatically using your customized template |
| **Click Overhead** | Right click -> hover over Copy submenu -> hunt through 10+ options | **Zero-click submenus**: High-priority capsule buttons right on each table row |

---

## ✨ Key Features

### 1. 📑 Custom Template Engine (Game Changer)
Compose your own export formats using simple placeholders like `{{url}}`, `{{header.Authorization}}`, `{{request.body}}`, and `{{response.body}}`.
- **Top Toolbar「⚙️ Templates」**: Add, edit, rename, and manage custom templates anytime;
- **Live Preview**: See real-time formatted output using actual inspected requests as you type;
- **Row-level Primary Action**: The **`[Tpl]`** button is placed first in the row action group for instant 1-click exporting!

### 2. 🧹 Clean cURL Generator
Standard `Copy as cURL` clutters terminal history with browser telemetry headers.
- Network+ intelligently strips `sec-ch-ua*`, `sec-fetch-*`, `accept-language`, `priority`, and other noise;
- Retains only essential headers (`Authorization`, `Content-Type`, `Cookie`), ready to run in terminal or import into Postman.

### 3. 🎯 Zero-Click Submenu: Inline Action Pills
Every row has dedicated, instant action pills:
```text
[Tpl]  [cURL]  [URL]  [Req]  [Resp]  [Auth]  [Cookie]
```
No nested menus, no tab switching — click once and it's in your clipboard.

### 4. 🎨 100% Native DevTools Experience
- Matches Chrome DevTools design aesthetics seamlessly;
- Automatically syncs with **Dark / Light theme** based on your DevTools settings;
- Real-time search filter, resource type pills (All / Fetch / JS / CSS / Img / Doc), and split-view details drawer.

---

## 📖 Custom Template Engine: Syntax & Presets

### Available Placeholders

| Placeholder | Description | Example Output |
| :--- | :--- | :--- |
| `{{url}}` | Full Request URL | `https://api.example.com/v1/user?id=1001` |
| `{{path}}` | URL Pathname | `/v1/user` |
| `{{method}}` | HTTP Method | `POST` / `GET` |
| `{{status}}` | HTTP Status Code | `200` |
| `{{time}}` | Duration | `48 ms` |
| `{{size}}` | Transferred Size | `1.4 kB` |
| `{{header.HeaderName}}` | **Extract any Request Header** | `{{header.Authorization}}`, `{{header.x-request-id}}` |
| `{{resp.header.HeaderName}}`| **Extract any Response Header** | `{{resp.header.Content-Type}}` |
| `{{request.body}}` | Formatted Request Body (JSON/Text) | `{\n  "role": "admin"\n}` |
| `{{response.body}}` | Formatted Response Body (JSON/Text)| `{\n  "code": 0\n}` |
| `{{curl}}` | Clean cURL Command | `curl '...' -H '...'` |
| `{{curl.full}}` | Full cURL Command | Including all browser headers |

---

### 💡 Built-in Presets

#### Preset A: Bug Report (Default)
```text
[API] {{method}} {{path}} ({{status}})
[URL] {{url}}
[Token] {{header.authorization}}
[Request]:
{{request.body}}
[Response]:
{{response.body}}
```

#### Preset B: Markdown API Documentation
````markdown
### API: `{{method}} {{path}}`
- **URL**: `{{url}}`
- **Status**: `{{status}}`
- **Token**: `{{header.authorization}}`

```json
// Request
{{request.body}}
```

```json
// Response
{{response.body}}
```
````

#### Preset C: URL + Token Debugging
```text
URL: {{url}}
Authorization: {{header.authorization}}
Cookie: {{header.cookie}}
Payload: {{request.body}}
```

---

## 🚀 Quick Start

Zero build steps required. Pure Vanilla JS running directly in Chrome:

1. **Clone this repository**:
   ```bash
   git clone https://github.com/happybang/network_plugin_plus.git
   ```

2. **Load Unpacked Extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in the top-right corner)
   - Click **Load unpacked** (top-left button)
   - Select the `network_plugin_plus` folder

3. **Start Using**:
   - Press `F12` (or right-click -> `Inspect`) to open DevTools
   - Click the **`Network+`** tab in the top navigation
   - Trigger any network request, then click **`[Tpl]`** or right-click to copy!

---

## 🔒 Security & Privacy

- **100% Local Execution**: Built strictly on Chrome Manifest V3 and official DevTools Network APIs;
- **Zero Network Outbound**: No telemetry, no tracking, and no external analytics. Your requests and tokens never leave your machine;
- **Zero Third-party Dependencies**: Completely auditable, transparent Vanilla JS.

---

## 🧪 Testing

The core utility logic (cURL generation, noise header removal, template rendering engine) is covered by comprehensive unit tests:

```bash
npm test
# Or run with Node built-in test runner:
node --test tests/utils.test.js
```

---

## 🤝 Contributing

Contributions, bug reports, and suggestions are warmly welcomed!
- Feel free to open an [Issue](https://github.com/happybang/network_plugin_plus/issues)
- Submit a [Pull Request](https://github.com/happybang/network_plugin_plus/pulls)

**If Network+ saves you time, please give it a ⭐️ on GitHub!**

---

<div align="center">
  <sub>Made with ❤️ for developers by developers. Released under the MIT License.</sub>
</div>
