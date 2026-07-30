"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import CyberBackground from "@/components/CyberBackground";
import SystemStatus from "@/components/SystemStatus";
import DashboardStats from "@/components/DashboardStats";
import ScenarioLauncher from "@/components/ScenarioLauncher";
import PromptPanel from "@/components/PromptPanel";
import RiskPanel from "@/components/RiskPanel";
import AgentExecution from "@/components/AgentExecution";
import Timeline from "@/components/Timeline";
import ThreatFeed from "@/components/ThreatFeed";
import InterceptorModal from "@/components/InterceptorModal";

import type { AnalysisResponse } from "@/types/analysis";

export default function Home() {
  const [analysis, setAnalysis] = useState<AnalysisResponse>({
    risk_score: 0,
    decision: "Waiting",
    reason: "Enter a prompt and click Analyze.",
    tool_calls: [],
  });

  // Single source of truth for the prompt
  const [prompt, setPrompt] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [blocked, setBlocked] = useState(0);
  const [review, setReview] = useState(0);
  const [allowed, setAllowed] = useState(0);
  const [totalRisk, setTotalRisk] = useState(0);
  const [runs, setRuns] = useState(0);

  const [timelineEvents, setTimelineEvents] = useState<
    { time: string; message: string }[]
  >([]);

  const [threatFeed, setThreatFeed] = useState<
    {
      id: number;
      tool: string;
      status: "ALLOWED" | "REVIEW" | "BLOCKED";
    }[]
  >([]);

  const getCurrentTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const handleAnalysis = (data: AnalysisResponse) => {
    setAnalysis(data);

    const events = [
      {
        time: getCurrentTime(),
        message: "Prompt received",
      },

      ...data.tool_calls.map((tool) => ({
        time: getCurrentTime(),
        message: `${tool.tool} → ${tool.status}`,
      })),

      {
        time: getCurrentTime(),
        message: `Decision: ${data.decision}`,
      },

      {
        time: getCurrentTime(),
        message: `Risk Score: ${data.risk_score}`,
      },
    ];

    setTimelineEvents(events);

    setThreatFeed((prev) => [
      ...prev,
      ...data.tool_calls.map((tool, index) => ({
        id: Date.now() + index,
        tool: tool.tool,
        status: tool.status,
      })),
    ]);

    setRuns((r) => r + 1);
    setTotalRisk((t) => t + data.risk_score);

    switch (data.decision.toUpperCase()) {
      case "BLOCKED":
        setBlocked((b) => b + 1);
        setShowModal(true);
        break;

      case "REVIEW":
        setReview((r) => r + 1);
        break;

      default:
        setAllowed((a) => a + 1);
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-zinc-950 text-white">
      <CyberBackground />

      <Navbar />

      <div className="relative z-10 mx-auto max-w-7xl space-y-8 p-8">

        {/* Runtime Status */}
        <SystemStatus />

        {/* Prompt + Quick Scenarios */}
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <PromptPanel
            prompt={prompt}
            setPrompt={setPrompt}
            onAnalyze={handleAnalysis}
          />

          <ScenarioLauncher
            onSelect={setPrompt}
          />
        </div>

        {/* Stats + Risk */}
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <DashboardStats
            blocked={blocked}
            review={review}
            allowed={allowed}
            avgRisk={runs ? Math.round(totalRisk / runs) : 0}
          />

          <RiskPanel
            riskScore={analysis.risk_score}
            decision={analysis.decision}
            reason={analysis.reason}
          />
        </div>

        {/* Agent Execution */}
        <AgentExecution toolCalls={analysis.tool_calls} />

        {/* Timeline + Threat Feed */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Timeline events={timelineEvents} />
          <ThreatFeed items={threatFeed} />
        </div>
      </div>

      <InterceptorModal
        open={showModal}
        riskScore={analysis.risk_score}
        decision={analysis.decision}
        reason={analysis.reason}
        onApprove={() => setShowModal(false)}
        onReject={() => setShowModal(false)}
      />
    </main>
  );
}