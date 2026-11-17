# Network+ (Chrome Network Copier) Design Document

## 1. Overview
A Chrome DevTools Extension providing a near-native Network inspection experience with instant, custom right-click copy actions and dedicated quick-action buttons.

### Primary Goals
- High-fidelity Chrome DevTools look & feel (auto light/dark theme, table layout, status badges, details panel).
- Solve the 5 key copy requirements directly via custom right-click context menu and one-click buttons:
  1. **cURL**: Full cURL and Clean cURL (removes browser noise headers like `sec-ch-ua*`, `sec-fetch-*`).
  2. **URL**: Clean or full URL.
  3. **Response plaintext**: Raw or formatted response body.
  4. **Request plaintext**: Request payload/body.
  5. **Specific Headers**: One-click copy for `Authorization` (with option to strip `Bearer `), `Cookie`, or arbitrary custom headers.
- Filter toolbar: text search + resource type pills (All, Fetch/XHR, Doc, JS, CSS, Img, Other) + clear button.
- Details inspector: Headers, Payload, and Response tabs with instant copy buttons in each.

## 2. Architecture & File Structure

```
chrome-network-copier/
├── manifest.json            # Manifest V3 configuration
├── src/
│   ├── devtools.html        # Entry point for DevTools page
│   ├── devtools.js          # Creates DevTools panel ("Network+")
│   ├── panel.html           # Main UI for the custom Network panel
│   ├── panel.css            # DevTools-authentic dark/light styling
│   ├── panel.js             # Panel controller & event binding
│   └── utils.js             # Pure logic: cURL generator, header/body extractors
├── tests/
│   └── utils.test.js        # Unit tests using Node.js built-in test runner
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── docs/
│   └── design.md
└── README.md                # Quick installation and usage guide
```

## 3. Core Modules Specification

### `src/utils.js`
- `generateCurl(req, options)`:
  - Supports `--compressed`, appropriate quotes, escaping, and `--data-raw`.
  - `options.clean = true` removes noisy headers (`sec-ch-ua`, `sec-ch-ua-mobile`, `sec-ch-ua-platform`, `sec-fetch-dest`, `sec-fetch-mode`, `sec-fetch-site`, `sec-fetch-user`, `accept-encoding`, `accept-language`, `cache-control`, `connection`, `priority`).
- `getHeader(headers, name)`:
  - Case-insensitive search for a header.
- `extractHeaders(headers, names)`:
  - Extracts specified headers as key-value pairs or formatted string.
- `formatBody(postData)`:
  - Formats JSON if possible or returns raw text.
- `filterRequests(requests, query, typeFilter)`:
  - Matches URL/Method with query and MIME/resource type.

### `src/panel.js`
- Binds to `chrome.devtools.network.onRequestFinished`.
- Maintains request state array.
- Intercepts `contextmenu` on table rows to render custom popup menu at mouse coordinates.
- Displays toast on copy success.
- Detail drawer opens on click, closes on 'x' or ESC.

## 4. Verification Plan
- Unit test all pure logic in `src/utils.js` via `node --test tests/utils.test.js`.
- Test edge cases in cURL escaping, missing body, missing headers, empty response.
- Verify manifest syntax and file references.
