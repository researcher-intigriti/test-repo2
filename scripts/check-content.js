const fs = require('fs');

const required = ['package.json'];
for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error('Missing required file:', file);
    process.exit(1);
  }
}
console.log('Content checks passed');
