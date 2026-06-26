"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser, signOut } from "@/lib/auth-client";

export function AuthStatus() {
  const [user, setUser] = useState<{ firstName: string; lastName: string; email: string } | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-3xl bg-white/10 text-slate-100">
          <span className="text-lg font-semibold">{user ? user.firstName[0] : "W"}</span>
        </div>
        <div>
          <p className="text-sm text-slate-400">{user ? "Signed in as" : "Not signed in"}</p>
          <p className="font-semibold text-white">{user ? `${user.firstName} ${user.lastName}` : "Guest"}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
        {user ? (
          <>
            <p>Access your client households, documents, planning review queue, and firm settings from one secure workspace.</p>
            <button
              type="button"
              onClick={() => {
                signOut();
                window.location.href = "/login";
              }}
              className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <p>Log in to see your advisor workspace and household planning tools.</p>
            <Link href="/login" className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">
              Sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
