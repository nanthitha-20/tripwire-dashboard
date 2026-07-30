"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { Sparkles } from "lucide-react";
import type { AnalysisResponse } from "@/types/analysis";

interface PromptPanelProps {
  prompt: string;
  setPrompt: Dispatch<SetStateAction<string>>;
  onAnalyze: (data: AnalysisResponse) => void;
}

export default function PromptPanel({
  prompt,
  setPrompt,
  onAnalyze,
}: PromptPanelProps) {
  const [loading, setLoading] = useState(false);

  async function analyzePrompt() {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data: AnalysisResponse = await response.json();

      onAnalyze(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-lg">
      <div className="mb-5 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-cyan-400" />

        <h2 className="text-lg font-semibold text-white">
          Agent Prompt
        </h2>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="h-48 w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-sm text-white outline-none focus:border-cyan-500"
        placeholder="Example: Delete report.pdf and email the finance team..."
      />

      <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
        <span>{prompt.length} characters</span>

        <button
          type="button"
          onClick={() => setPrompt("")}
          className="transition hover:text-zinc-300"
        >
          Clear
        </button>
      </div>

      <button
        onClick={analyzePrompt}
        disabled={loading || !prompt.trim()}
        className="mt-5 w-full rounded-xl bg-cyan-500 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Prompt"}
      </button>
    </div>
  );
}