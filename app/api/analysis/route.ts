import { NextResponse } from "next/server";
import type {
  DocumentChecklistItem,
  DocumentItem,
  Household,
  Observation,
  TaskItem,
} from "@/lib/mock-data";

type AnalysisRequest = {
  household: Household;
  documents: DocumentItem[];
  observations: Observation[];
  tasks: TaskItem[];
  checklist: DocumentChecklistItem[];
  question?: string;
};

function buildAssistantMessages(body: AnalysisRequest) {
  const { household, documents, observations, tasks, checklist, question } = body;
  const householdSummary = [
    `Household name: ${household.name}`,
    `Advisor: ${household.advisor}`,
    `Status: ${household.status}`,
    `Net worth: ${household.netWorth}`,
    `Estate plan: ${household.estatePlan}`,
    `Risk profile: ${household.riskProfile}`,
    `Tax status: ${household.taxStatus}`,
    `Business ownership: ${household.businessOwnership}`,
    `Insurance: ${household.insurance}`,
    `Retirement accounts: ${household.retirementAccounts}`,
    `Trusts: ${household.trusts}`,
    `Notes: ${household.notes}`,
  ].join("\n");

  const documentSummary = documents.length > 0
    ? `Documents:${documents.map((doc) => ` ${doc.name} (${doc.category}, ${doc.status})`).join(";")}`
    : "Documents: none.";

  const observationSummary = observations.length > 0
    ? `Observations:${observations.map((obs) => ` ${obs.title} - ${obs.detail} (status: ${obs.status}, confidence: ${obs.confidence})`).join(";")}`
    : "Observations: none.";

  const taskSummary = tasks.length > 0
    ? `Tasks:${tasks.map((task) => ` ${task.title} (due ${task.dueDate}, status: ${task.status})`).join(";")}`
    : "Tasks: none.";

  const checklistSummary = checklist.length > 0
    ? `Checklist:${checklist.map((item) => ` ${item.label}: ${item.status}`).join(";")}`
    : "Checklist: none.";

  const systemMessage = {
    role: "system",
    content:
      "You are a financial planning assistant for wealth advisors. Interpret household intake, document status, planning observations, and advisor tasks. Provide clear advisor guidance with next steps, potential risks, and client-facing considerations. Answer professionally and concisely.",
  };

  const userMessages = [
    {
      role: "user",
      content:
        "Use the following synopsis of client intake data, document status, and planning review items to generate a brief advisor analysis or answer a direct planning question.",
    },
    {
      role: "user",
      content: `${householdSummary}\n\n${documentSummary}\n${observationSummary}\n${taskSummary}\n${checklistSummary}`,
    },
  ];

  if (question && question.trim()) {
    userMessages.push({ role: "user", content: `Advisor question: ${question.trim()}` });
  } else {
    userMessages.push({ role: "user", content: "Provide an advisor analysis with key issues, missing documents, planning gaps, and recommended next steps." });
  }

  return [systemMessage, ...userMessages];
}

function buildDemoResult(body: AnalysisRequest) {
  const { household, documents, observations, checklist, question } = body;
  const missingItems = checklist.filter((item) => item.status === "Missing").map((item) => item.label);
  const missingSummary = missingItems.length > 0 ? missingItems.join(", ") : "none";
  const documentSummary = documents.length > 0 ? `${documents.length} uploaded document(s)` : "no uploaded documents";

  if (question && question.trim()) {
    return `Demo answer: Based on the household status (${household.status}) and the current intake, here is a sample reply to your question: "${question.trim()}".\n\nThis app is running in demo mode because no OpenAI/Azure API key is configured. Set OPENAI_API_KEY or Azure keys to enable real AI responses.`;
  }

  return `Demo analysis: ${household.name} is currently ${household.status}. ${documentSummary}. Missing items: ${missingSummary}. Observations count: ${observations.length}.\n\nThis app is running in demo mode because no OpenAI/Azure API key is configured. Set OPENAI_API_KEY or Azure keys to enable real AI responses.`;
}

export async function POST(request: Request) {
  const openaiKey = process.env.OPENAI_API_KEY;
  const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const azureKey = process.env.AZURE_OPENAI_KEY;
  const azureModel = process.env.AZURE_OPENAI_MODEL || "gpt-4o-mini";
  const openaiModel = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const useAzure = Boolean(azureEndpoint && azureKey);
  const apiKey = useAzure ? azureKey : openaiKey;

  let body: AnalysisRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  if (!apiKey) {
    const demo = buildDemoResult(body);
    return NextResponse.json({ result: demo });
  }

  const messages = buildAssistantMessages(body);
  const endpoint = useAzure && azureEndpoint
    ? `${azureEndpoint.replace(/\/$/, "")}/openai/deployments/${azureModel}/chat/completions?api-version=2024-12-01`
    : "https://api.openai.com/v1/chat/completions";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (useAzure) {
    headers["api-key"] = apiKey;
  } else {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }

  const payload = useAzure
    ? { messages, max_tokens: 700, temperature: 0.4 }
    : { model: openaiModel, messages, max_tokens: 700, temperature: 0.4 };

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json({ error: `OpenAI request failed: ${text}` }, { status: response.status });
  }

  const data = await response.json();
  const result = data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text ?? null;

  return NextResponse.json({ result: result ?? "The model did not return a response." });
}
