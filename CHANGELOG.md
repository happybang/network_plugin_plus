# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-11-20

### Added
- **Configurable Quick Buttons**:
  - Modal manager accessible via the header gear icon (`⚙️`).
  - Toggle, rename, and reorder row quick copy buttons.
  - Support for multiple template buttons and custom header buttons (e.g. `x-trace-id`, `x-request-id`, `tenant-id`).
  - Persistent state in `chrome.storage.local`.
- **Full Internationalization (i18n)**:
  - Official Chrome Extension `_locales/` support for 10 languages (`en`, `zh_CN`, `zh_TW`, `ja`, `ko`, `es`, `fr`, `de`, `ru`, `pt_BR`).
  - Automatic runtime localized DOM attribute translation (`data-i18n`, `data-i18n-title`, `data-i18n-placeholder`).
- **Store Assets & Headless Generator**:
  - Auto-generation of official 1280x800 PNG screenshots (`screenshot-1.png`, `screenshot-2.png`, `screenshot-3.png`) and 440x280 promo tile (`promo-tile-440x280.png`).
  - Interactive HTML5 canvas screenshot exporter `store-assets/screenshot-generator.html`.
- **Chrome Web Store Publishing Documentation**:
  - Comprehensive step-by-step submission guide `docs/STORE_PUBLISHING_GUIDE.md`.
  - Immersive developer story and store listing copy `docs/STORE_LISTING_DESCRIPTION.md`.
  - Automated clean package builder `npm run build:zip` (`scripts/build_zip.py`).
- **High-fidelity DevTools UI**: Authentic Chrome DevTools appearance, automatically supporting light and dark themes.
- **Custom Copy Templates Engine**:
  - Live preview modal for adding, editing, and deleting customizable templates.
  - Variable insertion tags for quick template composition.
  - Real-time rendering with `{{url}}`, `{{path}}`, `{{method}}`, `{{status}}`, `{{header.<Name>}}`, `{{request.body}}`, `{{response.body}}`, and `{{curl}}`.
  - Row-level `[Tpl]` shortcut placed first in the quick copy actions.
  - Dedicated `Template` tab in the request details drawer.
- **Clean cURL Generation**:
  - Automatically filters browser noise headers (`sec-ch-ua*`, `sec-fetch-*`, `accept-encoding`, etc.) for concise terminal/Postman execution.
- **One-click Quick Actions**:
  - Row buttons: `[Tpl]`, `[cURL]`, `[URL]`, `[Req]`, `[Resp]`, `[Auth]`, `[Cookie]`.
- **Custom Context Menu**:
  - Right-click any request row for instant copying of Clean cURL, Full cURL, URL, Response plaintext, Request body, and specific headers.
- **Filter & Search**:
  - URL/method search bar and resource type filter pills (All, Fetch/XHR, Doc, JS, CSS, Img, Other).
- **Automated Tests**:
  - Comprehensive unit test suite covering cURL generation, template rendering, and header/body parsing.
