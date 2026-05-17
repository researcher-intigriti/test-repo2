import React from "react";
import MaintenanceBanner from "./maintenance-banner";

export default function Home() {
  return (
    <div>
      {/* Maintenance banner — status set to "inactive" because the
          April 24 2026 maintenance window has passed. To reactivate
          for a future window, update scheduledDate and set status
          to "active". */}
      <MaintenanceBanner
        scheduledDate="2026-04-24T09:00:00Z"
        status="inactive"
        message="Scheduled maintenance on April 24 at 9 AM UTC."
      />

      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>Welcome</h1>
        <p>Application is running normally.</p>
      </main>
    </div>
  );
}
