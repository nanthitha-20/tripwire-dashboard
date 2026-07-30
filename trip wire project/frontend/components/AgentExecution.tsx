"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Eye,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import type { ToolCall } from "@/types/analysis";

interface Props {
  toolCalls: ToolCall[];
}

export default function AgentExecution({ toolCalls }: Props) {
  const [visible, setVisible] = useState(0);
  const previousLength = useRef(0);

  useEffect(() => {
    if (toolCalls.length !== previousLength.current) {
      previousLength.current = toolCalls.length;

      let current = 0;

      const interval = setInterval(() => {
        current++;

        setVisible(current);

        if (current >= toolCalls.length) {
          clearInterval(interval);
        }
      }, 700);

      return () => clearInterval(interval);
    }
  }, [toolCalls]);

  const getIcon = (status: ToolCall["status"]) => {
    switch (status) {
      case "ALLOWED":
        return <CheckCircle2 className="text-emerald-400" />;
      case "REVIEW":
        return <Eye className="text-yellow-400" />;
      case "BLOCKED":
        return <ShieldAlert className="text-red-400" />;
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h2 className="mb-6 text-lg font-semibold">AI Agent Execution</h2>

      <div className="space-y-4">
        {toolCalls.map((tool, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border border-zinc-800 p-4"
          >
            <span>{tool.tool}</span>

            {index < visible ? (
              getIcon(tool.status)
            ) : (
              <Loader2 className="animate-spin text-cyan-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}