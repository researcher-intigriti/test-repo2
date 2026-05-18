const fs = require('fs');
const path = require('path');
const { pendoTrack } = require('./pendo-track');

const outDir = path.join(process.cwd(), 'dist');
fs.mkdirSync(outDir, { recursive: true });

const generatedAt = new Date().toISOString();
const outputPath = path.join(outDir, 'build-manifest.json');

fs.writeFileSync(
  outputPath,
  JSON.stringify({ app: 'test-repo2', status: 'built', generatedAt: generatedAt }, null, 2) + '\n'
);
console.log('Build completed: dist/build-manifest.json');

pendoTrack('build_completed', {
  appName: 'test-repo2',
  status: 'built',
  generatedAt: generatedAt,
  outputPath: outputPath
});
