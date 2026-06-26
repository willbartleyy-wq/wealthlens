import { AppShell } from "@/components/AppShell";
import { tasks } from "@/lib/mock-data";

export default function TasksPage() {
  return (
    <AppShell
      title="Tasks"
      description="Track due dates, priorities, and household-linked follow-ups in one advisor workflow."
      actions={<button className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950">New task</button>}
    >
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
          <h2 className="text-2xl font-semibold text-white">Open tasks</h2>
          <div className="mt-6 space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-white">{task.title}</p>
                    <p className="text-sm text-slate-400">{task.owner} • Due {task.dueDate}</p>
                  </div>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">{task.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h3 className="text-xl font-semibold text-white">Kanban preview</h3>
            <div className="mt-6 space-y-4">
              <BoardCard title="To Do" count={2} />
              <BoardCard title="In Progress" count={1} />
              <BoardCard title="Done" count={0} />
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h3 className="text-xl font-semibold text-white">Task summary</h3>
            <p className="mt-4 text-slate-400">Tasks are linked to households, documents, and observations so every follow-up stays connected to the planning workflow.</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function BoardCard({ title, count }: { title: string; count: number }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
      <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{count}</p>
    </div>
  );
}
