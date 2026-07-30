"use client";

import { BrainCircuit } from "lucide-react";

interface Props {
  decision: string;
  riskScore: number;
  reason: string;
}

export default function AIReasoning({
  decision,
  riskScore,
  reason,
}: Props) {
  return (
    <div className="rounded-2xl border border-violet-500/20 bg-zinc-900/60 backdrop-blur-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <BrainCircuit className="text-violet-400 h-6 w-6" />

        <h2 className="text-xl font-bold">
          AI Security Reasoning
        </h2>
      </div>

      <div className="space-y-4">

        <div>
          <p className="text-zinc-500 text-sm">
            Decision
          </p>

          <p className="font-semibold">
            {decision}
          </p>
        </div>

        <div>
          <p className="text-zinc-500 text-sm">
            Risk Score
          </p>

          <p className="font-semibold">
            {riskScore}/100
          </p>
        </div>

        <div>
          <p className="text-zinc-500 text-sm">
            Explanation
          </p>

          <p className="leading-7 text-zinc-300">
            {reason}
          </p>
        </div>

        <div className="rounded-xl bg-violet-500/10 border border-violet-500/20 p-4">
          <p className="text-sm text-violet-300">
            This decision was produced by the policy engine and will
            be enhanced with LLM reasoning once the AI Judge is enabled.
          </p>
        </div>

      </div>
    </div>
  );
}