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
