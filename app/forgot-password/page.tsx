import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="page-container mx-auto flex min-h-screen items-center justify-center py-20">
        <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          <div className="mb-10 space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Forgot Password</p>
            <h1 className="text-4xl font-semibold text-white">Reset your WealthLens password.</h1>
            <p className="text-slate-400">Enter your email and we’ll send a secure reset link.</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Email</label>
              <input
                type="email"
                className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                placeholder="you@wealthlens.com"
              />
            </div>
            <button className="w-full rounded-3xl bg-white px-5 py-3 font-semibold text-slate-950">
              Send reset link
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400">
            Remembered your password? <Link href="/login" className="text-white underline">Sign in</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
