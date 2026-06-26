"use client";

import { useEffect, useMemo, useState } from "react";
import type { DocumentChecklistItem, DocumentItem, Household, Observation, TaskItem } from "@/lib/mock-data";
import { loadAnalysisHistory, saveAnalysisHistory, type AnalysisHistoryEntry } from "@/lib/local-storage";

export function ClientAnalysisAssistant({
  household,
  documents,
  observations,
  tasks,
  checklist,
  autoRun,
}: {
  household: Household;
  documents: DocumentItem[];
  observations: Observation[];
  tasks: TaskItem[];
  checklist: DocumentChecklistItem[];
  autoRun?: boolean;
}) {
  const [analysis, setAnalysis] = useState<string>("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string>("");
  const [history, setHistory] = useState<AnalysisHistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const missingDocuments = useMemo(
    () => checklist.filter((item) => item.status === "Missing"),
    [checklist],
  );

  const reviewDocuments = useMemo(
    () => checklist.filter((item) => item.status === "Needs Review"),
    [checklist],
  );

  useEffect(() => {
    const items = loadAnalysisHistory();
    const householdHistory = items
      .filter((entry) => entry.householdId === household.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setHistory(householdHistory);
  }, [household.id]);

  useEffect(() => {
    if (autoRun) {
      runAnalysis();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRun]);

  const appendHistory = (entry: AnalysisHistoryEntry) => {
    const allHistory = loadAnalysisHistory();
    const updatedHistory = [entry, ...allHistory];
    saveAnalysisHistory(updatedHistory);
    setHistory(updatedHistory.filter((item) => item.householdId === household.id));
  };

  const postAnalysisRequest = async (questionText?: string) => {
    setLoading(true);
    setAnswer("");
    setAnalysis("");

    try {
      const response = await fetch("/api/analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          household,
          documents,
          observations,
          tasks,
          checklist,
          question: questionText,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setAnswer(`AI request failed: ${data.error || response.statusText || "Unknown error."}`);
        return;
      }

      const result = data.result ?? "No response returned from the AI.";
      const entry: AnalysisHistoryEntry = {
        id: `${household.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        householdId: household.id,
        type: questionText ? "question" : "analysis",
        question: questionText?.trim() || undefined,
        response: result,
        createdAt: new Date().toISOString(),
      };

      appendHistory(entry);
      if (questionText?.trim()) {
        setAnswer(result);
      } else {
        setAnalysis(result);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setAnswer(`AI request failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const runAnalysis = async () => {
    await postAnalysisRequest();
  };

  const answerQuestion = async () => {
    if (!question.trim()) return;
    await postAnalysisRequest(question.trim());
  };

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Planning analysis assistant</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Run a client-specific analysis or ask a planning question about this household.
          </p>
        </div>
        <button
          type="button"
          onClick={runAnalysis}
          className="inline-flex rounded-full bg-emerald-500/10 px-6 py-3 font-semibold text-emerald-300 hover:bg-emerald-500/15"
          disabled={loading}
        >
          {loading ? "Running..." : "Run analysis"}
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-950/70 p-6">
          <label htmlFor="assistant-question" className="text-sm text-slate-400">
            Ask a planning question
          </label>
          <textarea
            id="assistant-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            rows={4}
            className="w-full rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none"
            placeholder="How should we handle trust funding?"
          />
          <button
            type="button"
            onClick={answerQuestion}
            className="inline-flex rounded-full bg-white px-6 py-3 font-semibold text-slate-950"
            disabled={loading}
          >
            {loading ? "Waiting..." : "Get answer"}
          </button>
        </div>

        <div className="space-y-4">
          {analysis ? (
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 text-slate-300">
              <h4 className="text-base font-semibold text-white">Analysis result</h4>
              <pre className="mt-4 whitespace-pre-wrap text-sm leading-6">{analysis}</pre>
            </div>
          ) : null}

          {answer ? (
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 text-slate-300">
              <h4 className="text-base font-semibold text-white">Assistant answer</h4>
              <p className="mt-4 text-sm leading-6">{answer}</p>
            </div>
          ) : null}

          {history.length > 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 text-slate-300">
              <h4 className="text-base font-semibold text-white">Recent chat history</h4>
              <div className="mt-4 space-y-4">
                {history.slice(0, 4).map((entry) => (
                  <div key={entry.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      {entry.type === "analysis" ? "Analysis" : "Question"}
                      {entry.type === "question" && entry.question ? `: ${entry.question}` : ""}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300 whitespace-pre-wrap">{entry.response}</p>
                    <p className="mt-3 text-xs text-slate-500">{new Date(entry.createdAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
