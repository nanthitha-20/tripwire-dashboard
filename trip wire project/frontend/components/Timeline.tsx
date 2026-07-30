"use client";

import { motion } from "framer-motion";
import {
  ShieldAlert,
  Eye,
  CheckCircle2,
  Terminal,
  Clock3,
} from "lucide-react";

interface TimelineEvent {
  time: string;
  message: string;
}

interface Props {
  events: TimelineEvent[];
}

export default function Timeline({ events }: Props) {
  const getIcon = (message: string) => {
    if (message.toUpperCase().includes("BLOCK")) {
      return (
        <ShieldAlert className="h-5 w-5 text-red-400" />
      );
    }

    if (message.toUpperCase().includes("REVIEW")) {
      return (
        <Eye className="h-5 w-5 text-yellow-400" />
      );
    }

    if (message.toUpperCase().includes("ALLOW")) {
      return (
        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
      );
    }

    return (
      <Terminal className="h-5 w-5 text-cyan-400" />
    );
  };

  const getBorder = (message: string) => {
    if (message.toUpperCase().includes("BLOCK"))
      return "border-red-500";

    if (message.toUpperCase().includes("REVIEW"))
      return "border-yellow-500";

    if (message.toUpperCase().includes("ALLOW"))
      return "border-emerald-500";

    return "border-cyan-500";
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Security Timeline
        </h2>

        <div className="flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
          <Clock3 className="h-4 w-4" />
          Live Audit Log
        </div>
      </div>

      {events.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-950/50 p-10 text-center">
          <Terminal className="mx-auto mb-3 h-10 w-10 text-cyan-400" />

          <p className="text-zinc-500">
            Waiting for AI agent activity...
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-px bg-zinc-700" />

          <div className="space-y-5">
            {events.map((event, index) => (
              <motion.div
                key={`${event.time}-${index}`}
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.15,
                }}
                className="relative flex items-start gap-4"
              >
                <div className="relative z-10 rounded-full border border-zinc-700 bg-zinc-900 p-2">
                  {getIcon(event.message)}
                </div>

                <div
                  className={`flex-1 rounded-xl border ${getBorder(
                    event.message
                  )} bg-zinc-950/70 p-4 transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">
                      {event.message}
                    </span>

                    <span className="text-xs text-zinc-500">
                      {event.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}