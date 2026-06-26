import { AppShell } from "@/components/AppShell";

export default function SettingsPage() {
  return (
    <AppShell
      title="Settings"
      description="Configure firm branding, users, notifications, and API integrations."
    >
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <h1 className="text-4xl font-semibold text-white">Settings</h1>
        <p className="mt-3 text-slate-400">Firm branding, users, notifications, and API integrations.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[
            "Firm branding",
            "Users & roles",
            "Notifications",
            "API keys & integrations",
          ].map((item) => (
            <div key={item} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <h2 className="text-lg font-semibold text-white">{item}</h2>
              <p className="mt-3 text-slate-400">Placeholder for the {item.toLowerCase()} workflow.</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
