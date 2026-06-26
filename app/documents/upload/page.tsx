"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { DocumentItem, households } from "@/lib/mock-data";
import { generateId, loadLocalDocuments, saveLocalDocuments } from "@/lib/local-storage";

export default function DocumentUploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Tax Returns");
  const [type, setType] = useState("PDF");
  const [householdId, setHouseholdId] = useState(households[0]?.id ?? "");
  const [status, setStatus] = useState("Received");

  const defaultFileName = useMemo(() => {
    if (!file) return "";
    return file.name;
  }, [file]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    const docName = name.trim() || defaultFileName || "Untitled document";
    const fileType = file.type ? file.type.split("/").pop()?.toUpperCase() : type;

    const newDocument: DocumentItem = {
      id: generateId(`${householdId}-${docName}`),
      name: docName,
      category,
      type: fileType || type,
      status: status as DocumentItem["status"],
      householdId,
    };

    const localDocuments = loadLocalDocuments();
    saveLocalDocuments([...localDocuments, newDocument]);
    router.push("/documents");
  };

  return (
    <AppShell
      title="Upload Document"
      description="Log a new client document in the advisor workspace. This supports document intake and checklist tracking."
    >
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl shadow-slate-950/40">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="file" className="text-sm text-slate-300">Upload file</label>
            <input
              id="file"
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-slate-950"
              required
            />
            {file ? (
              <p className="text-sm text-slate-400">Selected file: {file.name} ({Math.round(file.size / 1024)} KB)</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm text-slate-300">Document name</label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none"
              placeholder="2025 Federal Tax Return"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm text-slate-300">Category</label>
              <select
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none"
              >
                <option>Tax Returns</option>
                <option>Estate Documents</option>
                <option>Insurance</option>
                <option>Retirement Accounts</option>
                <option>Business Documents</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="text-sm text-slate-300">Type</label>
              <select
                id="type"
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none"
              >
                <option>PDF</option>
                <option>Word</option>
                <option>Excel</option>
                <option>Image</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="householdId" className="text-sm text-slate-300">Household</label>
              <select
                id="householdId"
                value={householdId}
                onChange={(event) => setHouseholdId(event.target.value)}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none"
              >
                {households.map((house) => (
                  <option key={house.id} value={house.id}>
                    {house.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm text-slate-300">Status</label>
              <select
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none"
              >
                <option>Received</option>
                <option>Needs Review</option>
                <option>Missing</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950">
              Save document
            </button>
            <button type="button" onClick={() => router.push("/documents")} className="inline-flex rounded-full border border-white/10 px-6 py-3 text-sm text-slate-300 hover:bg-white/5">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
