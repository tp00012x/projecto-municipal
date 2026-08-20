"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function MotionReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`motion-reveal ${className}`}
      initial={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.7,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -8% 0px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
