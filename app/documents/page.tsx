"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { householdDocuments as builtInDocuments, type DocumentItem } from "@/lib/mock-data";

const LOCAL_DOCUMENT_KEY = "wealthlens_documents";

function loadUploadedDocuments(): DocumentItem[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(LOCAL_DOCUMENT_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as DocumentItem[];
  } catch {
    return [];
  }
}

export default function DocumentsPage() {
  const [localDocuments, setLocalDocuments] = useState<DocumentItem[]>([]);

  useEffect(() => {
    setLocalDocuments(loadUploadedDocuments());
  }, []);

  const allDocuments = [
    ...localDocuments,
    ...builtInDocuments.filter((item) => !localDocuments.some((local) => local.id === item.id)),
  ];
  const pendingReviewCount = allDocuments.filter((doc) => doc.status === "Needs Review").length;
  const categories = Array.from(new Set(allDocuments.map((doc) => doc.category))).length;

  return (
    <AppShell
      title="Documents"
      description="Upload, categorize, and review client documents in a secure advisor workflow."
      actions={
        <Link href="/documents/upload" className="inline-flex rounded-full bg-white px-6 py-3 font-semibold text-slate-950">
          Upload files
        </Link>
      }
    >
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <div className="grid gap-6 md:grid-cols-3">
          <Stat label="Total files" value={String(allDocuments.length)} />
          <Stat label="Categories" value={String(categories)} />
          <Stat label="Pending review" value={String(pendingReviewCount)} />
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70">
          <table className="min-w-full divide-y divide-white/5 text-left text-sm text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400">
              <tr>
                <th className="px-6 py-4">Document</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-slate-950/70">
              {allDocuments.map((doc) => (
                <tr key={doc.id} className="border-b border-white/5">
                  <td className="px-6 py-4 text-white">{doc.name}</td>
                  <td className="px-6 py-4">{doc.category}</td>
                  <td className="px-6 py-4">{doc.type}</td>
                  <td className="px-6 py-4 text-slate-300">{doc.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
      <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}
