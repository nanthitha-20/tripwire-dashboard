"use client";

import { ShieldAlert } from "lucide-react";

interface InterceptorModalProps {
  open: boolean;
  riskScore: number;
  decision: string;
  reason: string;
  onApprove: () => void;
  onReject: () => void;
}

export default function InterceptorModal({
  open,
  riskScore,
  decision,
  reason,
  onApprove,
  onReject,
}: InterceptorModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-red-500/30 bg-zinc-900 p-8 shadow-2xl">

        <div className="mb-6 flex items-center gap-3">
          <ShieldAlert className="h-10 w-10 text-red-400" />

          <div>
            <h2 className="text-2xl font-bold text-white">
              TripWire Intercepted
            </h2>

            <p className="text-zinc-400">
              High-risk tool call detected
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-5">
          <p className="text-sm text-zinc-400">
            Risk Score
          </p>

          <h1 className="mt-2 text-6xl font-bold text-red-400">
            {riskScore}
          </h1>

          <p className="mt-5 text-red-300 font-semibold">
            {decision}
          </p>

          <p className="mt-4 text-zinc-300">
            {reason}
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={onReject}
            className="flex-1 rounded-xl bg-red-500 py-3 font-semibold text-white hover:bg-red-600 transition"
          >
            Reject
          </button>

          <button
            onClick={onApprove}
            className="flex-1 rounded-xl bg-emerald-500 py-3 font-semibold text-black hover:bg-emerald-400 transition"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}