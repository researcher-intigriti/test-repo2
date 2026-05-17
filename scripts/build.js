const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'dist');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, 'build-manifest.json'),
  JSON.stringify({ app: 'test-repo2', status: 'built', generatedAt: new Date().toISOString() }, null, 2) + '\n'
);
console.log('Build completed: dist/build-manifest.json');
