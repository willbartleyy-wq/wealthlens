import { AppShell } from "@/components/AppShell";
import { households, planningObservations, tasks } from "@/lib/mock-data";

export default function AdminPage() {
  return (
    <AppShell
      title="Admin"
      description="Manage users, usage, storage, billing, and audit logs for your firm."
    >
      <div className="mb-8 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h1 className="text-4xl font-semibold text-white">Admin dashboard</h1>
        <p className="mt-3 text-slate-400">Manage users, monitor usage, storage, and billing insights.</p>
      </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <Stat label="Users" value="28" />
          <Stat label="Advisors" value="14" />
          <Stat label="Clients" value="134" />
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h2 className="text-2xl font-semibold text-white">Recent households</h2>
            <ul className="mt-5 space-y-3 text-slate-300">
              {households.slice(0, 4).map((household) => (
                <li key={household.id} className="rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <span>{household.name}</span>
                    <span className="text-sm text-slate-400">{household.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h2 className="text-2xl font-semibold text-white">Pending observations</h2>
            <ul className="mt-5 space-y-3 text-slate-300">
              {planningObservations.map((observation) => (
                <li key={observation.id} className="rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3">
                  <p className="font-semibold text-white">{observation.title}</p>
                  <p className="text-sm text-slate-400">{observation.confidence} confidence</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
          <h2 className="text-2xl font-semibold text-white">Usage & storage</h2>
          <p className="mt-4 text-slate-400">Storage and billing dashboards will support advisor firms as client volume grows.</p>
        </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 text-center">
      <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-4 text-4xl font-semibold text-white">{value}</p>
    </div>
  );
}
