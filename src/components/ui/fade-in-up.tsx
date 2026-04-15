"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInUpProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FadeInUp = ({ children, delay = 0, className }: FadeInUpProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 15,
        mass: 0.8,
        delay: delay,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};
