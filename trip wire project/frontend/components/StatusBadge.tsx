"use client";

interface StatusBadgeProps {
  status: "Allowed" | "Review" | "Blocked";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    Allowed:
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    Review:
      "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    Blocked:
      "bg-red-500/10 text-red-400 border border-red-500/20",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}