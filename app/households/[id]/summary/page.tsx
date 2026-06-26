"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { ClientAnalysisAssistant } from "@/components/ClientAnalysisAssistant";
import { ClientIntelligenceReport } from "@/components/ClientIntelligenceReport";
import {
  households as builtInHouseholds,
  householdDocuments as builtInDocuments,
  planningObservations as builtInObservations,
  tasks as builtInTasks,
  documentChecklist as builtInChecklist,
  type Household,
  type DocumentItem,
  type Observation,
  type TaskItem,
  type DocumentChecklistItem,
} from "@/lib/mock-data";
import { loadLocalDocuments, loadLocalHouseholds, saveLocalHouseholds } from "@/lib/local-storage";

export default function HouseholdSummaryPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [household, setHousehold] = useState<Household | undefined>(undefined);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [householdTasks, setHouseholdTasks] = useState<TaskItem[]>([]);
  const [checklist, setChecklist] = useState<DocumentChecklistItem[]>([]);

  useEffect(() => {
    const localHouseholds = loadLocalHouseholds();
    const foundHousehold =
      localHouseholds.find((item) => item.id === params.id) ??
      builtInHouseholds.find((item) => item.id === params.id);

    if (!foundHousehold) {
      setHousehold(undefined);
      return;
    }

    const localDocuments = loadLocalDocuments();
    const allDocuments = [
      ...builtInDocuments.filter((item) => item.householdId === params.id && !localDocuments.some((local) => local.id === item.id)),
      ...localDocuments.filter((item) => item.householdId === params.id),
    ];

    setHousehold(foundHousehold);
    setDocuments(allDocuments);
    setObservations(builtInObservations.filter((item) => item.householdId === params.id));
    setHouseholdTasks(builtInTasks.filter((item) => item.householdId === params.id));
    setChecklist(builtInChecklist);
  }, [params.id]);

  const handleApproveSummary = () => {
    if (!household) return;

    const updatedHousehold = {
      ...household,
      status: "Ready for Delivery",
      lastActivity: "Advisor approved summary",
    } as Household;

    const localHouseholds = loadLocalHouseholds();
    const existingIndex = localHouseholds.findIndex((item) => item.id === updatedHousehold.id);
    const updatedHouseholds = existingIndex >= 0
      ? localHouseholds.map((item) => (item.id === updatedHousehold.id ? updatedHousehold : item))
      : [...localHouseholds, updatedHousehold];

    saveLocalHouseholds(updatedHouseholds);
    setHousehold(updatedHousehold);
    router.push(`/households/${updatedHousehold.id}`);
  };

  if (!household) {
    return (
      <AppShell title="Planning Summary" description="Household not found.">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40 text-center">
          <p className="text-xl font-semibold text-white">Household not found</p>
          <p className="mt-4 text-slate-400">Please return to the household dashboard and choose a valid client record.</p>
        </div>
      </AppShell>
    );
  }

  const searchParams = useSearchParams();
  const autoRun = searchParams.get("run") === "true";

  const handleRerunAnalysis = () => {
    router.push(`/households/${params.id}/summary?run=true`);
  };

  return (
    <AppShell
      title="Planning Summary"
      description="Draft planning summary content for advisor review before delivery to the client."
      actions={
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleRerunAnalysis}
            className="rounded-full bg-emerald-500/10 px-6 py-3 font-semibold text-emerald-300 hover:bg-emerald-500/15"
          >
            Rerun analysis
          </button>
          <button
            onClick={handleApproveSummary}
            className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950"
          >
            Approve summary
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        <ClientIntelligenceReport
          household={household}
          documents={documents}
          observations={observations}
          tasks={householdTasks}
          checklist={checklist}
        />

        <ClientAnalysisAssistant
          household={household}
          documents={documents}
          observations={observations}
          tasks={householdTasks}
          checklist={checklist}
          autoRun={autoRun}
        />

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h3 className="text-xl font-semibold text-white">Document snapshot</h3>
            <div className="mt-6 space-y-4">
              {documents.map((document) => (
                <div key={document.id} className="rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4">
                  <p className="font-semibold text-white">{document.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{document.category}</p>
                  <span className="mt-3 inline-flex rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.16em] text-slate-300">{document.status}</span>
                </div>
              ))}
              {documents.length === 0 ? (
                <p className="text-slate-400">No documents are stored for this household yet.</p>
              ) : null}
            </div>
          </aside>

          <aside className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h3 className="text-xl font-semibold text-white">Advisor review queue</h3>
            <div className="mt-6 space-y-4">
              {observations.slice(0, 3).map((observation) => (
                <div key={observation.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="font-semibold text-white">{observation.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{observation.confidence} confidence</p>
                </div>
              ))}
              {observations.length === 0 ? (
                <p className="text-slate-400">No active review observations are available for this household.</p>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

function SummarySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="font-semibold text-white">{value}</p>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-slate-950/70 px-4 py-3 text-sm text-slate-400">
      <p className="font-semibold text-white">{label}</p>
      <p className="mt-1">{value}</p>
    </div>
  );
}
