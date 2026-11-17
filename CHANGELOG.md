# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-11-17

### Added
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
