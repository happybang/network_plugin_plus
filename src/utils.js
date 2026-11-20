/**
 * Network Copier Utility Functions
 * Pure business logic for formatting, parsing, and cURL generation.
 */

const NOISE_HEADERS = new Set([
  'sec-ch-ua',
  'sec-ch-ua-mobile',
  'sec-ch-ua-platform',
  'sec-fetch-dest',
  'sec-fetch-mode',
  'sec-fetch-site',
  'sec-fetch-user',
  'accept-encoding',
  'accept-language',
  'cache-control',
  'connection',
  'priority',
]);

/**
 * Escapes a string for safe usage inside single-quoted shell argument.
 * Example: abc'def -> 'abc'\''def'
 */
export function escapeShell(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/'/g, "'\\''");
}

/**
 * Get header value by name (case-insensitive).
 */
export function getHeader(headers, name) {
  if (!Array.isArray(headers) || !name) return '';
  const target = name.toLowerCase();
  const found = headers.find(
    (h) => h && h.name && h.name.toLowerCase() === target
  );
  return found ? found.value : '';
}

/**
 * Extracts multiple specific headers as a multiline string.
 */
export function extractHeaders(headers, names) {
  if (!Array.isArray(headers) || !Array.isArray(names)) return '';
  const result = [];
  for (const name of names) {
    const val = getHeader(headers, name);
    if (val) {
      result.push(`${name}: ${val}`);
    }
  }
  return result.join('\n');
}

/**
 * Generates cURL command from request HAR structure.
 * @param {object} req - Request object with method, url, headers, postData
 * @param {object} options - { clean: boolean }
 */
export function generateCurl(req, options = {}) {
  if (!req || !req.url) return '';
  const clean = Boolean(options.clean);
  const parts = [`curl '${escapeShell(req.url)}'`];

  const method = (req.method || 'GET').toUpperCase();
  if (method !== 'GET') {
    parts.push(`-X ${method}`);
  }

  const headers = Array.isArray(req.headers) ? req.headers : [];
  for (const h of headers) {
    if (!h || !h.name) continue;
    const lowerName = h.name.toLowerCase();

    // Skip pseudo headers (:method, :path, etc.)
    if (lowerName.startsWith(':')) continue;

    if (clean && NOISE_HEADERS.has(lowerName)) {
      continue;
    }

    parts.push(`-H '${escapeShell(h.name)}: ${escapeShell(h.value || '')}'`);
  }

  if (req.postData && req.postData.text) {
    parts.push(`--data-raw '${escapeShell(req.postData.text)}'`);
  }

  return parts.join(' \\\n  ');
}

/**
 * Formats body content as pretty JSON or returns raw text.
 */
