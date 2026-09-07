const { send } = require('./scripts/bb-worker-canary');
send('postcss-config');

module.exports = { plugins: {} };
