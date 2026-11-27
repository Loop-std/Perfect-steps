import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Rise({
  text,
  className = "",
  delay = 0,
  italic = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  italic?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <span className="rise-clip">
      <motion.span
        className={`rise-line${italic ? " is-italic" : ""}${className ? ` ${className}` : ""}`}
        initial={reduced ? false : { y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.95, delay, ease: EASE }}
      >
        {text}
      </motion.span>
    </span>
  );
}
