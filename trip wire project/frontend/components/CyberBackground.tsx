"use client";

import { motion } from "framer-motion";

export default function CyberBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-zinc-950">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Cyan Glow */}
      <motion.div
        animate={{
          x: [0, 250, 0],
          y: [0, 120, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-10 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]"
      />

      {/* Purple Glow */}
      <motion.div
        animate={{
          x: [0, -180, 0],
          y: [0, 150, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[160px]"
      />

      {/* Green Glow */}
      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -120, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 h-80 w-80 rounded-full bg-emerald-500/10 blur-[130px]"
      />
    </div>
  );
}