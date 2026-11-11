"use client";

import { useEffect } from "react";

export default function HydrationFix() {
  useEffect(() => {
    // Suppress third-party browser extension hydration mismatch warnings in development
    if (process.env.NODE_ENV === "development") {
      const origError = console.error;
      console.error = (...args: unknown[]) => {
        const msg = typeof args[0] === "string" ? args[0] : "";
        if (
          msg.includes("bis_skin_checked") ||
          msg.includes("__processed_") ||
          (msg.includes("A tree hydrated but some attributes") &&
            args.some(
              (a) =>
                typeof a === "string" &&
                (a.includes("bis_skin_checked") || a.includes("__processed_"))
            ))
        ) {
          return;
        }
        origError.apply(console, args);
      };
    }
  }, []);

  return null;
}
