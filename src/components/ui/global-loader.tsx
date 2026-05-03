"use client";

import React, { useState, useEffect, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { XelarisLoader } from "./xelaris-loader";

function LoaderEffect({ setLoading }: { setLoading: (loading: boolean) => void }) {
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
      // Very short delay to ensure smooth transition without keeping the user waiting
      timeoutId = setTimeout(() => {
        setLoading(false);
        // Restore interaction and scrolling
        document.body.style.overflow = "";
        document.body.style.pointerEvents = "";
      }, 150);
    };

    // Immediately finish loading instead of waiting for the heavy window "load" event
    finishLoading();

    return () => {
      clearTimeout(timeoutId);
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    };
  }, [pathname, searchParams, setLoading]);

  return null;
}

export default function GlobalLoader({ children }: { children?: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Suspense fallback={null}>
        <LoaderEffect setLoading={setLoading} />
      </Suspense>
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
