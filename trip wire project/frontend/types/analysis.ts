export interface ToolCall {
  tool: string;
  status: "ALLOWED" | "REVIEW" | "BLOCKED";
}

export interface AnalysisResponse {
  risk_score: number;
  decision: string;
  reason: string;
  tool_calls: ToolCall[];
}