"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { XelarisLoader } from "./xelaris-loader";

export default function GlobalLoader({ children }: { children?: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Show loader on initial load and route changes
    setLoading(true);

    // Disable interaction and scrolling on the body while loading
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";

    let timeoutId: NodeJS.Timeout;

    const finishLoading = () => {
      // Small artificial delay to guarantee smooth animation viewing 
      // even if the page loads instantly
      timeoutId = setTimeout(() => {
        setLoading(false);
        // Restore interaction and scrolling
        document.body.style.overflow = "";
        document.body.style.pointerEvents = "";
      }, 600);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading);
      // Fallback in case the load event got missed or takes excessively long
      const fallbackTimeout = setTimeout(finishLoading, 3000);

      return () => {
        window.removeEventListener("load", finishLoading);
        clearTimeout(fallbackTimeout);
      };
    }

    return () => {
      clearTimeout(timeoutId);
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    };
  }, [pathname, searchParams]); // Re-trigger loader on path/query change

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="global-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[99999] pointer-events-auto bg-[#010409]"
          >
            <XelarisLoader fullScreen={true} />
          </motion.div>
        )}
      </AnimatePresence>
      <React.Fragment key={loading ? "loading" : "loaded"}>
        {children}
      </React.Fragment>
    </>
  );
}
