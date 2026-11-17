import {
  getHeader,
  extractHeaders,
  generateCurl,
  formatBody,
  formatSize,
  formatTime,
  filterRequests,
  classifyResourceType,
} from './utils.js';

// Application State
const state = {
  requests: [],
  selectedRequestId: null,
  activeContextRequest: null,
  filterQuery: '',
  filterType: 'all',
  preserveLog: false,
};

// DOM Elements
const el = {
  tableBody: document.getElementById('table-body'),
  emptyState: document.getElementById('empty-state'),
  btnClear: document.getElementById('btn-clear'),
  chkPreserve: document.getElementById('chk-preserve'),
  inputFilter: document.getElementById('input-filter'),
  typePills: document.getElementById('type-pills'),
  requestsCount: document.getElementById('requests-count'),
  detailDrawer: document.getElementById('detail-drawer'),
  drawerTitle: document.getElementById('drawer-title'),
  btnCloseDrawer: document.getElementById('btn-close-drawer'),
  contextMenu: document.getElementById('context-menu'),
  toast: document.getElementById('toast'),
  // Drawer Panes & Buttons
  tabBtns: document.querySelectorAll('.tab-btn'),
  tabPanes: document.querySelectorAll('.tab-pane'),
  headersTree: document.getElementById('headers-tree'),
  payloadContent: document.getElementById('payload-content'),
  responseContent: document.getElementById('response-content'),
  btnCopyAllHeaders: document.getElementById('btn-copy-all-headers'),
  btnCopyAuthHeader: document.getElementById('btn-copy-auth-header'),
  btnCopyCookieHeader: document.getElementById('btn-copy-cookie-header'),
  btnCopyPayload: document.getElementById('btn-copy-payload'),
  btnCopyResponse: document.getElementById('btn-copy-response'),
};

let toastTimer = null;

/**
 * Show a floating toast notification
 */
function showToast(message) {
  if (toastTimer) clearTimeout(toastTimer);
  el.toast.textContent = message;
  el.toast.classList.add('show');
  toastTimer = setTimeout(() => {
    el.toast.classList.remove('show');
  }, 2000);
}

/**
 * Copy text to system clipboard
 */
async function copyToClipboard(text, label = 'Copied to clipboard') {
  if (!text) {
    showToast('Nothing to copy (empty content)');
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    showToast(label);
  } catch (err) {
    console.error('Clipboard copy failed:', err);
    // Fallback using textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast(label);
  }
}

/**
 * Extract clean filename/pathname from full URL
 */
function getUrlDisplayName(urlStr) {
  try {
    const url = new URL(urlStr);
    const pathname = url.pathname;
    if (pathname === '/' || !pathname) {
      return url.host;
    }
    const segments = pathname.split('/').filter(Boolean);
    const last = segments[segments.length - 1] || url.host;
    return url.search ? `${last}${url.search}` : last;
  } catch {
    return urlStr;
  }
}

/**
 * Render the table of network requests
 */
function renderTable() {
  const filtered = filterRequests(state.requests, state.filterQuery, state.filterType);
  el.requestsCount.textContent = `${filtered.length} requests`;

  if (filtered.length === 0) {
    el.tableBody.innerHTML = '';
    el.tableBody.appendChild(el.emptyState);
    el.emptyState.style.display = 'flex';
    return;
  }

  el.emptyState.style.display = 'none';
  el.tableBody.innerHTML = '';

  const fragment = document.createDocumentFragment();

  for (const req of filtered) {
    const row = document.createElement('div');
    row.className = `table-row ${req.id === state.selectedRequestId ? 'selected' : ''}`;
    row.dataset.id = req.id;

    // Status class
    const statusCategory = Math.floor(req.status / 100);
    const statusClass = `status-${statusCategory}xx`;

    const displayName = getUrlDisplayName(req.url);
    const authHeader = getHeader(req.requestHeaders, 'Authorization');
    const cookieHeader = getHeader(req.requestHeaders, 'Cookie');

    row.innerHTML = `
      <div class="td col-name" title="${req.url}">
        ${escapeHtml(displayName)}
      </div>
      <div class="td col-status">
        <span class="status-badge ${statusClass}">${req.status || '-'}</span>
      </div>
      <div class="td col-method">
        <span class="method-tag">${req.method}</span>
      </div>
      <div class="td col-type">${req.resourceType}</div>
      <div class="td col-size">${formatSize(req.size)}</div>
      <div class="td col-time">${formatTime(req.time)}</div>
      <div class="td col-actions">
        <button class="quick-action-btn" data-action="quick-curl" title="Copy clean cURL">cURL</button>
        <button class="quick-action-btn" data-action="quick-url" title="Copy URL">URL</button>
        <button class="quick-action-btn" data-action="quick-req" title="Copy Request Body">Req</button>
        <button class="quick-action-btn" data-action="quick-resp" title="Copy Response Body">Resp</button>
        ${authHeader ? '<button class="quick-action-btn" data-action="quick-auth" title="Copy Auth Token">Auth</button>' : ''}
        ${cookieHeader ? '<button class="quick-action-btn" data-action="quick-cookie" title="Copy Cookie">Cookie</button>' : ''}
      </div>
    `;

    // Row click -> Select and open details
    row.addEventListener('click', (e) => {
      if (e.target.closest('.quick-action-btn')) {
        handleQuickAction(e.target.dataset.action, req);
        return;
      }
      selectRequest(req.id);
    });

    // Row right-click -> Open custom context menu
    row.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      openContextMenu(e, req);
    });

    fragment.appendChild(row);
  }

  el.tableBody.appendChild(fragment);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/**
 * Handle inline quick copy button actions
 */
