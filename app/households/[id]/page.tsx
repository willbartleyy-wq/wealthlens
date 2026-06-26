"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import {
  households as builtInHouseholds,
  householdDocuments as builtInDocuments,
  planningObservations,
  documentChecklist,
  tasks,
  type Household,
  type DocumentItem,
  type Observation,
  type TaskItem,
} from "@/lib/mock-data";
import { loadLocalDocuments, loadLocalHouseholds, saveLocalHouseholds } from "@/lib/local-storage";

export default function HouseholdDetailPage({ params }: { params: { id: string } }) {
  const [household, setHousehold] = useState<Household | undefined>(undefined);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  useEffect(() => {
    const localHouseholds = loadLocalHouseholds();
    const foundHousehold =
      localHouseholds.find((item) => item.id === params.id) ??
      builtInHouseholds.find((item) => item.id === params.id);

    const localDocuments = loadLocalDocuments();
    const allDocuments = [
      ...builtInDocuments.filter((item) => item.householdId === params.id && !localDocuments.some((local) => local.id === item.id)),
      ...localDocuments.filter((item) => item.householdId === params.id),
    ];

    setHousehold(foundHousehold);
    setDocuments(allDocuments);
  }, [params.id]);

  const observations = household ? planningObservations.filter((item) => item.householdId === household.id) : [];
  const householdTasks = household ? tasks.filter((item) => item.householdId === household.id) : [];

  const handleSubmitForReview = () => {
    if (!household) return;

    const updatedHousehold = {
      ...household,
      status: "Under Review",
      lastActivity: "Submitted for advisor review",
    } as Household;

    const localHouseholds = loadLocalHouseholds();
    const existingIndex = localHouseholds.findIndex((item) => item.id === updatedHousehold.id);
    const updatedHouseholds = existingIndex >= 0
      ? localHouseholds.map((item) => (item.id === updatedHousehold.id ? updatedHousehold : item))
      : [...localHouseholds, updatedHousehold];

    saveLocalHouseholds(updatedHouseholds);
    setHousehold(updatedHousehold);
  };

  if (!household) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <div className="page-container py-20 text-center">
          <p className="text-xl font-semibold text-white">Household not found</p>
          <p className="mt-4 text-slate-400">Please return to the household list and select a valid client record.</p>
          <Link href="/households" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-slate-950">
            Back to households
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="page-container py-10">
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Household profile</p>
              <h1 className="mt-2 text-4xl font-semibold text-white">{household.name}</h1>
              <p className="mt-3 text-sm leading-6 text-slate-400">{household.notes}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/households/${household.id}/upload`}
                className="inline-flex rounded-full bg-white px-6 py-3 font-semibold text-slate-950"
              >
                Upload document
              </Link>
              <button
                type="button"
                onClick={handleSubmitForReview}
                className="inline-flex rounded-full border border-white/10 bg-emerald-500/10 px-6 py-3 font-semibold text-emerald-300 hover:bg-emerald-500/15"
              >
                Submit for review
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <DetailCard label="Advisor" value={household.advisor} />
            <DetailCard label="Status" value={household.status} />
            <DetailCard label="Net worth" value={household.netWorth} />
            <DetailCard label="Follow-ups" value={String(household.followUps)} />
          </div>
        </div>

        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-wrap gap-2">
            {[
              "Overview",
              "Summary",
              "Documents",
              "Planning",
              "Assets",
              "Insurance",
              "Estate",
              "Tax",
              "Tasks",
              "Notes",
              "Timeline",
            ].map((tab) => {
              const href = tab === "Summary" ? `/households/${household.id}/summary` : `#${tab.toLowerCase()}`;
              return (
                <Link
                  key={tab}
                  href={href}
                  className="rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
                >
                  {tab}
                </Link>
              );
            })}
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <section className="space-y-6">
            <div id="overview" className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
              <h2 className="text-2xl font-semibold text-white">Overview</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Info label="Spouse" value={household.spouse} />
                <Info label="Children" value={household.children.join(", ")} />
                <Info label="Risk Profile" value={household.riskProfile} />
                <Info label="Estate Plan" value={household.estatePlan} />
                <Info label="Retirement Accounts" value={household.retirementAccounts} />
                <Info label="Trusts" value={household.trusts} />
              </div>
            </div>

            <div id="documents" className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
              <h2 className="text-2xl font-semibold text-white">Documents</h2>
              <div className="mt-6 space-y-4">
                {documents.map((document) => (
                  <div key={document.id} className="rounded-3xl border border-white/10 bg-slate-950/70 px-5 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">{document.name}</p>
                        <p className="mt-1 text-sm text-slate-400">{document.category}</p>
                      </div>
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.16em] text-slate-300">
                        {document.status}
                      </span>
                    </div>
                  </div>
                ))}
                {documents.length === 0 ? (
                  <p className="text-slate-400">No documents have been uploaded for this household yet.</p>
                ) : null}
              </div>
            </div>

            <div id="planning" className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
              <h2 className="text-2xl font-semibold text-white">Planning observations</h2>
              <div className="mt-6 space-y-4">
                {observations.map((observation) => (
                  <div key={observation.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{observation.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-400">{observation.detail}</p>
                      </div>
                      <span className="rounded-full bg-amber-400/10 px-3 py-1 text-sm text-amber-300">{observation.confidence}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                      {observation.supportingDocuments.map((doc) => (
                        <span key={doc} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{doc}</span>
                      ))}
                    </div>
                  </div>
                ))}
                {observations.length === 0 ? (
                  <p className="text-slate-400">No planning observations are available for this household.</p>
                ) : null}
              </div>
            </div>

            <div id="tasks" className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
              <h2 className="text-2xl font-semibold text-white">Tasks</h2>
              <div className="mt-6 space-y-4">
                {householdTasks.map((task) => (
                  <div key={task.id} className="rounded-3xl border border-white/10 bg-slate-950/70 px-5 py-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">{task.title}</p>
                        <p className="mt-1 text-sm text-slate-400">Owner: {task.owner}</p>
                      </div>
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.16em] text-slate-300">
                        {task.status}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-400">Due {task.dueDate}</p>
                  </div>
                ))}
                {householdTasks.length === 0 ? (
                  <p className="text-slate-400">No task items are linked to this household.</p>
                ) : null}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
              <h3 className="text-xl font-semibold text-white">Document checklist</h3>
              <div className="mt-5 space-y-3">
                {documentChecklist.slice(0, 6).map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3">
                    <p className="text-sm text-slate-300">{item.label}</p>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.16em] text-slate-400">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div id="timeline" className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
              <h3 className="text-xl font-semibold text-white">Timeline</h3>
              <div className="mt-6 space-y-4 text-sm text-slate-300">
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="font-semibold text-white">Client uploaded trust documents</p>
                  <p className="mt-1">2 days ago</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="font-semibold text-white">Advisor requested tax return</p>
                  <p className="mt-1">4 days ago</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="font-semibold text-white">Initial planning observations generated</p>
                  <p className="mt-1">1 week ago</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
      <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
