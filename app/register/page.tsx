"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { createAccount, getCurrentUser } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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

    const result = createAccount({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    if (!result.success) {
      setError(result.error ?? "Unable to create account. Please try again.");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="page-container mx-auto flex min-h-screen items-center justify-center py-20">
        <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          <div className="mb-10 space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Register</p>
            <h1 className="text-4xl font-semibold text-white">Start your WealthLens trial.</h1>
            <p className="text-slate-400">Create an advisor account and begin managing households with confidence.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm text-slate-300">First name</label>
                <input
                  id="firstName"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                  placeholder="First name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm text-slate-300">Last name</label>
                <input
                  id="lastName"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-slate-300">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                placeholder="advisor@wealthlens.com"
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
                placeholder="Create a password"
                required
              />
            </div>

            {error ? <p className="text-sm text-rose-400">{error}</p> : null}

            <button type="submit" className="w-full rounded-3xl bg-white px-5 py-3 font-semibold text-slate-950">
              Create account
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400">
            Already have an account? <Link href="/login" className="text-white underline">Sign in</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
