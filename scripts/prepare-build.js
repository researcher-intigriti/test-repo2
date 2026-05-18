const fs = require('fs');
const path = require('path');
const { pendoTrack } = require('./pendo-track');

const outDir = path.join(process.cwd(), 'dist');
fs.mkdirSync(outDir, { recursive: true });

const generatedAt = new Date().toISOString();
const outputPath = path.join(outDir, 'build-context.json');

fs.writeFileSync(
  outputPath,
  JSON.stringify({ phase: 'prepare', generatedAt: generatedAt }, null, 2) + '\n'
);
console.log('Prepared build context');

pendoTrack('build_prepared', {
  phase: 'prepare',
  generatedAt: generatedAt,
  outputPath: outputPath
});
