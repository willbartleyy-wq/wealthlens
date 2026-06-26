import { documentChecklist } from "@/lib/mock-data";

export function ClientChecklist() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-slate-950/40">
      <h3 className="text-xl font-semibold text-white">Upload checklist</h3>
      <p className="mt-3 text-sm text-slate-400">Securely upload the documents your advisor has requested and keep your household planning on track.</p>
      <div className="mt-6 space-y-3">
        {documentChecklist.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-4">
            <div>
              <p className="font-semibold text-white">{item.label}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Planning document</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ${item.status === "Received" ? "bg-emerald-400/10 text-emerald-300" : item.status === "Needs Review" ? "bg-amber-400/10 text-amber-300" : "bg-rose-500/10 text-rose-300"}`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
