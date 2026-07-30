"use client";

import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";

interface RiskPanelProps {
  riskScore: number;
  decision: string;
  reason: string;
}

export default function RiskPanel({
  riskScore,
  decision,
  reason,
}: RiskPanelProps) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (riskScore / 100) * circumference;

  const getRiskDetails = () => {
    if (riskScore >= 90)
      return {
        label: "CRITICAL",
        color: "#ef4444",
        text: "text-red-400",
        glow: "shadow-[0_0_35px_rgba(239,68,68,0.35)]",
      };

    if (riskScore >= 70)
      return {
        label: "HIGH",
        color: "#f97316",
        text: "text-orange-400",
        glow: "shadow-[0_0_35px_rgba(249,115,22,0.35)]",
      };

    if (riskScore >= 40)
      return {
        label: "MEDIUM",
        color: "#eab308",
        text: "text-yellow-400",
        glow: "shadow-[0_0_35px_rgba(234,179,8,0.35)]",
      };

    return {
      label: "LOW",
      color: "#22c55e",
      text: "text-emerald-400",
      glow: "shadow-[0_0_35px_rgba(34,197,94,0.35)]",
    };
  };

  const risk = getRiskDetails();

  const DecisionIcon =
    decision === "BLOCKED"
      ? ShieldAlert
      : decision === "REVIEW"
      ? ShieldQuestion
      : ShieldCheck;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-6 ${risk.glow}`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Risk Assessment
        </h2>

        <div
          className={`rounded-full border border-zinc-700 px-3 py-1 text-xs font-semibold ${risk.text}`}
        >
          {risk.label}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <div className="relative h-52 w-52">
          <svg
            className="-rotate-90"
            width="208"
            height="208"
          >
            <circle
              cx="104"
              cy="104"
              r={radius}
              stroke="#27272a"
              strokeWidth="14"
              fill="none"
            />

            <motion.circle
              cx="104"
              cy="104"
              r={radius}
              stroke={risk.color}
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{
                strokeDashoffset: circumference,
              }}
              animate={{
                strokeDashoffset: progress,
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.h1
              key={riskScore}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-5xl font-extrabold ${risk.text}`}
            >
              {riskScore}
            </motion.h1>

            <p className="mt-2 text-sm text-zinc-400">
              Risk Score
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-zinc-700 bg-zinc-950/40 p-4">
        <div className="flex items-center gap-3">
          <DecisionIcon className={`h-6 w-6 ${risk.text}`} />

          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Decision
            </p>

            <h3 className={`text-xl font-bold ${risk.text}`}>
              {decision}
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex justify-between text-xs text-zinc-500">
          <span>Risk Level</span>
          <span>{riskScore}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${riskScore}%` }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="h-full rounded-full"
            style={{
              backgroundColor: risk.color,
            }}
          />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/30 p-4">
        <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
          AI Analysis
        </p>

        <p className="text-sm leading-6 text-zinc-300">
          {reason}
        </p>
      </div>
    </motion.div>
  );
}