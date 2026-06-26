"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { households as builtInHouseholds, type Household } from "@/lib/mock-data";

const LOCAL_HOUSEHOLD_KEY = "wealthlens_households";

function loadHouseholds(): Household[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(LOCAL_HOUSEHOLD_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Household[];
  } catch {
    return [];
  }
}

export default function HouseholdsPage() {
  const [localHouseholds, setLocalHouseholds] = useState<Household[]>([]);

  useEffect(() => {
    setLocalHouseholds(loadHouseholds());
  }, []);

  const allHouseholds = [
    ...localHouseholds,
    ...builtInHouseholds.filter((item) => !localHouseholds.some((local) => local.id === item.id)),
  ];

  return (
    <AppShell
      title="Households"
      description="Organize households, review planning observations, and manage advisor follow-ups in one premium workspace."
      actions={
        <Link href="/households/new" className="inline-flex rounded-full bg-white px-6 py-3 font-semibold text-slate-950">
          + New Household
        </Link>
      }
    >
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <input
            type="search"
            placeholder="Search households"
            className="w-full rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 text-white outline-none placeholder:text-slate-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            "All",
            "Under Review",
            "Awaiting Documents",
            "Ready for Delivery",
            "Advisor Review",
          ].map((filter) => (
            <button
              key={filter}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 hover:bg-white/10"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6">
        {allHouseholds.map((household) => (
          <Link
            key={household.id}
            href={`/households/${household.id}`}
            className="block rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-6 transition hover:border-white/20 hover:bg-slate-900/95"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{household.advisor}</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{household.name}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{household.notes}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Stat label="Status" value={household.status} />
                <Stat label="Net worth" value={household.netWorth} />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Badge label={household.riskProfile} />
              <Badge label={household.estatePlan} />
              <Badge label={household.taxStatus} />
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
      <p className="font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
    </div>
  );
}

function Badge({ label }: { label: string }) {
  return <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300">{label}</span>;
}
