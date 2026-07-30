"use client";

import {
  ShieldAlert,
  ShieldCheck,
  Eye,
  Activity,
} from "lucide-react";

interface Props {
  blocked: number;
  review: number;
  allowed: number;
  avgRisk: number;
}

const cards = [
  {
    title: "Blocked",
    icon: ShieldAlert,
    color: "text-red-400",
    key: "blocked",
  },
  {
    title: "Review",
    icon: Eye,
    color: "text-yellow-400",
    key: "review",
  },
  {
    title: "Allowed",
    icon: ShieldCheck,
    color: "text-emerald-400",
    key: "allowed",
  },
  {
    title: "Avg Risk",
    icon: Activity,
    color: "text-cyan-400",
    key: "avgRisk",
  },
];

export default function DashboardStats({
  blocked,
  review,
  allowed,
  avgRisk,
}: Props) {
  const values = {
    blocked,
    review,
    allowed,
    avgRisk,
  };

  return (
    <div className="space-y-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">
                {card.title}
              </span>

              <Icon className={`h-4 w-4 ${card.color}`} />
            </div>

            <div
              className={`mt-3 text-center text-3xl font-bold ${card.color}`}
            >
              {values[card.key as keyof typeof values]}
            </div>
          </div>
        );
      })}
    </div>
  );
}