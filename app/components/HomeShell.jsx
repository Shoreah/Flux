"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function HomeShell({ children }) {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const timeout = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
