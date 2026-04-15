"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const ref = useRef(null);
  // triggerOnce: true ensures it only animates in once successfully
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1,
        delay: delay,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
