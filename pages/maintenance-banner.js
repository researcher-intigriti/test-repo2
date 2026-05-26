import React from "react";

/**
 * MaintenanceBanner — renders a plain-text maintenance notice.
 * Automatically hidden when the scheduled date has passed.
 *
 * Props:
 *   scheduledDate  – ISO-8601 date string (e.g. "2026-04-24T09:00:00Z")
 *   status         – "active" | "inactive"  (default "inactive")
 *   message        – plain-text message to display
 */
export default function MaintenanceBanner({
  scheduledDate,
  status = "inactive",
  message = "Scheduled maintenance is complete. No action is required.",
}) {
  if (status !== "active") {
    return null;
  }

  const isExpired =
    scheduledDate && new Date(scheduledDate) < new Date();

  if (isExpired) {
    return null;
  }

  return (
    <div
      role="alert"
      style={{
        padding: "12px 16px",
        backgroundColor: "#fff3cd",
        border: "1px solid #ffc107",
        borderRadius: 4,
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      <strong>Maintenance Notice:</strong> {message}
    </div>
  );
}
