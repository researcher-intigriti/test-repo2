const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'dist');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, 'build-context.json'),
  JSON.stringify({ phase: 'prepare', generatedAt: new Date().toISOString() }, null, 2) + '\n'
);
console.log('Prepared build context');