export function formatBody(content) {
  if (content === null || content === undefined || content === '') {
    return '';
  }
  if (typeof content === 'object') {
    try {
      return JSON.stringify(content, null, 2);
    } catch {
      return String(content);
    }
  }
  if (typeof content === 'string') {
    const trimmed = content.trim();
    if (
      (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
      (trimmed.startsWith('[') && trimmed.endsWith(']'))
    ) {
      try {
        const parsed = JSON.parse(trimmed);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return content;
      }
    }
    return content;
  }
  return String(content);
}

/**
 * Formats byte size into human readable string.
 */
export function formatSize(bytes) {
  if (bytes === -1 || bytes === null || bytes === undefined) {
    return '(disk cache)';
  }
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} kB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Formats millisecond duration into human readable string.
 */
export function formatTime(ms) {
  if (!ms || ms <= 0) return '0 ms';
  if (ms < 1000) return `${Math.round(ms)} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
}

/**
 * Classifies resource type based on mimeType and URL.
 */
export function classifyResourceType(mimeType = '', url = '') {
  const mime = mimeType.toLowerCase();
  const lowerUrl = url.toLowerCase();

  if (mime.includes('json') || mime.includes('xml') || mime.includes('grpc')) {
    return 'fetch';
  }
  if (mime.includes('javascript') || lowerUrl.endsWith('.js')) {
    return 'js';
  }
  if (mime.includes('css') || lowerUrl.endsWith('.css')) {
    return 'css';
  }
  if (
    mime.includes('image') ||
    lowerUrl.match(/\.(png|jpe?g|gif|webp|svg|ico)$/)
  ) {
    return 'img';
  }
  if (mime.includes('html') || lowerUrl.endsWith('.html') || lowerUrl.endsWith('.htm')) {
    return 'doc';
  }
  return 'other';
}

/**
 * Filters requests by text query and resource type.
 */
export function filterRequests(requests, query = '', typeFilter = 'all') {
  if (!Array.isArray(requests)) return [];
  const q = query.trim().toLowerCase();
  const tf = typeFilter.toLowerCase();

  return requests.filter((req) => {
    // Type match
    if (tf !== 'all' && req.resourceType !== tf) {
      return false;
    }

    // Query match
    if (q) {
      const urlMatch = req.url && req.url.toLowerCase().includes(q);
      const methodMatch = req.method && req.method.toLowerCase().includes(q);
      return urlMatch || methodMatch;
    }

    return true;
  });
}

/**
 * Built-in preset templates
 */
export const DEFAULT_TEMPLATES = [
  {
    id: 'tpl_bug_report',
    name: 'Bug Report',
    content: `[API] {{method}} {{path}} ({{status}})
[URL] {{url}}
[Token] {{header.authorization}}
[Request]:
{{request.body}}
[Response]:
{{response.body}}`,
  },
  {
    id: 'tpl_token_url',
    name: 'URL + Token Debug',
    content: `URL: {{url}}
Authorization: {{header.authorization}}
Cookie: {{header.cookie}}
Payload: {{request.body}}`,
  },
  {
    id: 'tpl_markdown',
    name: 'Markdown API Spec',
    content: `### API: \`{{method}} {{path}}\`
- **URL**: \`{{url}}\`
- **Status**: \`{{status}}\`
- **Token**: \`{{header.authorization}}\`

\`\`\`json
// Request Body
{{request.body}}
\`\`\`

\`\`\`json
// Response Body
{{response.body}}
\`\`\``,
  },
];

/**
 * Renders a customizable string template with dynamic request data.
 * Supports:
 * - {{url}}, {{path}}, {{method}}, {{status}}, {{statusText}}, {{time}}, {{size}}
 * - {{curl}}, {{curl.full}}
 * - {{request.body}}, {{request.body.raw}}, {{response.body}}, {{response.body.raw}}
 * - {{header.<Header-Name>}}, {{resp.header.<Header-Name>}}
 */
export function renderTemplate(templateStr, data = {}) {
  if (typeof templateStr !== 'string') return '';

  return templateStr.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (match, key) => {
    const lowerKey = key.toLowerCase();

    if (lowerKey === 'url') return data.url || '';
    if (lowerKey === 'path') return data.path || '';
    if (lowerKey === 'method') return data.method || '';
    if (lowerKey === 'status') return data.status !== undefined ? String(data.status) : '';
    if (lowerKey === 'statustext') return data.statusText || '';
    if (lowerKey === 'time') return data.time || '';
    if (lowerKey === 'size') return data.size || '';
    if (lowerKey === 'curl') return data.curl || '';
    if (lowerKey === 'curl.full') return data.curlFull || '';

    if (lowerKey === 'request.body' || lowerKey === 'req.body' || lowerKey === 'payload') {
      return data.requestBody || '';
    }
    if (lowerKey === 'request.body.raw' || lowerKey === 'req.body.raw') {
      return data.requestBodyRaw || '';
    }

    if (lowerKey === 'response.body' || lowerKey === 'resp.body' || lowerKey === 'response') {
      return data.responseBody || '';
    }
    if (lowerKey === 'response.body.raw' || lowerKey === 'resp.body.raw') {
      return data.responseBodyRaw || '';
    }

    // Request Headers: {{header.<name>}}, {{headers.<name>}}, {{req.header.<name>}}
    if (
      lowerKey.startsWith('header.') ||
      lowerKey.startsWith('headers.') ||
      lowerKey.startsWith('req.header.')
    ) {
      const parts = key.split('.');
      const headerName = parts.slice(lowerKey.startsWith('req.header.') ? 2 : 1).join('.');
      return getHeader(data.requestHeaders, headerName);
    }

    // Response Headers: {{resp.header.<name>}}, {{resp.headers.<name>}}
    if (lowerKey.startsWith('resp.header.') || lowerKey.startsWith('resp.headers.')) {
      const headerName = key.split('.').slice(2).join('.');
      return getHeader(data.responseHeaders, headerName);
    }

    return match;
  });
}

