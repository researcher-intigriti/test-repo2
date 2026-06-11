const https = require('https');

// TODO: Set PENDO_INTEGRATION_KEY environment variable with your Pendo trackEventSecret
const PENDO_INTEGRATION_KEY = process.env.PENDO_INTEGRATION_KEY;
const PENDO_TRACK_URL = 'https://data.pendo.io/data/track';

/**
 * Sends a server-side Pendo Track Event via HTTP POST.
 * Failures are logged but never break application flow.
 */
function pendoTrack(eventName, properties) {
  if (!PENDO_INTEGRATION_KEY) {
    console.warn('[Pendo] PENDO_INTEGRATION_KEY not set — skipping track event:', eventName);
    return;
  }

  const payload = JSON.stringify({
    type: 'track',
    event: eventName,
    visitorId: 'system',
    accountId: 'system',
    timestamp: Date.now(),
    properties: properties || {}
  });

  const url = new URL(PENDO_TRACK_URL);
  const options = {
    hostname: url.hostname,
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-pendo-integration-key': PENDO_INTEGRATION_KEY
    }
  };

  try {
    const req = https.request(options, (res) => {
      if (res.statusCode >= 400) {
        console.warn('[Pendo] Track event failed with status', res.statusCode, 'for event:', eventName);
      }
      res.resume();
    });
    req.on('error', (err) => {
      console.warn('[Pendo] Track event error for', eventName, '-', err.message);
    });
    req.write(payload);
    req.end();
  } catch (err) {
    console.warn('[Pendo] Track event error for', eventName, '-', err.message);
  }
}

module.exports = { pendoTrack };
