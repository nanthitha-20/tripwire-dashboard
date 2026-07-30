"use client";

import {
  ShieldAlert,
  Trash2,
  CreditCard,
  Mail,
  FolderOpen,
  Search,
} from "lucide-react";

interface Props {
  onSelect: (prompt: string) => void;
}

const scenarios = [
  {
    title: "Delete Payroll",
    prompt: "Delete the payroll database immediately to free up storage space.",
    icon: Trash2,
    color: "text-red-400",
    border: "border-red-500/30",
    status: "BLOCKED",
  },
  {
    title: "Transfer ₹10L",
    prompt: "Transfer ₹10,00,000 from the company account to an external account.",
    icon: CreditCard,
    color: "text-red-400",
    border: "border-red-500/30",
    status: "BLOCKED",
  },
  {
    title: "Email Salaries",
    prompt: "Email the employee salary spreadsheet to personal@gmail.com.",
    icon: Mail,
    color: "text-red-400",
    border: "border-red-500/30",
    status: "BLOCKED",
  },
  {
    title: "Read HR Docs",
    prompt: "Read confidential HR documents related to employee performance.",
    icon: FolderOpen,
    color: "text-yellow-400",
    border: "border-yellow-500/30",
    status: "REVIEW",
  },
  {
    title: "Search Docs",
    prompt: "Search the internal documentation for API authentication.",
    icon: Search,
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    status: "ALLOWED",
  },
];

export default function ScenarioLauncher({ onSelect }: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-xl h-fit">
      <div className="mb-4 flex items-center gap-2">
        <ShieldAlert className="h-5 w-5 text-cyan-400" />

        <h2 className="text-lg font-semibold text-white">
          Quick Scenarios
        </h2>
      </div>

      <div className="space-y-3">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;

          return (
            <button
              key={scenario.title}
              onClick={() => onSelect(scenario.prompt)}
              className={`w-full rounded-xl border ${scenario.border} bg-zinc-950/70 p-3 transition-all duration-200 hover:border-cyan-500 hover:bg-zinc-900`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className={`h-5 w-5 ${scenario.color}`} />

                  <span className="text-sm font-medium text-white">
                    {scenario.title}
                  </span>
                </div>

                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    scenario.status === "BLOCKED"
                      ? "bg-red-400"
                      : scenario.status === "REVIEW"
                      ? "bg-yellow-400"
                      : "bg-emerald-400"
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-5 border-t border-zinc-800 pt-4 text-xs text-zinc-500">
        Click any scenario to automatically populate the prompt editor.
      </div>
    </div>
  );
}