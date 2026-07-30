"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Wrench,
  Shield,
  BrainCircuit,
  UserCheck,
  PlayCircle,
  CheckCircle2,
  Loader2,
  XCircle,
} from "lucide-react";

import type { ToolCall } from "@/types/analysis";

interface Props {
  decision: string;
  toolCalls: ToolCall[];
}

export default function ExecutionPipeline({
  decision,
  toolCalls,
}: Props) {
  const stages = [
    {
      icon: FileText,
      title: "Prompt Received",
    },
    {
      icon: Wrench,
      title: `Tool Detection (${toolCalls.length})`,
    },
    {
      icon: Shield,
      title: "Policy Engine",
    },
    {
      icon: BrainCircuit,
      title: "LLM Judge",
    },
    {
      icon: UserCheck,
      title: "Human Approval",
    },
    {
      icon: PlayCircle,
      title:
        decision.toUpperCase() === "BLOCKED"
          ? "Execution Prevented"
          : "Execution",
    },
  ];

  const getStageStatus = (index: number) => {
    if (decision === "Waiting") {
      return "idle";
    }

    if (decision.toUpperCase() === "BLOCKED") {
      if (index < 5) return "done";
      return "blocked";
    }

    if (decision.toUpperCase() === "REVIEW") {
      if (index < 4) return "done";
      if (index === 4) return "waiting";
      return "idle";
    }

    return "done";
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold">
          AI Runtime Pipeline
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            decision.toUpperCase() === "BLOCKED"
              ? "bg-red-500/20 text-red-400"
              : decision.toUpperCase() === "REVIEW"
              ? "bg-yellow-500/20 text-yellow-400"
              : decision.toUpperCase() === "ALLOWED"
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-zinc-800 text-zinc-400"
          }`}
        >
          {decision}
        </span>
      </div>

      <div className="space-y-5">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const status = getStageStatus(index);

          return (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.15,
              }}
              className="flex items-center gap-4"
            >
              <div className="rounded-full bg-zinc-800 p-3">
                <Icon className="h-6 w-6 text-cyan-400" />
              </div>

              <div className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    {stage.title}
                  </span>

                  {status === "done" && (
                    <CheckCircle2 className="text-emerald-400" size={20} />
                  )}

                  {status === "waiting" && (
                    <Loader2
                      className="animate-spin text-yellow-400"
                      size={20}
                    />
                  )}

                  {status === "blocked" && (
                    <XCircle className="text-red-400" size={20} />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}