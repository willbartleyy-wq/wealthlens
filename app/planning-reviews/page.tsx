import { AppShell } from "@/components/AppShell";
import { planningObservations, tasks } from "@/lib/mock-data";

export default function PlanningReviewsPage() {
  return (
    <AppShell
      title="Planning Reviews"
      description="Review planning observations, assign follow-up tasks, and approve advisor-ready summaries."
      actions={<button className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950">New review</button>}
    >
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Review queue</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Advisor review queue</h2>
            </div>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">{planningObservations.length} observations</span>
          </div>

          <div className="mt-8 space-y-4">
            {planningObservations.map((observation) => (
              <div key={observation.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">{observation.title}</h3>
                    <p className="text-sm leading-6 text-slate-400">{observation.detail}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                      {observation.supportingDocuments.map((doc) => (
                        <span key={doc} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{doc}</span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3 text-right">
                    <span className="inline-flex rounded-full bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-amber-300">
                      {observation.confidence} confidence
                    </span>
                    <span className="text-sm text-slate-400">Status: {observation.status}</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {[
                    { label: "Approve", style: "bg-emerald-500/10 text-emerald-300" },
                    { label: "Reject", style: "bg-rose-500/10 text-rose-300" },
                    { label: "Edit", style: "bg-white/5 text-white" },
                    { label: "Assign task", style: "bg-slate-800 text-slate-200" },
                  ].map((action) => (
                    <button key={action.label} className={`rounded-full px-4 py-2 text-xs font-semibold ${action.style}`}>
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h3 className="text-xl font-semibold text-white">Review snapshot</h3>
            <div className="mt-6 space-y-4">
              <SummaryRow label="Awaiting Documents" value="3" />
              <SummaryRow label="Under Review" value="5" />
              <SummaryRow label="Advisor Review" value="4" />
              <SummaryRow label="Ready for Delivery" value="2" />
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h3 className="text-xl font-semibold text-white">Today’s queue</h3>
            <div className="mt-6 space-y-4">
              {tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="font-semibold text-white">{task.title}</p>
                  <p className="mt-1 text-sm text-slate-400">Due {task.dueDate}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