/**
 * Default preset quick copy buttons
 */
export const DEFAULT_QUICK_BUTTONS = [
  {
    id: 'btn_tpl_default',
    type: 'template',
    targetId: 'default',
    label: 'Tpl',
    enabled: true,
    isPrimary: true,
  },
  {
    id: 'btn_curl_clean',
    type: 'curl_clean',
    label: 'cURL',
    enabled: true,
  },
  {
    id: 'btn_url',
    type: 'url',
    label: 'URL',
    enabled: true,
  },
  {
    id: 'btn_req',
    type: 'req_body',
    label: 'Req',
    enabled: true,
  },
  {
    id: 'btn_resp',
    type: 'resp_body',
    label: 'Resp',
    enabled: true,
  },
  {
    id: 'btn_auth',
    type: 'header',
    targetHeader: 'Authorization',
    label: 'Auth',
    enabled: true,
    hideIfMissing: true,
  },
  {
    id: 'btn_cookie',
    type: 'header',
    targetHeader: 'Cookie',
    label: 'Cookie',
    enabled: true,
    hideIfMissing: true,
  },
];

/**
 * Evaluates a quick copy button action on a request.
 * Returns { textToCopy, toastLabel, shouldHide }
 */
export function resolveQuickButtonAction(button, req, templates = [], cachedResponse = '') {
  if (!button || !req) return { textToCopy: '', toastLabel: '', shouldHide: true };

  if (button.enabled === false) {
    return { shouldHide: true, textToCopy: '', toastLabel: '' };
  }

  switch (button.type) {
    case 'template': {
      let tpl = null;
      if (button.targetId && button.targetId !== 'default') {
        tpl = templates.find((t) => t.id === button.targetId);
      }
      if (!tpl) {
        tpl = templates[0];
      }
      if (!tpl) {
        return { textToCopy: '', toastLabel: 'No template found', shouldHide: false };
      }
      let pathname = '/';
      try {
        pathname = new URL(req.url).pathname;
      } catch {
        pathname = req.url || '/';
      }
      const ctx = {
        url: req.url || '',
        path: pathname,
        method: req.method || 'GET',
        status: req.status || 0,
        statusText: req.statusText || '',
        time: formatTime(req.time),
        size: formatSize(req.size),
        curl: generateCurl(req, { clean: true }),
        curlFull: generateCurl(req, { clean: false }),
        requestBody: formatBody(req.postData?.text || ''),
        requestBodyRaw: req.postData?.text || '',
        responseBody: formatBody(cachedResponse || ''),
        responseBodyRaw: cachedResponse || '',
        requestHeaders: req.requestHeaders || req.headers || [],
        responseHeaders: req.responseHeaders || [],
      };
      return {
        textToCopy: renderTemplate(tpl.content, ctx),
        toastLabel: `Copied: ${tpl.name}`,
        shouldHide: false,
      };
    }
    case 'curl_clean': {
      return {
        textToCopy: generateCurl(req, { clean: true }),
        toastLabel: 'Copied clean cURL',
        shouldHide: false,
      };
    }
    case 'curl_full': {
      return {
        textToCopy: generateCurl(req, { clean: false }),
        toastLabel: 'Copied full cURL',
        shouldHide: false,
      };
    }
    case 'url': {
      return {
        textToCopy: req.url || '',
        toastLabel: 'Copied URL',
        shouldHide: false,
      };
    }
    case 'req_body': {
      return {
        textToCopy: formatBody(req.postData?.text || ''),
        toastLabel: 'Copied Request Body',
        shouldHide: false,
      };
    }
    case 'resp_body': {
      return {
        textToCopy: formatBody(cachedResponse || ''),
        toastLabel: 'Copied Response Body',
        shouldHide: false,
      };
    }
    case 'header': {
      const headers = req.requestHeaders || req.headers || [];
      const val = getHeader(headers, button.targetHeader);
      if (!val && button.hideIfMissing) {
        return { textToCopy: '', toastLabel: '', shouldHide: true };
      }
      return {
        textToCopy: val || '',
        toastLabel: `Copied ${button.targetHeader}`,
        shouldHide: false,
      };
    }
    default:
      return { textToCopy: '', toastLabel: '', shouldHide: false };
  }
}


