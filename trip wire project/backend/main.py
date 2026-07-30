from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PromptRequest(BaseModel):
    prompt: str


@app.get("/")
def root():
    return {"status": "TripWire Backend Running"}


@app.post("/analyze")
def analyze(request: PromptRequest):
    prompt = request.prompt.lower()

    tool_calls = []
    risk_score = 12
    decision = "ALLOWED"
    reason = "No suspicious actions detected."

    reasoning = []
    confidence = 98

    # ---------- File Operations ----------
    if "read" in prompt:
        tool_calls.append({
            "tool": "Read File",
            "status": "ALLOWED"
        })
        reasoning.append(
            "Read-only access requested. No destructive behaviour detected."
        )

    if "delete" in prompt:
        tool_calls.append({
            "tool": "Delete File",
            "status": "BLOCKED"
        })
        reasoning.append(
            "File deletion is a destructive action and requires runtime approval."
        )

    # ---------- Email ----------
    if "email" in prompt:
        tool_calls.append({
            "tool": "Send Email",
            "status": "REVIEW"
        })
        reasoning.append(
            "Sending emails may expose sensitive information. Human review recommended."
        )

    # ---------- Payments ----------
    if (
        "payment" in prompt
        or "pay" in prompt
        or "transfer" in prompt
        or "bank" in prompt
    ):
        tool_calls.append({
            "tool": "Process Payment",
            "status": "BLOCKED"
        })
        reasoning.append(
            "Financial transactions are considered critical operations."
        )

    # ---------- HR ----------
    if "salary" in prompt or "payroll" in prompt:
        tool_calls.append({
            "tool": "Payroll Database",
            "status": "BLOCKED"
        })
        reasoning.append(
            "Attempt to access payroll or salary information detected."
        )

    # ---------- Secrets ----------
    if "password" in prompt or "secret" in prompt or "token" in prompt:
        tool_calls.append({
            "tool": "Credential Store",
            "status": "BLOCKED"
        })
        reasoning.append(
            "Prompt attempts to retrieve confidential credentials."
        )

    # ---------- Default ----------
    if not tool_calls:
        tool_calls.append({
            "tool": "General Request",
            "status": "ALLOWED"
        })
        reasoning.append(
            "Prompt appears safe and does not invoke privileged tools."
        )

    # ---------- Decision ----------
    if any(t["status"] == "BLOCKED" for t in tool_calls):
        risk_score = 94
        decision = "BLOCKED"
        reason = "Critical tool execution blocked by runtime firewall."

    elif any(t["status"] == "REVIEW" for t in tool_calls):
        risk_score = 61
        decision = "REVIEW"
        reason = "Human approval required before execution."

    else:
        risk_score = 18
        decision = "ALLOWED"
        reason = "No high-risk behaviour detected."

    return {
        "risk_score": risk_score,
        "decision": decision,
        "reason": reason,
        "tool_calls": tool_calls,

        # Mock LLM Judge
        "llm_reasoning": {
            "analysis": " ".join(reasoning),
            "confidence": confidence,
            "model": "TripWire Security Judge (Mock)"
        }
    }