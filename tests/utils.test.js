import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getHeader,
  extractHeaders,
  generateCurl,
  formatBody,
  formatSize,
  formatTime,
  filterRequests,
  classifyResourceType,
} from '../src/utils.js';

describe('Network Copier Utils', () => {
  const sampleHeaders = [
    { name: 'Content-Type', value: 'application/json; charset=utf-8' },
    { name: 'Authorization', value: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' },
    { name: 'Cookie', value: 'session_id=123456; theme=dark' },
    { name: 'sec-ch-ua', value: '"Chromium";v="120"' },
    { name: 'sec-fetch-dest', value: 'empty' },
    { name: 'User-Agent', value: 'Mozilla/5.0 Test' },
  ];

  const sampleRequest = {
    method: 'POST',
    url: 'https://api.example.com/v1/users?ref=web',
    headers: sampleHeaders,
    postData: {
      mimeType: 'application/json',
      text: '{"username":"john_doe","role":"admin"}',
    },
  };

  describe('getHeader', () => {
    it('finds header case-insensitively', () => {
      assert.equal(
        getHeader(sampleHeaders, 'authorization'),
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
      );
      assert.equal(
        getHeader(sampleHeaders, 'CONTENT-TYPE'),
        'application/json; charset=utf-8'
      );
    });

    it('returns empty string when header is not found', () => {
      assert.equal(getHeader(sampleHeaders, 'x-non-existent'), '');
      assert.equal(getHeader([], 'authorization'), '');
      assert.equal(getHeader(null, 'authorization'), '');
    });
  });

  describe('extractHeaders', () => {
    it('extracts multiple specific headers as text', () => {
      const extracted = extractHeaders(sampleHeaders, ['Authorization', 'Cookie']);
      assert.equal(
        extracted,
        'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\nCookie: session_id=123456; theme=dark'
      );
    });

    it('handles missing headers gracefully', () => {
      const extracted = extractHeaders(sampleHeaders, ['Authorization', 'X-Trace-Id']);
      assert.equal(
        extracted,
        'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
      );
    });
  });

  describe('generateCurl', () => {
    it('generates a full cURL command for POST request', () => {
      const curl = generateCurl(sampleRequest, { clean: false });
      assert.match(curl, /^curl 'https:\/\/api\.example\.com\/v1\/users\?ref=web'/);
      assert.match(curl, /-X POST/);
      assert.match(curl, /-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'/);
      assert.match(curl, /-H 'sec-ch-ua: "Chromium";v="120"'/);
      assert.match(curl, /--data-raw '\{"username":"john_doe","role":"admin"\}'/);
    });

    it('generates a clean cURL command excluding browser noise headers', () => {
      const curl = generateCurl(sampleRequest, { clean: true });
      assert.match(curl, /-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'/);
      assert.doesNotMatch(curl, /sec-ch-ua/);
      assert.doesNotMatch(curl, /sec-fetch-dest/);
      assert.match(curl, /--data-raw '\{"username":"john_doe","role":"admin"\}'/);
    });

    it('escapes single quotes correctly in body and url', () => {
      const req = {
        method: 'POST',
        url: "https://api.example.com/item?name=O'Connor",
        headers: [{ name: 'Content-Type', value: 'application/json' }],
        postData: {
          mimeType: 'application/json',
          text: '{"comment":"It\'s great"}',
        },
      };
      const curl = generateCurl(req);
      assert.match(curl, /O'\\''Connor/);
      assert.match(curl, /It'\\''s great/);
    });

    it('generates simple cURL for GET without -X GET or --data-raw', () => {
      const req = {
        method: 'GET',
        url: 'https://api.example.com/items',
        headers: [{ name: 'Accept', value: 'application/json' }],
      };
      const curl = generateCurl(req);
      assert.match(curl, /^curl 'https:\/\/api\.example\.com\/items'/);
      assert.doesNotMatch(curl, /-X GET/);
      assert.doesNotMatch(curl, /--data-raw/);
    });
  });

  describe('formatBody', () => {
    it('pretty prints valid JSON', () => {
      const raw = '{"a":1,"b":"test"}';
      const formatted = formatBody(raw);
      assert.equal(formatted, JSON.stringify({ a: 1, b: 'test' }, null, 2));
    });

    it('returns raw string when not valid JSON', () => {
      const raw = 'plain text payload';
      assert.equal(formatBody(raw), 'plain text payload');
    });

    it('handles empty or null values', () => {
      assert.equal(formatBody(''), '');
      assert.equal(formatBody(null), '');
      assert.equal(formatBody(undefined), '');
    });
  });

  describe('formatSize and formatTime', () => {
    it('formats bytes nicely', () => {
      assert.equal(formatSize(500), '500 B');
      assert.equal(formatSize(1024), '1.0 kB');
      assert.equal(formatSize(2048576), '2.0 MB');
      assert.equal(formatSize(0), '0 B');
      assert.equal(formatSize(-1), '(disk cache)');
    });

    it('formats milliseconds nicely', () => {
      assert.equal(formatTime(45.2), '45 ms');
      assert.equal(formatTime(1250), '1.25 s');
      assert.equal(formatTime(0), '0 ms');
    });
  });

  describe('classifyResourceType and filterRequests', () => {
    it('classifies mime types and urls correctly', () => {
      assert.equal(classifyResourceType('application/json', 'https://api.com/v1'), 'fetch');
      assert.equal(classifyResourceType('text/javascript', 'https://api.com/app.js'), 'js');
      assert.equal(classifyResourceType('text/css', 'https://api.com/app.css'), 'css');
      assert.equal(classifyResourceType('image/png', 'https://api.com/logo.png'), 'img');
      assert.equal(classifyResourceType('text/html', 'https://api.com/index.html'), 'doc');
    });

    it('filters requests by query keyword and type', () => {
      const items = [
        { url: 'https://api.com/v1/users', method: 'GET', resourceType: 'fetch' },
        { url: 'https://api.com/v1/orders', method: 'POST', resourceType: 'fetch' },
        { url: 'https://static.com/style.css', method: 'GET', resourceType: 'css' },
        { url: 'https://static.com/bundle.js', method: 'GET', resourceType: 'js' },
      ];

      // Query filter
      const res1 = filterRequests(items, 'orders', 'all');
      assert.equal(res1.length, 1);
      assert.equal(res1[0].url, 'https://api.com/v1/orders');

      // Type filter
      const res2 = filterRequests(items, '', 'fetch');
      assert.equal(res2.length, 2);

      // Both query and type filter
      const res3 = filterRequests(items, 'users', 'fetch');
      assert.equal(res3.length, 1);
      assert.equal(res3[0].url, 'https://api.com/v1/users');
    });
  });
});
