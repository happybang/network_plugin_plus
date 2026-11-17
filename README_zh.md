<div align="center">

# ⚡️ Network+ 

### 专为开发者打造的 Chrome DevTools 极速网络复制与模版导出神器

[![Manifest V3](https://img.shields.io/badge/Chrome-Manifest%20V3-blue.svg?logo=google-chrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![CI](https://github.com/happybang/network_plugin_plus/actions/workflows/ci.yml/badge.svg)](https://github.com/happybang/network_plugin_plus/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/happybang/network_plugin_plus/pulls)
[![Pure Vanilla JS](https://img.shields.io/badge/Dependencies-0-orange.svg)](#)

<p align="center">
  <b>让接口复制不再痛苦：一键复制纯净 cURL、提取 Token、按自定义模版导出 API 调试信息。</b>
  <br />
  零学习成本 · 高仿 Chrome 原生体验 · 完全本地离线运行
  <br /><br />
  <a href="README.md">English</a> • <b>简体中文</b>
</p>

[痛点对比](#-为什么需要-network) • [核心特性](#-核心特性) • [模版玩法](#-自由定制模版模版语法) • [快速安装](#-1-分钟安装指南) • [安全与隐私](#-安全与隐私承诺)

---

</div>

## 😩 痛点直击：原生 Network 到底有多繁琐？

每天联调接口、给后端提 Bug、写 API 文档或调试时，你是否受够了以下操作：

| 场景 | 原生 Chrome DevTools 的痛苦过程 | ⚡️ Network+ 的解法 |
| :--- | :--- | :--- |
| **复制 cURL** | 拷出来的 cURL 带了 20+ 行 `sec-ch-ua*`、`sec-fetch-*` 垃圾浏览头，终端里糊成一团 | **一键生成 Clean cURL**，自动过滤噪点头，清爽可读，直接发给同事 |
| **提取 Token / Header** | 点开请求 -> 切 Headers 标签 -> 鼠标滑动翻找 -> 小心翼翼双击选中复制，稍不注意拷到空格 | **首行直接提取**，一键拷走 `Authorization` 或 `Cookie` |
| **复制 Request Body** | 点开请求 -> 切 Payload 标签 -> 点 `view source` -> 全选 -> 复制 | **行内直出 `[Req]` 按钮**，1 击到位 |
| **发接口 Bug 给同事** | 手动分别复制 URL、入参、出参、Token，再手动贴进飞书/钉钉/Jira 排版 | **`[模版]` 一键复制**，直接按预设 Markdown / 文本格式全自动组装！ |
| **点击成本** | 右键 -> 瞄准二级菜单 Copy -> 在十几个选项里找 | **表格右侧行内胶囊 + 置顶专属右键菜单** |

---

## ✨ 核心特性

### 1. 📑 自由定制模版引擎（杀手级特性）
支持自定义任意结构的文本模版，使用如 `{{url}}`、`{{header.Authorization}}`、`{{request.body}}` 等直观占位符。
- **点击顶部「⚙️ 模版」**：随时新增、编辑、删除你的专属模版；
- **所见即所得**：输入模版时，下方实时使用当前真实接口渲染预览；
- **行内首位秒拷**：表格行内将 **`[模版]`** 按钮置于第一位，点一下直接按默认模版将内容装配入剪贴板！

### 2. 🧹 纯净版 cURL (Clean cURL)
原生 `Copy as cURL` 会把浏览器的指纹和安全头一股脑全带上（经常多达 30 行），导致终端阅读极其困难。
- Network+ 智能过滤 `sec-ch-ua`、`sec-fetch-dest`、`accept-language`、`priority` 等无意义噪点头；
- 仅保留 `Authorization`、`Content-Type`、`Cookie` 等核心数据，干净优雅。

### 3. 🎯 零层级交互，行内 1 击即拷
表格行内直接提供独立操作胶囊：
```text
[模版]  [cURL]  [URL]  [Req]  [Resp]  [Auth]  [Cookie]
```
无需进入二级菜单，无需切换 Tab，鼠标悬停或轻点即可完成复制。

### 4. 🎨 100% 原生级视觉与无缝适配
- 完美契合 Chrome DevTools 设计语言；
- 自动跟随系统的**暗黑 / 明亮主题**切换；
- 包含实时搜索过滤、资源类型筛选（All / Fetch / JS / CSS 等）、清空与日志持久化。

---

## 📖 自由定制模版：模版语法与经典预设

### 常用占位符速查表

| 变量 | 说明 | 示例渲染结果 |
| :--- | :--- | :--- |
| `{{url}}` | 完整请求 URL | `https://api.example.com/v1/user?id=1001` |
| `{{path}}` | 接口路径 | `/v1/user` |
| `{{method}}` | 请求方式 | `POST` / `GET` |
| `{{status}}` | 状态码 | `200` |
| `{{time}}` | 耗时 | `48 ms` |
| `{{header.HeaderName}}` | **提取任意指定请求头** | `{{header.Authorization}}`、`{{header.x-request-id}}` |
| `{{resp.header.HeaderName}}` | **提取任意指定响应头** | `{{resp.header.Content-Type}}` |
| `{{request.body}}` | 请求载荷（自动美化 JSON） | `{\n  "role": "admin"\n}` |
| `{{response.body}}` | 接口返回体（自动美化 JSON） | `{\n  "code": 0,\n  "data": {...}\n}` |
| `{{curl}}` | 纯净版 cURL 命令行 | `curl '...' -H '...'` |

---

### 💡 经典实战预设推荐

#### 预设 A：Bug 提报与接口联调（开箱自带）
```text
【接口】{{method}} {{path}} ({{status}})
【URL】{{url}}
【Token】{{header.authorization}}
【请求入参】:
{{request.body}}
【接口返回】:
{{response.body}}
```

#### 预设 B：Markdown 接口文档 / 笔记
````markdown
### 接口: `{{method}} {{path}}`
- **URL**: `{{url}}`
- **状态**: `{{status}}`
- **Token**: `{{header.authorization}}`

```json
// Request Body
{{request.body}}
```

```json
// Response Body
{{response.body}}
```
````

#### 预设 C：排错三件套
```text
URL: {{url}}
Authorization: {{header.authorization}}
Cookie: {{header.cookie}}
Payload: {{request.body}}
```

---

## 🚀 1 分钟安装指南

本项目采用纯前端原生开发，**无需任何构建编译**，开箱即用：

1. **克隆或下载本项目到本地**：
   ```bash
   git clone https://github.com/happybang/network_plugin_plus.git
   ```

2. **在 Chrome 中加载扩展**：
   - 打开 Chrome，在地址栏输入：`chrome://extensions/`；
   - 打开右上角的 **“开发者模式” (Developer mode)** 开关；
   - 点击左上角的 **“加载已解压的扩展程序” (Load unpacked)**；
   - 选择刚刚下载/克隆的项目目录。

3. **开始使用**：
   - 按 `F12` 打开控制台，在标签栏找到并点击 **`Network+`**；
   - 触发网络请求，右键或直接点击行内的 **`[模版]`** 按钮试试吧！

---

## 🔒 安全与隐私承诺

- **100% 本地运行**：基于 Chrome 官方 Manifest V3 标准与 DevTools Network API，不含任何外部追踪、统计或上传脚本；
- **零网络外发**：所有数据均在你的浏览器本地处理，连你的自定义模版也仅保存在本地 `localStorage` 中；
- **企业级安全**：代码完全透明开源，无第三方 npm 依赖包，审计无忧。

---

## 🧪 单元测试

核心逻辑（cURL 生成、Noise Header 剥离、模版渲染引擎等）配备严格的自动化测试：

```bash
npm test
# 或者使用 Node 原生测试运行器：
node --test tests/utils.test.js
```

---

## 🤝 贡献与反馈

如果你有任何建议、新特性构想或遇到了 Bug：
- 欢迎提交 [Issue](https://github.com/happybang/network_plugin_plus/issues)
- 欢迎发起 [Pull Request](https://github.com/happybang/network_plugin_plus/pulls)

**如果你觉得这个小工具帮你节省了时间，请给它点一个 ⭐️ Star 鼓励一下吧！**

---

<div align="center">
  <sub>Made with ❤️ for developers by developers. Released under the MIT License.</sub>
</div>
