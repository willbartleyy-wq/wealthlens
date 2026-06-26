import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import {
  households,
  householdDocuments,
  planningObservations,
  tasks,
} from "@/lib/mock-data";

const summaryData = [
  { name: "Week 1", uploads: 14, observations: 4 },
  { name: "Week 2", uploads: 18, observations: 6 },
  { name: "Week 3", uploads: 21, observations: 8 },
  { name: "Week 4", uploads: 16, observations: 5 },
];

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      description="Monitor household intake, document review status, planning observations, and task follow-ups."
      actions={
        <>
          <Link href="/households" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white hover:border-white/20">
            Households
          </Link>
          <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950">
            New household
          </button>
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Households" value={String(households.length)} />
        <MetricCard label="Documents" value={String(householdDocuments.length)} />
        <MetricCard label="Observations" value={String(planningObservations.length)} />
        <MetricCard label="Open tasks" value={String(tasks.length)} />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[2fr_1fr]">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Workflow performance</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Upload & review trends</h2>
            </div>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">Updated today</span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <SummaryCard label="Weekly uploads" value="18" detail="Documents uploaded this week." />
            <SummaryCard label="Observations generated" value="6" detail="New planning observations pending review." />
            <SummaryCard label="Households active" value="72" detail="Households currently in workflow." />
            <SummaryCard label="Review turnaround" value="48 hrs" detail="Average advisor review time." />
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h3 className="text-xl font-semibold text-white">Pending reviews</h3>
            <div className="mt-6 space-y-4">
              {planningObservations.map((observation) => (
                <div key={observation.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="font-semibold text-white">{observation.title}</p>
                  <p className="mt-2 text-sm text-slate-400">{observation.confidence} confidence</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h3 className="text-xl font-semibold text-white">Upcoming follow-ups</h3>
            <div className="mt-6 space-y-4">
              {tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="font-semibold text-white">{task.title}</p>
                  <p className="mt-2 text-sm text-slate-400">Due {task.dueDate}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-8 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h2 className="text-2xl font-semibold text-white">Recent households</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {households.map((household) => (
            <Link
              key={household.id}
              href={`/households/${household.id}`}
              className="group rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6 transition hover:border-white/20 hover:bg-slate-950/90"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{household.name}</h3>
                  <p className="mt-2 text-sm text-slate-400">{household.advisor}</p>
                </div>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">
                  {household.status}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">{household.notes}</p>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
      <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-4 text-4xl font-semibold text-white">{value}</p>
    </div>
  );
}

function SummaryCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
      <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-400">{detail}</p>
    </div>
  );
}
