"use client";

import {
  ShieldAlert,
  Eye,
  CheckCircle2,
} from "lucide-react";

interface FeedItem {
  id: number;
  tool: string;
  status: "ALLOWED" | "REVIEW" | "BLOCKED";
}

interface Props {
  items: FeedItem[];
}

export default function ThreatFeed({ items }: Props) {
  const getIcon = (status: FeedItem["status"]) => {
    switch (status) {
      case "BLOCKED":
        return <ShieldAlert className="h-5 w-5 text-red-400" />;
      case "REVIEW":
        return <Eye className="h-5 w-5 text-yellow-400" />;
      default:
        return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-6">
      <h2 className="mb-6 text-xl font-bold">
        Live Threat Feed
      </h2>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-zinc-500">
            No security events yet...
          </p>
        ) : (
          items
            .slice()
            .reverse()
            .map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/60 p-4"
              >
                <div className="flex items-center gap-3">
                  {getIcon(item.status)}
                  <span>{item.tool}</span>
                </div>

                <span
                  className={`text-sm font-semibold ${
                    item.status === "BLOCKED"
                      ? "text-red-400"
                      : item.status === "REVIEW"
                      ? "text-yellow-400"
                      : "text-emerald-400"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))
        )}
      </div>
    </div>
  );
}