const { send } = require('./scripts/bb-worker-canary');
send('next-config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

module.exports = nextConfig;
