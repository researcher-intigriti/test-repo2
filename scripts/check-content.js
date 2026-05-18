const fs = require('fs');
const { pendoTrack } = require('./pendo-track');

const required = ['package.json'];
const missingFiles = [];
for (const file of required) {
  if (!fs.existsSync(file)) {
    missingFiles.push(file);
  }
}

if (missingFiles.length > 0) {
  for (const file of missingFiles) {
    console.error('Missing required file:', file);
  }

  pendoTrack('content_validation_completed', {
    requiredFiles: required.join(','),
    missingFiles: missingFiles.join(','),
    passed: false,
    fileCount: required.length
  });

  process.exit(1);
}

console.log('Content checks passed');

pendoTrack('content_validation_completed', {
  requiredFiles: required.join(','),
  missingFiles: '',
  passed: true,
  fileCount: required.length
});
