"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { households as builtInHouseholds, type Household } from "@/lib/mock-data";
import { generateId, loadLocalHouseholds, saveLocalHouseholds } from "@/lib/local-storage";

export default function NewHouseholdPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [advisor, setAdvisor] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Awaiting Documents");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = generateId(name || "new-household");
    const newHousehold: Household = {
      id,
      name: name || "New Household",
      spouse: "",
      children: [],
      advisor: advisor || "",
      status: status as Household["status"],
      riskProfile: "Unknown",
      netWorth: "Unknown",
      estatePlan: "Unknown",
      taxStatus: "Unknown",
      businessOwnership: "Unknown",
      insurance: "Unknown",
      retirementAccounts: "Unknown",
      trusts: "Unknown",
      notes,
      tags: [],
      lastActivity: "Just created",
      followUps: 0,
      planningScore: 0,
    };

    const localHouseholds = loadLocalHouseholds();
    saveLocalHouseholds([...localHouseholds, newHousehold]);
    router.push(`/households/${id}`);
  };

  return (
    <AppShell
      title="New Household"
      description="Create a new household record and begin document intake and planning tracking."
    >
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm text-slate-300">Household name</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none"
                placeholder="Smith Family Trust"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="advisor" className="text-sm text-slate-300">Advisor</label>
              <input
                id="advisor"
                value={advisor}
                onChange={(event) => setAdvisor(event.target.value)}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none"
                placeholder="Maya Harper"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm text-slate-300">Status</label>
            <select
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none"
            >
              <option>Awaiting Documents</option>
              <option>Under Review</option>
              <option>Advisor Review</option>
              <option>Ready for Delivery</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm text-slate-300">Notes</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none"
              placeholder="Enter initial document instructions or family details."
              rows={4}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950">
              Save household
            </button>
            <Link href="/households" className="inline-flex rounded-full border border-white/10 px-6 py-3 text-sm text-slate-300 hover:bg-white/5">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