function handleQuickAction(action, req) {
  switch (action) {
    case 'quick-curl': {
      const curl = generateCurl(
        {
          method: req.method,
          url: req.url,
          headers: req.requestHeaders,
          postData: req.postData,
        },
        { clean: true }
      );
      copyToClipboard(curl, 'Copied clean cURL!');
      break;
    }
    case 'quick-url': {
      copyToClipboard(req.url, 'Copied URL!');
      break;
    }
    case 'quick-req': {
      const body = formatBody(req.postData?.text || '');
      copyToClipboard(body, 'Copied Request Body!');
      break;
    }
    case 'quick-resp': {
      fetchResponseBody(req, (content) => {
        copyToClipboard(formatBody(content), 'Copied Response Body!');
      });
      break;
    }
    case 'quick-auth': {
      const auth = getHeader(req.requestHeaders, 'Authorization');
      copyToClipboard(auth, 'Copied Authorization header!');
      break;
    }
    case 'quick-cookie': {
      const cookie = getHeader(req.requestHeaders, 'Cookie');
      copyToClipboard(cookie, 'Copied Cookie header!');
      break;
    }
  }
}

/**
 * Fetch response body asynchronously
 */
function fetchResponseBody(req, callback) {
  if (req._cachedResponse !== undefined) {
    callback(req._cachedResponse);
    return;
  }
  if (typeof req.getContent === 'function') {
    req.getContent((content) => {
      req._cachedResponse = content || '';
      callback(req._cachedResponse);
    });
  } else {
    callback('');
  }
}

/**
 * Select a request and populate the detail drawer
 */
function selectRequest(id) {
  state.selectedRequestId = id;
  const req = state.requests.find((r) => r.id === id);
  if (!req) return;

  // Highlight selected row
  document.querySelectorAll('.table-row').forEach((r) => {
    r.classList.toggle('selected', r.dataset.id === String(id));
  });

  // Open drawer
  el.detailDrawer.classList.add('open');
  el.drawerTitle.textContent = `${req.method} ${getUrlDisplayName(req.url)}`;

  // Populate Headers Tab
  renderHeadersTab(req);

  // Populate Payload Tab
  renderPayloadTab(req);

  // Populate Response Tab
  renderResponseTab(req);
}

function renderHeadersTab(req) {
  let html = `<div class="headers-section-title">General</div>`;
  html += `
    <div class="header-row"><span class="header-name">Request URL:</span><span class="header-val">${escapeHtml(req.url)}</span></div>
    <div class="header-row"><span class="header-name">Request Method:</span><span class="header-val">${req.method}</span></div>
    <div class="header-row"><span class="header-name">Status Code:</span><span class="header-val">${req.status} ${req.statusText || ''}</span></div>
  `;

  html += `<div class="headers-section-title">Response Headers (${req.responseHeaders.length})</div>`;
  for (const h of req.responseHeaders) {
    html += `<div class="header-row"><span class="header-name">${escapeHtml(h.name)}:</span><span class="header-val">${escapeHtml(h.value)}</span></div>`;
  }

  html += `<div class="headers-section-title">Request Headers (${req.requestHeaders.length})</div>`;
  for (const h of req.requestHeaders) {
    html += `<div class="header-row"><span class="header-name">${escapeHtml(h.name)}:</span><span class="header-val">${escapeHtml(h.value)}</span></div>`;
  }

  el.headersTree.innerHTML = html;
}

function renderPayloadTab(req) {
  const bodyText = req.postData?.text || '';
  if (bodyText) {
    el.payloadContent.textContent = formatBody(bodyText);
  } else {
    el.payloadContent.textContent = '(No request body / payload)';
  }
}

