"use client";

import Link from "next/link";
import { useState } from "react";
import { loadLocalDocuments, saveLocalDocuments } from "@/lib/local-storage";
import { households, type DocumentItem } from "@/lib/mock-data";
import { generateId } from "@/lib/local-storage";

export default function ClientPortalPage() {
  const [file, setFile] = useState<File | null>(null);
  const [householdId, setHouseholdId] = useState(households[0]?.id ?? "");
  const [category, setCategory] = useState("Tax Returns");
  const [status, setStatus] = useState("Received");

  const handleUpload = () => {
    if (!file) return;

    const newDoc: DocumentItem = {
      id: generateId(`${householdId}-${file.name}`),
      name: file.name,
      category,
      type: file.name.split(".").pop()?.toUpperCase() ?? "FILE",
      status: status as DocumentItem["status"],
      householdId,
    };

    const existing = loadLocalDocuments();
    saveLocalDocuments([...existing, newDoc]);
    setFile(null);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="page-container py-10">
        <div className="mb-8 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Client portal</p>
              <h1 className="mt-2 text-4xl font-semibold text-white">Client upload and checklist</h1>
            </div>
            <Link href="/login" className="inline-flex rounded-full bg-white px-6 py-3 font-semibold text-slate-950">
              Client login
            </Link>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
            <h2 className="text-2xl font-semibold text-white">Upload your documents</h2>
            <p className="mt-3 text-slate-400">Clients can securely upload tax returns, estate documents, insurance policies, and account statements into a private household workspace.</p>
            <div className="mt-8 rounded-[2rem] border border-dashed border-white/10 bg-slate-950/70 p-10 text-center text-slate-400">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                className="mx-auto block cursor-pointer rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-slate-950"
              />
              {file ? (
                <div className="mt-4 text-left text-sm text-slate-300">
                  <p>Selected file: <span className="font-semibold text-white">{file.name}</span></p>
                  <p>Size: {Math.round(file.size / 1024)} KB</p>
                </div>
              ) : (
                <>
                  <p className="text-lg font-semibold text-white">Drag and drop files here</p>
                  <p className="mt-3 text-sm">PDF, Word, Excel, images and client documents accepted.</p>
                </>
              )}
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <label className="block text-left text-sm text-slate-300">
                  Household
                  <select
                    value={householdId}
                    onChange={(event) => setHouseholdId(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none"
                  >
                    {households.map((house) => (
                      <option key={house.id} value={house.id}>{house.name}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-left text-sm text-slate-300">
                  Category
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none"
                  >
                    <option>Tax Returns</option>
                    <option>Estate Documents</option>
                    <option>Insurance</option>
                    <option>Retirement Accounts</option>
                    <option>Business Documents</option>
                  </select>
                </label>
                <label className="block text-left text-sm text-slate-300">
                  Status
                  <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none"
                  >
                    <option>Received</option>
                    <option>Needs Review</option>
                    <option>Missing</option>
                  </select>
                </label>
              </div>
              <button
                type="button"
                onClick={handleUpload}
                className="mt-6 rounded-full bg-white px-6 py-3 font-semibold text-slate-950"
              >
                Save upload
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
              <h3 className="text-xl font-semibold text-white">Checklist</h3>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {[
                  "Tax Return",
                  "Trust",
                  "Will",
                  "POA",
                  "Healthcare Directive",
                  "Insurance",
                  "Investment Statements",
                ].map((item) => (
                  <li key={item} className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3">
                    <span>{item}</span>
                    <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-amber-200">Missing</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
              <h3 className="text-xl font-semibold text-white">Messages</h3>
              <p className="mt-4 text-slate-400">Clients can message their advisor and see a status update when documents are received and reviewed.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
