const fs = require('fs');
const https = require('https');

const startTime = Date.now();
const required = ['package.json'];

// Pendo Track Event helper for content validation
// TODO: Set PENDO_TRACK_EVENT_SECRET environment variable with your Pendo integration key for server-side tracking
function pendoTrack(event, properties) {
  const trackEventSecret = process.env.PENDO_TRACK_EVENT_SECRET;
  if (!trackEventSecret) return;

  const payload = JSON.stringify({
    type: 'track',
    event: event,
    visitorId: 'system',
    accountId: 'system',
    timestamp: Date.now(),
    properties: properties
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

for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error('Missing required file:', file);

    // Pendo Track Event: content_validation_failed
    pendoTrack('content_validation_failed', {
      missingFile: file,
      requiredFiles: required.join(','),
      fileCount: required.length
    });

    process.exit(1);
  }
}
console.log('Content checks passed');

// Pendo Track Event: content_validation_completed
const duration = Date.now() - startTime;
pendoTrack('content_validation_completed', {
  validatedFiles: required.join(','),
  fileCount: required.length,
  duration: duration
});
