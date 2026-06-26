"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { authenticate, getCurrentUser } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (getCurrentUser()) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const result = authenticate(email, password);
    if (!result.success) {
      setError(result.error ?? "Unable to sign in. Please check your credentials.");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="page-container mx-auto flex min-h-screen items-center justify-center py-20">
        <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          <div className="mb-10 space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Login</p>
            <h1 className="text-4xl font-semibold text-white">Access your WealthLens advisor workspace.</h1>
            <p className="text-slate-400">Secure sign-in for advisors and support teams.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-slate-300">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                placeholder="you@wealthlens.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-slate-300">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-slate-400">
                <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-slate-950 text-blue-500" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-sm text-slate-300 hover:text-white">
                Forgot password?
              </Link>
            </div>

            {error ? <p className="text-sm text-rose-400">{error}</p> : null}

            <button type="submit" className="w-full rounded-3xl bg-white px-5 py-3 font-semibold text-slate-950">
              Sign in
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400">
            New to WealthLens? <Link href="/register" className="text-white underline">Create an account</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