function renderResponseTab(req) {
  el.responseContent.textContent = 'Loading response...';
  fetchResponseBody(req, (content) => {
    if (content) {
      el.responseContent.textContent = formatBody(content);
    } else {
      el.responseContent.textContent = '(No response body available or empty)';
    }
  });
}

/**
 * Custom Context Menu handler
 */
function openContextMenu(e, req) {
  state.activeContextRequest = req;
  const menu = el.contextMenu;

  menu.style.display = 'block';

  // Position with viewport bounds checking
  const menuWidth = 240;
  const menuHeight = 280;
  let x = e.clientX;
  let y = e.clientY;

  if (x + menuWidth > window.innerWidth) {
    x = window.innerWidth - menuWidth - 8;
  }
  if (y + menuHeight > window.innerHeight) {
    y = window.innerHeight - menuHeight - 8;
  }

  menu.style.left = `${Math.max(8, x)}px`;
  menu.style.top = `${Math.max(8, y)}px`;
}

function closeContextMenu() {
  el.contextMenu.style.display = 'none';
  state.activeContextRequest = null;
}

// Global click to close context menu
document.addEventListener('click', (e) => {
  if (!e.target.closest('#context-menu')) {
    closeContextMenu();
  }
});

// Context Menu Action Dispatcher
el.contextMenu.addEventListener('click', (e) => {
  const item = e.target.closest('.menu-item');
  if (!item) return;

  const action = item.dataset.action;
  const req = state.activeContextRequest;
  if (!req) return;

  switch (action) {
    case 'copy-curl-clean': {
      const curl = generateCurl(
        { method: req.method, url: req.url, headers: req.requestHeaders, postData: req.postData },
        { clean: true }
      );
      copyToClipboard(curl, 'Copied clean cURL!');
      break;
    }
    case 'copy-curl-full': {
      const curl = generateCurl(
        { method: req.method, url: req.url, headers: req.requestHeaders, postData: req.postData },
        { clean: false }
      );
      copyToClipboard(curl, 'Copied full cURL!');
      break;
    }
    case 'copy-url': {
      copyToClipboard(req.url, 'Copied URL!');
      break;
    }
    case 'copy-response': {
      fetchResponseBody(req, (content) => {
        copyToClipboard(formatBody(content), 'Copied Response Body!');
      });
      break;
    }
    case 'copy-request-body': {
      const body = formatBody(req.postData?.text || '');
      copyToClipboard(body, 'Copied Request Body!');
      break;
    }
    case 'copy-auth': {
      const auth = getHeader(req.requestHeaders, 'Authorization');
      copyToClipboard(auth, 'Copied Authorization Header!');
      break;
    }
    case 'copy-cookie': {
      const cookie = getHeader(req.requestHeaders, 'Cookie');
      copyToClipboard(cookie, 'Copied Cookie Header!');
      break;
    }
    case 'copy-custom-header': {
      const name = prompt('Enter the header name to copy (e.g. x-request-id, user-agent):');
      if (name) {
        const val = getHeader(req.requestHeaders, name) || getHeader(req.responseHeaders, name);
        if (val) {
          copyToClipboard(val, `Copied header "${name}"!`);
        } else {
          showToast(`Header "${name}" not found in this request.`);
        }
      }
      break;
    }
    case 'view-details': {
      selectRequest(req.id);
      break;
    }
  }

  closeContextMenu();
});

// Drawer Button Actions
el.btnCopyAllHeaders.addEventListener('click', () => {
  const req = state.requests.find((r) => r.id === state.selectedRequestId);
  if (!req) return;
  const reqH = req.requestHeaders.map((h) => `${h.name}: ${h.value}`).join('\n');
  copyToClipboard(reqH, 'Copied Request Headers!');
});

el.btnCopyAuthHeader.addEventListener('click', () => {
  const req = state.requests.find((r) => r.id === state.selectedRequestId);
  if (!req) return;
  const auth = getHeader(req.requestHeaders, 'Authorization');
  copyToClipboard(auth, 'Copied Authorization!');
});

el.btnCopyCookieHeader.addEventListener('click', () => {
  const req = state.requests.find((r) => r.id === state.selectedRequestId);
  if (!req) return;
  const cookie = getHeader(req.requestHeaders, 'Cookie');
  copyToClipboard(cookie, 'Copied Cookie!');
});

el.btnCopyPayload.addEventListener('click', () => {
  const req = state.requests.find((r) => r.id === state.selectedRequestId);
  if (!req) return;
  const body = formatBody(req.postData?.text || '');
  copyToClipboard(body, 'Copied Request Body!');
});

