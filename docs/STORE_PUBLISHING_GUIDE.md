# Chrome Web Store Publishing Guide / 插件上架指南

This guide walks you through every step to publish **Network+** (`network_plugin_plus`) to the **Chrome Web Store**.

---

## 📋 Pre-Flight Checklist

Before you start, make sure you have:
- [x] A **Google Account**.
- [x] $5 USD (one-time developer registration fee charged by Google).
- [x] The store-ready ZIP archive: `network_plugin_plus.zip` (generated via `npm run build:zip`).
- [x] Store visual assets (located in [`store-assets/`](file:///Users/fengwan/.gemini/antigravity/scratch/chrome-network-copier/store-assets/)):
  - Icon: [`icons/icon128.png`](file:///Users/fengwan/.gemini/antigravity/scratch/chrome-network-copier/icons/icon128.png) (128x128 px)
  - Screenshots:
    - [`store-assets/screenshot-1.png`](file:///Users/fengwan/.gemini/antigravity/scratch/chrome-network-copier/store-assets/screenshot-1.png) (1280x800 px)
    - [`store-assets/screenshot-2.png`](file:///Users/fengwan/.gemini/antigravity/scratch/chrome-network-copier/store-assets/screenshot-2.png) (1280x800 px)
    - [`store-assets/screenshot-3.png`](file:///Users/fengwan/.gemini/antigravity/scratch/chrome-network-copier/store-assets/screenshot-3.png) (1280x800 px)
  - Promo Tile: [`store-assets/promo-tile-440x280.png`](file:///Users/fengwan/.gemini/antigravity/scratch/chrome-network-copier/store-assets/promo-tile-440x280.png) (440x280 px)
- [x] Store listing descriptions ready in [`docs/STORE_LISTING_DESCRIPTION.md`](file:///Users/fengwan/.gemini/antigravity/scratch/chrome-network-copier/docs/STORE_LISTING_DESCRIPTION.md).

---

## Step 1: Register Chrome Web Store Developer Account

1. Visit the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
2. Sign in with your Google account.
3. Accept the Developer Agreement.
4. Pay the **$5 USD** one-time registration fee (via credit card).
5. Complete your developer profile (Display Name, Contact Email).

---

## Step 2: Build the Submission ZIP

In your terminal, run:

```bash
npm run build:zip
```

This executes `scripts/build_zip.py` and creates a clean `network_plugin_plus.zip` in the project root containing only:
- `manifest.json`
- `_locales/` (10 languages)
- `icons/`
- `src/` (panel HTML, CSS, JS, and utils)

*(Tests, docs, and git files are automatically excluded).*

---

## Step 3: Upload Package to Developer Dashboard

1. In the [Developer Dashboard](https://chrome.google.com/webstore/devconsole), click **Add new item** (or **New item** in top right).
2. Drag and drop `network_plugin_plus.zip` into the upload zone.
3. Once processed, the dashboard opens your extension's listing draft.

---

## Step 4: Fill Store Listing Details

Navigate to the **Store listing** tab in the left sidebar:

### 1. Basic Information
- **Title**: Defaults from `manifest.json` (`Network+`).
- **Short description** (max 132 characters):
  ```text
  1-click clean cURL, instant Bearer tokens, response JSON & custom export templates right in Chrome DevTools. Zero noise, 100% local.
  ```
- **Detailed description**:
  - Open [`docs/STORE_LISTING_DESCRIPTION.md`](file:///Users/fengwan/.gemini/antigravity/scratch/chrome-network-copier/docs/STORE_LISTING_DESCRIPTION.md).
  - Copy either the **English version** (recommended for global audience) or the **Chinese version**.
- **Category**: Select **Developer Tools** (开发者工具).
- **Language**: Select **English** (the extension automatically adapts to 10 languages via `_locales/`).

### 2. Graphic Assets
- **Store Icon**: Upload [`icons/icon128.png`](file:///Users/fengwan/.gemini/antigravity/scratch/chrome-network-copier/icons/icon128.png) (128x128).
- **Screenshots**: Upload the 3 high-res screenshots from [`store-assets/`](file:///Users/fengwan/.gemini/antigravity/scratch/chrome-network-copier/store-assets/):
  1. `screenshot-1.png` (Core Value: Clean cURL & 1-Click Copy)
  2. `screenshot-2.png` (Custom Template Engine)
  3. `screenshot-3.png` (Customizable Quick Buttons)
- **Small promo tile (440x280)**: Upload `store-assets/promo-tile-440x280.png`.

---

## Step 5: Complete Privacy Practices (Crucial for Fast Approval)

Navigate to the **Privacy practices** tab in the left sidebar. Google reviewers scrutinize this section:

### 1. Single Purpose
Enter the following:
```text
Enhance the Chrome DevTools Network panel with one-click copying for sanitized cURL commands, Bearer tokens, response payloads, and customizable API export templates.
```

### 2. Permission Justification
For each requested permission in `manifest.json`:
- **`storage`**:
  ```text
  Used strictly to persist the user's custom copy templates and configured quick action buttons locally within the browser.
  ```
- **`cookies`**:
  ```text
  Used strictly to extract cookie headers when the user explicitly triggers a quick copy action or clean cURL copy inside the DevTools panel.
  ```
- **`activeTab`**:
  ```text
  Used to identify and inspect HTTP/HTTPS network traffic for the currently inspected developer tab.
  ```

### 3. Data Usage & Disclosure
- **Does your product collect or transfer user data?**: Select **No, I am not collecting or using user data**.
- **Certification**: Check all compliance boxes (confirming compliance with Chrome Web Store Developer Program Policies).

---

## Step 6: Distribution Settings

Navigate to the **Distribution** tab:
- **Visibility**: Select **Public** (公开) for worldwide release, or **Unlisted** (仅通过链接访问) if you want to test with a select group first.
- **Regions**: All regions (default).
- **Pricing**: Free.

---

## Step 7: Submit for Review

1. Click **Submit for review** in the top right corner.
2. If prompted about delayed review, confirm submission.
3. Review turnaround is typically **24 to 72 hours**.
4. Once approved, your extension will be live on the Chrome Web Store and accessible via a public store URL!

---

## 🔄 How to Release Future Updates

When releasing version `1.0.1` or higher:

1. Update `"version": "1.0.1"` in `manifest.json`.
2. Document new changes in `CHANGELOG.md`.
3. Run tests and rebuild the zip:
   ```bash
   npm test
   npm run build:zip
   ```
4. Go to [Developer Dashboard](https://chrome.google.com/webstore/devconsole), click your extension.
5. Click **Package** -> **Upload updated package**.
6. Click **Submit for review**. Updates typically get approved within 12–24 hours.
