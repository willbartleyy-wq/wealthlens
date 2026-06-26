import Link from "next/link";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  ClipboardList,
  Users,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import { AuthStatus } from "@/components/AuthStatus";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/households", label: "Households", icon: FolderOpen },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/planning-reviews", label: "Planning Reviews", icon: ShieldCheck },
  { href: "/tasks", label: "Tasks", icon: ClipboardList },
  { href: "/settings", label: "Settings", icon: Settings2 },
];

export function AppShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="page-container py-10">
        <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">WealthLens</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Advisor workspace</h2>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-3xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <AuthStatus />
          </aside>

          <section className="space-y-6">
            <header className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{title}</p>
                  <h1 className="mt-3 text-3xl font-semibold text-white">{title}</h1>
                  <p className="mt-2 max-w-2xl text-slate-400">{description}</p>
                </div>
                <div className="flex flex-wrap gap-3">{actions}</div>
              </div>
            </header>
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
