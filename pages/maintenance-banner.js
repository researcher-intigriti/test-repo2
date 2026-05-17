/**
 * Reusable maintenance banner component.
 *
 * Renders maintenance information through structured props instead of raw HTML,
 * ensuring a single source of truth for maintenance guide content.
 */

function MaintenanceBanner({ title, date, message }) {
  const heading = title || 'Scheduled Maintenance';
  const body = message || 'We will be performing scheduled maintenance.';

  return {
    type: 'maintenance-banner',
    heading,
    date: date || null,
    body,
    render() {
      const parts = [this.heading];
      if (this.date) {
        parts[0] += ` \u2013 ${this.date}`;
      }
      return `<div class="maintenance-banner"><h2>${escapeHtml(parts[0])}</h2><p>${escapeHtml(this.body)}</p></div>`;
    },
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = { MaintenanceBanner, escapeHtml };
