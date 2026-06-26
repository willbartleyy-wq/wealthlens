"use client";

import { useEffect, useMemo, useState } from "react";
import type { DocumentItem, Household, Observation, TaskItem } from "@/lib/mock-data";
import { loadLocalDocuments } from "@/lib/local-storage";

export function ClientIntelligenceReport({
  household,
  documents,
  observations,
  tasks,
  checklist,
}: {
  household: Household;
  documents: DocumentItem[];
  observations: Observation[];
  tasks: TaskItem[];
  checklist: { id: string; label: string; status: "Missing" | "Received" | "Needs Review" }[];
}) {
  const [localDocuments, setLocalDocuments] = useState<DocumentItem[]>([]);

  useEffect(() => {
    const loaded = loadLocalDocuments();
    setLocalDocuments(loaded.filter((item) => item.householdId === household.id));
  }, [household.id]);

  const allDocuments = useMemo(
    () => [
      ...documents,
      ...localDocuments.filter((item) => !documents.some((doc) => doc.id === item.id)),
    ],
    [documents, localDocuments],
  );

  const receivedDocuments = allDocuments.filter((item) => item.status === "Received");
  const missingDocuments = checklist.filter((item) => item.status === "Missing");
  const needsReviewDocuments = checklist.filter((item) => item.status === "Needs Review");

  const hasDocumentRecords = allDocuments.length > 0;
  const familyChildren = household.children.length > 0 ? household.children.join(", ") : "I don’t see that in the current records.";
  const spouseStatement = household.spouse ? household.spouse : "I don’t see that in the current records.";
  const estatePlanStatement = household.estatePlan && household.estatePlan !== "Unknown" ? household.estatePlan : "I don’t see that in the current records.";
  const taxStatusStatement = household.taxStatus && household.taxStatus !== "Unknown" ? household.taxStatus : "I don’t see that in the current records.";
  const insuranceStatement = household.insurance && household.insurance !== "Unknown" ? household.insurance : "I don’t see that in the current records.";
  const retirementStatement = household.retirementAccounts && household.retirementAccounts !== "Unknown" ? household.retirementAccounts : "I don’t see that in the current records.";
  const trustsStatement = household.trusts && household.trusts !== "Unknown" ? household.trusts : "I don’t see that in the current records.";

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h2 className="text-2xl font-semibold text-white">Client intelligence summary</h2>
        <div className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
          <p>This summary is generated from current household records, document status, and planning observations. It is intended for advisor review.</p>
          <p className="text-rose-200">This should be reviewed by the advisor, CPA, or estate attorney before implementation.</p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h3 className="text-xl font-semibold text-white">1. Household Overview</h3>
        <ul className="mt-4 space-y-3 text-slate-300">
          <li><strong>Household:</strong> {household.name}</li>
          <li><strong>Advisor:</strong> {household.advisor}</li>
          <li><strong>Spouse:</strong> {spouseStatement}</li>
          <li><strong>Children:</strong> {familyChildren}</li>
          <li><strong>Key relationships:</strong> {household.tags.length > 0 ? household.tags.join(", ") : "I don’t see that in the current records."}</li>
        </ul>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h3 className="text-xl font-semibold text-white">2. Background</h3>
        <ul className="mt-4 space-y-3 text-slate-300">
          <li><strong>Estate plan type:</strong> {estatePlanStatement}</li>
          <li><strong>Tax status:</strong> {taxStatusStatement}</li>
          <li><strong>Business interests:</strong> {household.businessOwnership && household.businessOwnership !== "Unknown" ? household.businessOwnership : "I don’t see that in the current records."}</li>
          <li><strong>Personal notes:</strong> {household.notes || "I don’t see that in the current records."}</li>
        </ul>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h3 className="text-xl font-semibold text-white">3. Balance Sheet</h3>
        <ul className="mt-4 space-y-3 text-slate-300">
          <li><strong>Net worth:</strong> {household.netWorth !== "Unknown" ? household.netWorth : "I don’t see that in the current records."}</li>
          <li><strong>Investments reported:</strong> {retirementStatement}</li>
          <li><strong>Liquidity / concentration:</strong> {hasDocumentRecords ? `${receivedDocuments.length} documents received; review holdings and accounts for concentration risks.` : "I don’t see that in the current records."}</li>
          <li><strong>Missing financial data:</strong> {household.netWorth === "Unknown" || !household.retirementAccounts ? "Household financial statements and account valuations are missing." : "No additional missing financial data identified from current records."}</li>
        </ul>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h3 className="text-xl font-semibold text-white">4. Asset Titling</h3>
        <ul className="mt-4 space-y-3 text-slate-300">
          <li>{estatePlanStatement !== "I don’t see that in the current records." ? `Current estate plan is listed as ${estatePlanStatement}.` : estatePlanStatement}</li>
          <li>{household.netWorth !== "Unknown" ? "Review asset titling documentation to ensure trust funding and title alignment with the estate plan." : "I don’t see that in the current records."}</li>
          <li>{allDocuments.length > 0 ? `Available documents include ${allDocuments.length} items across categories: ${Array.from(new Set(allDocuments.map((item) => item.category))).join(", ")}.` : "No asset or account documents are recorded."}</li>
        </ul>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h3 className="text-xl font-semibold text-white">5. Estate Planning</h3>
        <ul className="mt-4 space-y-3 text-slate-300">
          <li><strong>Documents in place:</strong> {estatePlanStatement !== "I don’t see that in the current records." ? estatePlanStatement : "Unknown"}</li>
          <li><strong>Trusts:</strong> {trustsStatement}</li>
          <li><strong>Power of attorney / healthcare directive:</strong> {missingDocuments.length > 0 ? "Some required estate planning documents are missing or not uploaded." : "Documents are recorded; confirm role assignments and dates."}</li>
          <li><strong>Fiduciaries:</strong> I don’t see that in the current records.</li>
        </ul>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h3 className="text-xl font-semibold text-white">6. Beneficiaries</h3>
        <ul className="mt-4 space-y-3 text-slate-300">
          <li>{receivedDocuments.length > 0 ? `Received documents include ${receivedDocuments.length} items; verify beneficiary designations in each relevant account and policy.` : "I don’t see beneficiary designation documentation in the current records."}</li>
          <li>{needsReviewDocuments.length > 0 ? `Documents flagged for review: ${needsReviewDocuments.map((item) => item.label).join(", ")}.` : "No beneficiary review flags are detected from current checklist data."}</li>
          <li><strong>Gaps:</strong> I don’t see beneficiary designation details in the current records.</li>
        </ul>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h3 className="text-xl font-semibold text-white">7. Tax Considerations</h3>
        <ul className="mt-4 space-y-3 text-slate-300">
          <li><strong>Tax status:</strong> {taxStatusStatement}</li>
          <li>{household.businessOwnership !== "Unknown" ? `Business interest noted: ${household.businessOwnership}.` : "I don’t see that in the current records."}</li>
          <li>{receivedDocuments.length > 0 ? "Review available returns and entity documents for income, capital gains, and estate exposure." : "No tax return or business documents are present in the current records."}</li>
          <li><strong>Missing tax information:</strong> Household tax returns, basis schedules, and gift/estate exposure documentation are not available.</li>
        </ul>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h3 className="text-xl font-semibold text-white">8. Risk / Insurance</h3>
        <ul className="mt-4 space-y-3 text-slate-300">
          <li><strong>Insurance:</strong> {insuranceStatement}</li>
          <li>{insuranceStatement !== "I don’t see that in the current records." ? "Review policy types, coverage amounts, and beneficiary designations." : "I don’t see insurance policy details in the current records."}</li>
          <li><strong>Coverage gaps:</strong> Confirm life, disability, and liability coverage for the household.</li>
        </ul>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h3 className="text-xl font-semibold text-white">9. Investments / Liquidity</h3>
        <ul className="mt-4 space-y-3 text-slate-300">
          <li><strong>Retirement accounts:</strong> {retirementStatement}</li>
          <li>{receivedDocuments.length > 0 ? `Document categories suggest ${Array.from(new Set(receivedDocuments.map((item) => item.category))).join(", ")} are present.` : "I don’t see specific investment or liquidity details in the current records."}</li>
          <li><strong>Liquidity:</strong> I don’t see cash, real estate or concentrated holdings details in the current records.</li>
        </ul>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h3 className="text-xl font-semibold text-white">10. Legacy Planning</h3>
        <ul className="mt-4 space-y-3 text-slate-300">
          <li>{trustsStatement !== "I don’t see that in the current records." ? `Trust structure recorded: ${trustsStatement}.` : trustsStatement}</li>
          <li><strong>Wealth transfer goals:</strong> I don’t see that in the current records.</li>
          <li><strong>Philanthropy / governance:</strong> I don’t see that in the current records.</li>
        </ul>
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h3 className="text-xl font-semibold text-white">11. Action Items</h3>
        {tasks.length > 0 ? (
          <ul className="mt-4 space-y-3 text-slate-300">
            {tasks.map((task) => (
              <li key={task.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                <p className="font-semibold text-white">{task.title}</p>
                <p className="mt-1 text-sm text-slate-400">Owner: {task.owner} · Due {task.dueDate} · Status: {task.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-slate-300">No action items are recorded in the current records.</p>
        )}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h3 className="text-xl font-semibold text-white">12. Missing Documents</h3>
        {missingDocuments.length > 0 ? (
          <ul className="mt-4 space-y-3 text-slate-300">
            {missingDocuments.map((item) => (
              <li key={item.id} className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3">
                <span>{item.label}</span>
                <span className="text-xs uppercase tracking-[0.18em] text-amber-300">Missing</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-slate-300">No documents are marked as missing in the current checklist records.</p>
        )}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h3 className="text-xl font-semibold text-white">13. Planning Observations</h3>
        {observations.length > 0 ? (
          <div className="mt-4 space-y-3 text-slate-300">
            {observations.map((item) => (
              <div key={item.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-slate-300">No planning observations are recorded for this household.</p>
        )}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h3 className="text-xl font-semibold text-white">14. Next Steps</h3>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
          <li>Confirm missing estate and tax documents with the client.</li>
          <li>Validate beneficiary designations on received retirement and insurance accounts.</li>
          <li>Review planning observations in the advisor queue and assign follow-up tasks.</li>
          <li>Move the summary into the planning review process for advisor approval.</li>
        </ul>
      </section>
    </div>
  );
}
