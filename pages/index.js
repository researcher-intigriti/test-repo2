const { MaintenanceBanner } = require('./maintenance-banner');

// Single source of truth for the April 24 maintenance guide.
// Previously this content was duplicated in multiple places.
const banner = MaintenanceBanner({
  title: 'Scheduled Maintenance',
  date: 'April 24',
  message: 'We will be performing scheduled maintenance. Some services may be temporarily unavailable.',
});

module.exports = { banner };
