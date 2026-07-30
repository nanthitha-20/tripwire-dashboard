const API_BASE = "http://127.0.0.1:8000";

export async function analyzePrompt(prompt: string) {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze prompt");
  }

  return response.json();
}

export async function checkBackend() {
  const response = await fetch(API_BASE);

  if (!response.ok) {
    throw new Error("Backend unavailable");
  }

  return response.json();
}