el.btnCopyResponse.addEventListener('click', () => {
  const req = state.requests.find((r) => r.id === state.selectedRequestId);
  if (!req) return;
  fetchResponseBody(req, (content) => {
    copyToClipboard(formatBody(content), 'Copied Response Body!');
  });
});

// Close drawer
el.btnCloseDrawer.addEventListener('click', () => {
  el.detailDrawer.classList.remove('open');
  state.selectedRequestId = null;
  document.querySelectorAll('.table-row.selected').forEach((r) => r.classList.remove('selected'));
});

// Drawer Tabs Switching
el.tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetTab = btn.dataset.tab;
    el.tabBtns.forEach((b) => b.classList.toggle('active', b === btn));
    el.tabPanes.forEach((p) => p.classList.toggle('active', p.id === `pane-${targetTab}`));
  });
});

// Filter & Clear Controls
el.inputFilter.addEventListener('input', (e) => {
  state.filterQuery = e.target.value;
  renderTable();
});

el.typePills.addEventListener('click', (e) => {
  const pill = e.target.closest('.pill');
  if (!pill) return;
  document.querySelectorAll('.pill').forEach((p) => p.classList.remove('active'));
  pill.classList.add('active');
  state.filterType = pill.dataset.type;
  renderTable();
});

el.btnClear.addEventListener('click', () => {
  state.requests = [];
  state.selectedRequestId = null;
  el.detailDrawer.classList.remove('open');
  renderTable();
  showToast('Network log cleared');
});

el.chkPreserve.addEventListener('change', (e) => {
  state.preserveLog = e.target.checked;
});

// Handle incoming DevTools network request
let reqCounter = 0;
function handleRequestFinished(request) {
  reqCounter += 1;
  const mimeType = request.response.content.mimeType || '';
  const url = request.request.url || '';
  const item = {
    id: reqCounter,
    url,
    method: request.request.method,
    status: request.response.status,
    statusText: request.response.statusText,
    resourceType: classifyResourceType(mimeType, url),
    size: request.response.content.size,
    time: request.time,
    requestHeaders: request.request.headers || [],
    responseHeaders: request.response.headers || [],
    postData: request.request.postData,
    getContent: request.getContent ? request.getContent.bind(request) : null,
  };

  state.requests.push(item);
  renderTable();
}

// DevTools Network Event Registration
if (typeof chrome !== 'undefined' && chrome.devtools && chrome.devtools.network) {
  chrome.devtools.network.onRequestFinished.addListener(handleRequestFinished);
  chrome.devtools.network.onNavigated.addListener(() => {
    if (!state.preserveLog) {
      state.requests = [];
      state.selectedRequestId = null;
      el.detailDrawer.classList.remove('open');
      renderTable();
    }
  });
} else {
  // Mock requests for local browser debugging when not in DevTools
  console.log('Running outside DevTools, loading mock requests for testing...');
  setTimeout(() => {
    handleRequestFinished({
      request: {
        method: 'POST',
        url: 'https://api.example.com/v1/auth/login',
        headers: [
          { name: 'Content-Type', value: 'application/json' },
          { name: 'Authorization', value: 'Bearer mock_token_eyJhbGciOiJIUzI1NiJ9' },
          { name: 'Cookie', value: 'session_id=mock_session_98765' },
        ],
        postData: {
          mimeType: 'application/json',
          text: JSON.stringify({ email: 'developer@example.com', pass: 'secret' }),
        },
      },
      response: {
        status: 200,
        statusText: 'OK',
        headers: [
          { name: 'Content-Type', value: 'application/json' },
          { name: 'Cache-Control', value: 'no-cache' },
        ],
        content: {
          size: 1420,
          mimeType: 'application/json',
        },
      },
      time: 48.6,
      getContent: (cb) => cb(JSON.stringify({ code: 0, msg: 'success', data: { userId: 1001, token: 'Bearer mock_token_eyJhbGciOiJIUzI1NiJ9' } })),
    });

    handleRequestFinished({
      request: {
        method: 'GET',
        url: 'https://api.example.com/v1/users/profile?id=1001',
        headers: [
          { name: 'Authorization', value: 'Bearer mock_token_eyJhbGciOiJIUzI1NiJ9' },
          { name: 'Accept', value: 'application/json' },
        ],
      },
      response: {
        status: 200,
        statusText: 'OK',
        headers: [{ name: 'Content-Type', value: 'application/json' }],
        content: {
          size: 890,
          mimeType: 'application/json',
        },
      },
      time: 26.2,
      getContent: (cb) => cb(JSON.stringify({ id: 1001, username: 'dev_user', role: 'admin' })),
    });
  }, 100);
}
