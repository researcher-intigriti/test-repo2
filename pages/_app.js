import { useEffect } from "react";

function initPendo(visitorId, accountId) {
  if (typeof window === "undefined" || !window.pendo) return;
  window.pendo.initialize({
    visitor: {
      id: visitorId || "VISITOR-UNIQUE-ID",
    },
    account: {
      id: accountId || "ACCOUNT-UNIQUE-ID",
    },
  });
}

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // TODO: Replace with real visitor/account IDs from your auth system
    initPendo(null, null);
  }, []);

  return <Component {...pageProps} />;
}
