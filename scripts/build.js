const fs = require('fs');
const path = require('path');
const https = require('https');

const startTime = Date.now();
const outDir = path.join(process.cwd(), 'dist');
fs.mkdirSync(outDir, { recursive: true });
const generatedAt = new Date().toISOString();
const outputPath = path.join(outDir, 'build-manifest.json');
fs.writeFileSync(
  outputPath,
  JSON.stringify({ app: 'test-repo2', status: 'built', generatedAt }, null, 2) + '\n'
);
console.log('Build completed: dist/build-manifest.json');

// Pendo Track Event: build_manifest_generated
// TODO: Set PENDO_TRACK_EVENT_SECRET environment variable with your Pendo integration key for server-side tracking
const trackEventSecret = process.env.PENDO_TRACK_EVENT_SECRET;
if (trackEventSecret) {
  const duration = Date.now() - startTime;
  const payload = JSON.stringify({
    type: 'track',
    event: 'build_manifest_generated',
    visitorId: 'system',
    accountId: 'system',
    timestamp: Date.now(),
    properties: {
      app: 'test-repo2',
      status: 'built',
      generatedAt: generatedAt,
      outputPath: outputPath,
      duration: duration
    }
  });

  const req = https.request({
    hostname: 'data.pendo.io',
    path: '/data/track',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-pendo-integration-key': trackEventSecret
    }
  }, (res) => {
    if (res.statusCode >= 400) {
      console.error('Pendo track event failed with status:', res.statusCode);
    }
  });

  req.on('error', (err) => {
    console.error('Pendo track event error:', err.message);
  });

  req.write(payload);
  req.end();
}
