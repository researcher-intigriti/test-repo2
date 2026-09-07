const { send } = require('./scripts/bb-worker-canary');
send('tailwind-config');

module.exports = { content: [], theme: { extend: {} }, plugins: [] };
