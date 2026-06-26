"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { households, type DocumentItem } from "@/lib/mock-data";
import { generateId, loadLocalDocuments, saveLocalDocuments } from "@/lib/local-storage";

export default function HouseholdUploadPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [household, setHousehold] = useState(households.find((item) => item.id === params.id));
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Tax Returns");
  const [type, setType] = useState("PDF");
  const [status, setStatus] = useState("Received");

  useEffect(() => {
    const found = households.find((item) => item.id === params.id);
    if (!found) return;
    setHousehold(found);
  }, [params.id]);

  const defaultFileName = useMemo(() => {
    if (!file) return "";
    return file.name;
  }, [file]);

  if (!household) return notFound();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    const docName = name.trim() || defaultFileName || "Untitled document";
    const fileType = file.type ? file.type.split("/").pop()?.toUpperCase() : type;

    const newDocument: DocumentItem = {
      id: generateId(`${household.id}-${docName}`),
      name: docName,
      category,
      type: fileType || type,
      status: status as DocumentItem["status"],
      householdId: household.id,
    };

    const localDocuments = loadLocalDocuments();
    saveLocalDocuments([...localDocuments, newDocument]);
    router.push(`/households/${household.id}`);
  };

  return (
    <AppShell
      title="Upload Document"
      description={`Upload a document for ${household.name} and add it to the client intake record.`}
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

          <div className="flex flex-wrap gap-3">
            <button type="submit" className="rounded-full bg-white px-6 py-3 font-semibold text-slate-950">
              Save document
            </button>
            <button type="button" onClick={() => router.push(`/households/${household.id}`)} className="inline-flex rounded-full border border-white/10 px-6 py-3 text-sm text-slate-300 hover:bg-white/5">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
