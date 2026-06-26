export type HouseholdStatus =
  | "Under Review"
  | "Awaiting Documents"
  | "Ready for Delivery"
  | "Advisor Review"
  | "Active";

export type Household = {
  id: string;
  name: string;
  spouse: string;
  children: string[];
  advisor: string;
  status: HouseholdStatus;
  riskProfile: string;
  netWorth: string;
  estatePlan: string;
  taxStatus: string;
  businessOwnership: string;
  insurance: string;
  retirementAccounts: string;
  trusts: string;
  notes: string;
  tags: string[];
  lastActivity: string;
  followUps: number;
  planningScore: number;
};

export type DocumentItem = {
  id: string;
  name: string;
  category: string;
  type: string;
  status: "Received" | "Missing" | "Needs Review";
  householdId: string;
};

export type DocumentChecklistItem = {
  id: string;
  label: string;
  status: "Missing" | "Received" | "Needs Review";
};

export type Observation = {
  id: string;
  householdId: string;
  title: string;
  detail: string;
  confidence: string;
  status: "Pending Review" | "Approved" | "Rejected";
  supportingDocuments: string[];
  createdAt: string;
};

export type TaskItem = {
  id: string;
  title: string;
  owner: string;
  dueDate: string;
  status: "To Do" | "In Progress" | "Done";
  priority: "High" | "Medium" | "Low";
  householdId: string;
};

export const households: Household[] = [
  {
    id: "smith-family",
    name: "Smith Family Trust",
    spouse: "Avery Smith",
    children: ["Lena Smith", "Noah Smith"],
    advisor: "Maya Harper",
    status: "Under Review",
    riskProfile: "Moderate Growth",
    netWorth: "$8.3M",
    estatePlan: "Revocable Trust",
    taxStatus: "S-Corp Owner",
    businessOwnership: "Family real estate LLC",
    insurance: "Term life + umbrella",
    retirementAccounts: "401(k), IRA",
    trusts: "Living trust, education trust",
    notes:
      "Trust funding review is pending. Beneficiary designations need confirmation for IRAs.",
    tags: ["High Net Worth", "Estate Plan", "Tax Sensitive"],
    lastActivity: "2 hours ago",
    followUps: 4,
    planningScore: 82,
  },
  {
    id: "johnson-household",
    name: "Johnson Household",
    spouse: "Nina Johnson",
    children: ["Owen Johnson"],
    advisor: "Ryan Cho",
    status: "Awaiting Documents",
    riskProfile: "Conservative",
    netWorth: "$2.1M",
    estatePlan: "Will only",
    taxStatus: "Individual",
    businessOwnership: "None",
    insurance: "Whole life, disability",
    retirementAccounts: "Roth IRA, 403(b)",
    trusts: "None",
    notes:
      "Missing most recent tax return and health care directive. Cash reserve review required.",
    tags: ["Insurance", "Client Portal"],
    lastActivity: "Yesterday",
    followUps: 7,
    planningScore: 58,
  },
  {
    id: "davis-estate",
    name: "Davis Estate",
    spouse: "Jordan Davis",
    children: ["Mia Davis", "Owen Davis", "Ella Davis"],
    advisor: "Sofia Nguyen",
    status: "Ready for Delivery",
    riskProfile: "Balanced",
    netWorth: "$4.7M",
    estatePlan: "Irrevocable trust",
    taxStatus: "Trust taxed",
    businessOwnership: "Consulting firm",
    insurance: "Umbrella, disability",
    retirementAccounts: "IRA, SEP IRA",
    trusts: "Charitable remainder trust",
    notes:
      "Review charitable planning observation before finalizing summary for client portal.",
    tags: ["Trusts", "Charitable Planning"],
    lastActivity: "4 days ago",
    followUps: 2,
    planningScore: 91,
  },
];

export const documentChecklist: DocumentChecklistItem[] = [
  { id: "tax-return", label: "Tax Return", status: "Missing" },
  { id: "trust", label: "Trust", status: "Received" },
  { id: "will", label: "Will", status: "Needs Review" },
  { id: "poa", label: "Power of Attorney", status: "Missing" },
  { id: "healthcare-directive", label: "Healthcare Directive", status: "Received" },
  { id: "insurance", label: "Insurance", status: "Needs Review" },
  { id: "business-documents", label: "Business Documents", status: "Missing" },
  { id: "investment-statements", label: "Investment Statements", status: "Received" },
  { id: "401k", label: "401(k)", status: "Received" },
  { id: "ira", label: "IRA", status: "Needs Review" },
  { id: "529", label: "529", status: "Missing" },
  { id: "mortgage", label: "Mortgage", status: "Received" },
  { id: "property-deeds", label: "Property Deeds", status: "Needs Review" },
  { id: "business-agreements", label: "Business Agreements", status: "Missing" },
];

export const householdDocuments: DocumentItem[] = [
  {
    id: "smith-2024-tax",
    name: "2024 Federal Tax Return",
    category: "Tax Returns",
    type: "PDF",
    status: "Received",
    householdId: "smith-family",
  },
  {
    id: "smith-trust-doc",
    name: "Living Trust Agreement",
    category: "Estate Documents",
    type: "PDF",
    status: "Received",
    householdId: "smith-family",
  },
  {
    id: "johnson-ira",
    name: "Roth IRA Statement",
    category: "Retirement Accounts",
    type: "PDF",
    status: "Needs Review",
    householdId: "johnson-household",
  },
  {
    id: "davis-business",
    name: "S-Corp Operating Agreement",
    category: "Business Agreements",
    type: "Word",
    status: "Received",
    householdId: "davis-estate",
  },
];

export const planningObservations: Observation[] = [
  {
    id: "obs-001",
    householdId: "smith-family",
    title: "Potential trust funding gap",
    detail:
      "Potential planning observation requiring advisor review: the living trust appears to be partially unfunded and may not cover all titled assets.",
    confidence: "High",
    status: "Pending Review",
    supportingDocuments: ["Living Trust Agreement", "Title Report"],
    createdAt: "2026-06-20",
  },
  {
    id: "obs-002",
    householdId: "johnson-household",
    title: "Missing beneficiary designation",
    detail:
      "Potential planning observation requiring advisor review: the Roth IRA beneficiary designation is missing documentation and should be confirmed.",
    confidence: "Medium",
    status: "Pending Review",
    supportingDocuments: ["Roth IRA Statement"],
    createdAt: "2026-06-18",
  },
  {
    id: "obs-003",
    householdId: "davis-estate",
    title: "Large cash balance exposure",
    detail:
      "Potential planning observation requiring advisor review: the household holds a large post-tax cash position that may merit sensitivity to investment or distribution strategy.",
    confidence: "Medium",
    status: "Pending Review",
    supportingDocuments: ["Cash Management Overview"],
    createdAt: "2026-06-16",
  },
];

export const tasks: TaskItem[] = [
  {
    id: "task-001",
    title: "Confirm Smith trust funding status",
    owner: "Maya Harper",
    dueDate: "2026-06-28",
    status: "In Progress",
    priority: "High",
    householdId: "smith-family",
  },
  {
    id: "task-002",
    title: "Request Johnson tax return",
    owner: "Ryan Cho",
    dueDate: "2026-07-01",
    status: "To Do",
    priority: "Medium",
    householdId: "johnson-household",
  },
  {
    id: "task-003",
    title: "Review Davis charity plan observation",
    owner: "Sofia Nguyen",
    dueDate: "2026-06-30",
    status: "To Do",
    priority: "High",
    householdId: "davis-estate",
  },
];
