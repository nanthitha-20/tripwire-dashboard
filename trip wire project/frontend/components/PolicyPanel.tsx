"use client";

import {
  ShieldAlert,
  Eye,
  CheckCircle2,
} from "lucide-react";

const policies = [
  {
    action: "Delete Files",
    decision: "BLOCK",
  },
  {
    action: "External Email",
    decision: "REVIEW",
  },
  {
    action: "Payment > ₹10,000",
    decision: "BLOCK",
  },
  {
    action: "Read Public Files",
    decision: "ALLOW",
  },
  {
    action: "System Configuration",
    decision: "REVIEW",
  },
];

export default function PolicyPanel() {
  const icon = (decision: string) => {
    switch (decision) {
      case "BLOCK":
        return <ShieldAlert className="text-red-400" size={20} />;

      case "REVIEW":
        return <Eye className="text-yellow-400" size={20} />;

      default:
        return <CheckCircle2 className="text-emerald-400" size={20} />;
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md p-6">
      <h2 className="text-xl font-bold mb-6">
        Active Security Policies
      </h2>

      <div className="space-y-4">
        {policies.map((policy) => (
          <div
            key={policy.action}
            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
          >
            <div className="flex items-center gap-3">
              {icon(policy.decision)}
              <span>{policy.action}</span>
            </div>

            <span className="font-semibold text-zinc-300">
              {policy.decision}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}