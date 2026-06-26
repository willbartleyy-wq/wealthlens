import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="page-container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xl font-semibold tracking-tight">WealthLens</p>
          <p className="text-sm text-slate-400">Advisor-reviewed planning summaries for modern advisors.</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
          <Link href="#workflow" className="hover:text-white">
            How It Works
          </Link>
          <Link href="#features" className="hover:text-white">
            Features
          </Link>
          <Link href="#security" className="hover:text-white">
            Security
          </Link>
          <Link href="/login" className="rounded-full border border-white/10 px-4 py-2 hover:border-white/20">
            Sign In
          </Link>
          <Link href="/register" className="rounded-full bg-white px-5 py-2 font-semibold text-slate-950">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="page-container grid gap-12 py-20 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            Advisor-reviewed document intake and planning intelligence for modern family office workflows.
          </div>

          <div className="space-y-6">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white md:text-6xl">
              The AI operating system for financial advisors.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-400">
              Built for secure document submission, structured household intelligence, and advisor review across estate, tax, insurance and investment planning.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/register" className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-900/10">
              Get Started
            </Link>
            <Link href="#demo" className="rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white hover:border-white/30">
              Request Demo
            </Link>
          </div>

          <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-slate-950/30 md:grid-cols-2">
            <Stat label="Households" value="72" />
            <Stat label="Documents" value="1,284" />
            <Stat label="Observations" value="18 Pending" />
            <Stat label="Tasks" value="23" />
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          <div className="flex items-center justify-between rounded-3xl bg-slate-950/80 p-6 shadow-inner shadow-white/5">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Household</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Smith Family Trust</h2>
            </div>
            <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
              Under Review
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <MiniCard label="Planning Readiness" value="82%" />
            <MiniCard label="Documents Received" value="24" />
            <MiniCard label="Missing Items" value="4" />
            <MiniCard label="Open Follow-Ups" value="7" />
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/70 p-5">
            <p className="text-sm font-medium text-slate-300">Planning Observations</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>• Trust funding review appears incomplete.</li>
              <li>• Most recent tax return has not been received.</li>
              <li>• IRA beneficiary confirmation is still needed.</li>
              <li>• Estate attorney review recommended before implementation.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="workflow" className="page-container py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            How It Works
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">
            A simple system for advisor-managed planning workflows.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          <Step number="01" title="Client uploads documents" text="Securely collect tax returns, estate plans, insurance, and investment records." />
          <Step number="02" title="Files are organized" text="Documents are categorized, indexed, and linked to household planning profiles." />
          <Step number="03" title="Advisor review" text="Every observation is routed for advisor review before sharing client summaries." />
          <Step number="04" title="Deliver summary" text="Publish advisor-approved planning notes to the client portal when ready." />
        </div>
      </section>

      <section id="features" className="page-container py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          <Feature title="Household CRM" text="Track spouse, children, advisor assignments, status, risk, assets, insurance, trusts, and estate planning details." />
          <Feature title="Document Intake" text="Drag-and-drop upload, intelligent categorization, and checklist tracking for tax, trust, insurance and business files." />
          <Feature title="Planning Observations" text="Capture potential planning gaps, review them internally, and keep every observation advisor-reviewed and client-ready." />
        </div>
      </section>

      <section id="sources" className="page-container py-20">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Institutional data readiness</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold text-white">Designed to support enterprise-grade advisor data workflows.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Start with demo data today while keeping planning workflows aligned with trusted data sources and financial infrastructure.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <SourceCard
              title="Market & Investment Data"
              items={["Morningstar", "Yahoo Finance", "Alpha Vantage", "Polygon.io", "IEX Cloud"]}
            />
            <SourceCard
              title="Client Financial Data"
              items={["Plaid", "MX", "Finicity", "Yodlee"]}
            />
            <SourceCard
              title="Planning & AI"
              items={["IRS tax brackets", "CFP planning assumptions", "OpenAI", "Google Gemini"]}
            />
          </div>
        </div>
      </section>

      <section id="security" className="page-container py-20">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Security & Review
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold text-white">
            Built for sensitive household planning documents and advisor review.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            WealthLens is designed around secure intake, structured document workflows, and advisor-reviewed planning observations. Observations are presented as potential planning issues requiring advisor review.
          </p>
        </div>
      </section>

      <section id="demo" className="page-container py-20">
        <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40 md:grid-cols-2">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
              Request Demo
            </p>
            <h2 className="text-4xl font-semibold text-white">
              Bring clarity to household planning without losing control.
            </h2>
            <p className="text-slate-400">
              Send demo requests directly from the landing page and start collecting secure planning documents today.
            </p>
          </div>

          <form className="space-y-4">
            <input className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none placeholder:text-slate-500" placeholder="Name" />
            <input className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none placeholder:text-slate-500" placeholder="Email" />
            <input className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none placeholder:text-slate-500" placeholder="Firm name" />
            <textarea className="min-h-28 w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none placeholder:text-slate-500" placeholder="What are you looking to improve?" />
            <button className="w-full rounded-3xl bg-white px-5 py-3 font-semibold text-slate-950">
              Submit Request
            </button>
          </form>
          <p className="mt-4 text-xs uppercase tracking-[0.24em] text-slate-500">
            Planning summaries are prepared for professional review. This should be reviewed by the advisor, CPA, or estate attorney before implementation.
          </p>
        </div>
      </section>

      <footer className="page-container border-t border-white/10 py-10 text-center text-sm text-slate-500">
        © 2026 WealthLens. The AI operating system for financial advisors.
      </footer>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-center">
      <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

function MiniCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/75 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-7">
      <p className="text-sm text-slate-500">{number}</p>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/25">
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-4 leading-7 text-slate-400">{text}</p>
    </div>
  );
}

function SourceCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-3 text-slate-400">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
