import type { Household, DocumentItem } from "@/lib/mock-data";

const LOCAL_HOUSEHOLD_KEY = "wealthlens_households";
const LOCAL_DOCUMENT_KEY = "wealthlens_documents";

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadLocalHouseholds(): Household[] {
  if (!isBrowser()) return [];
  const raw = window.localStorage.getItem(LOCAL_HOUSEHOLD_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Household[];
  } catch {
    return [];
  }
}

export function saveLocalHouseholds(households: Household[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(LOCAL_HOUSEHOLD_KEY, JSON.stringify(households));
}

export function loadLocalDocuments(): DocumentItem[] {
  if (!isBrowser()) return [];
  const raw = window.localStorage.getItem(LOCAL_DOCUMENT_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as DocumentItem[];
  } catch {
    return [];
  }
}

export type AnalysisHistoryEntry = {
  id: string;
  householdId: string;
  type: "analysis" | "question";
  question?: string;
  response: string;
  createdAt: string;
};

const LOCAL_ANALYSIS_HISTORY_KEY = "wealthlens_analysis_history";

export function saveLocalDocuments(documents: DocumentItem[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(LOCAL_DOCUMENT_KEY, JSON.stringify(documents));
}

export function loadAnalysisHistory(): AnalysisHistoryEntry[] {
  if (!isBrowser()) return [];
  const raw = window.localStorage.getItem(LOCAL_ANALYSIS_HISTORY_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as AnalysisHistoryEntry[];
  } catch {
    return [];
  }
}

export function saveAnalysisHistory(entries: AnalysisHistoryEntry[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(LOCAL_ANALYSIS_HISTORY_KEY, JSON.stringify(entries));
}

export function generateId(base: string) {
  return base
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
