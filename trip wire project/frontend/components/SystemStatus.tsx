"use client";

import { motion } from "framer-motion";
import {
  Server,
  ShieldCheck,
  BrainCircuit,
} from "lucide-react";

export default function SystemStatus() {
  const items = [
    {
      icon: Server,
      label: "Backend",
      value: "Online",
      color: "text-emerald-400",
    },
    {
      icon: ShieldCheck,
      label: "Firewall",
      value: "Active",
      color: "text-cyan-400",
    },
    {
      icon: BrainCircuit,
      label: "LLM Judge",
      value: "Waiting",
      color: "text-yellow-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 grid gap-4 md:grid-cols-3"
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <Icon className={`h-6 w-6 ${item.color}`} />

              <div>
                <p className="text-xs text-zinc-500">
                  {item.label}
                </p>

                <p className={`font-semibold ${item.color}`}>
                  {item.value}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}