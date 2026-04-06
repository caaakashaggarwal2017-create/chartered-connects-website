export interface Deadline {
  id: string
  date: string
  description: string
  formNumber?: string
  category: "gst" | "tds" | "income-tax" | "roc" | "mca"
  penaltyIfMissed?: string
  notes?: string
}

export const deadlines: Deadline[] = [
  // GST — Monthly GSTR-1 (11th of next month)
  { id: "d-001", date: "2025-04-11", description: "GSTR-1 filing for March 2025 (monthly filers)", formNumber: "GSTR-1", category: "gst", penaltyIfMissed: "₹200/day (₹100 CGST + ₹100 SGST), max ₹10,000", notes: "For taxpayers with annual turnover > ₹5 crore" },
  { id: "d-002", date: "2025-05-11", description: "GSTR-1 filing for April 2025", formNumber: "GSTR-1", category: "gst", penaltyIfMissed: "₹200/day (₹100 CGST + ₹100 SGST), max ₹10,000" },
  { id: "d-003", date: "2025-06-11", description: "GSTR-1 filing for May 2025", formNumber: "GSTR-1", category: "gst", penaltyIfMissed: "₹200/day, max ₹10,000" },
  { id: "d-004", date: "2025-07-11", description: "GSTR-1 filing for June 2025", formNumber: "GSTR-1", category: "gst", penaltyIfMissed: "₹200/day, max ₹10,000" },
  { id: "d-005", date: "2025-08-11", description: "GSTR-1 filing for July 2025", formNumber: "GSTR-1", category: "gst", penaltyIfMissed: "₹200/day, max ₹10,000" },
  { id: "d-006", date: "2025-09-11", description: "GSTR-1 filing for August 2025", formNumber: "GSTR-1", category: "gst", penaltyIfMissed: "₹200/day, max ₹10,000" },
  { id: "d-007", date: "2025-10-11", description: "GSTR-1 filing for September 2025", formNumber: "GSTR-1", category: "gst", penaltyIfMissed: "₹200/day, max ₹10,000" },
  { id: "d-008", date: "2025-11-11", description: "GSTR-1 filing for October 2025", formNumber: "GSTR-1", category: "gst", penaltyIfMissed: "₹200/day, max ₹10,000" },
  { id: "d-009", date: "2025-12-11", description: "GSTR-1 filing for November 2025", formNumber: "GSTR-1", category: "gst", penaltyIfMissed: "₹200/day, max ₹10,000" },
  { id: "d-010", date: "2026-01-11", description: "GSTR-1 filing for December 2025", formNumber: "GSTR-1", category: "gst", penaltyIfMissed: "₹200/day, max ₹10,000" },
  { id: "d-011", date: "2026-02-11", description: "GSTR-1 filing for January 2026", formNumber: "GSTR-1", category: "gst", penaltyIfMissed: "₹200/day, max ₹10,000" },
  { id: "d-012", date: "2026-03-11", description: "GSTR-1 filing for February 2026", formNumber: "GSTR-1", category: "gst", penaltyIfMissed: "₹200/day, max ₹10,000" },
  // GST — GSTR-3B (20th, for > ₹5Cr turnover)
  { id: "d-013", date: "2025-04-20", description: "GSTR-3B for March 2025 (turnover > ₹5 Cr)", formNumber: "GSTR-3B", category: "gst", penaltyIfMissed: "₹50/day (₹25 CGST + ₹25 SGST) + 18% interest on tax liability", notes: "For Category I taxpayers" },
  { id: "d-014", date: "2025-05-20", description: "GSTR-3B for April 2025 (turnover > ₹5 Cr)", formNumber: "GSTR-3B", category: "gst", penaltyIfMissed: "₹50/day + 18% interest" },
  { id: "d-015", date: "2025-06-20", description: "GSTR-3B for May 2025 (turnover > ₹5 Cr)", formNumber: "GSTR-3B", category: "gst", penaltyIfMissed: "₹50/day + 18% interest" },
  { id: "d-016", date: "2025-07-20", description: "GSTR-3B for June 2025 (turnover > ₹5 Cr)", formNumber: "GSTR-3B", category: "gst", penaltyIfMissed: "₹50/day + 18% interest" },
  { id: "d-017", date: "2025-08-20", description: "GSTR-3B for July 2025 (turnover > ₹5 Cr)", formNumber: "GSTR-3B", category: "gst", penaltyIfMissed: "₹50/day + 18% interest" },
  { id: "d-018", date: "2025-09-20", description: "GSTR-3B for August 2025 (turnover > ₹5 Cr)", formNumber: "GSTR-3B", category: "gst", penaltyIfMissed: "₹50/day + 18% interest" },
  // GST — Quarterly GSTR-1 (IFF for QRMP)
  { id: "d-019", date: "2025-04-13", description: "GSTR-1 / IFF for Q4 FY 2024-25 (QRMP quarterly filers)", formNumber: "GSTR-1/IFF", category: "gst", penaltyIfMissed: "₹200/day, max ₹10,000", notes: "For QRMP scheme taxpayers" },
  { id: "d-020", date: "2025-07-13", description: "GSTR-1 / IFF for Q1 FY 2025-26 (QRMP)", formNumber: "GSTR-1/IFF", category: "gst", penaltyIfMissed: "₹200/day, max ₹10,000" },
  { id: "d-021", date: "2025-10-13", description: "GSTR-1 / IFF for Q2 FY 2025-26 (QRMP)", formNumber: "GSTR-1/IFF", category: "gst", penaltyIfMissed: "₹200/day, max ₹10,000" },
  { id: "d-022", date: "2026-01-13", description: "GSTR-1 / IFF for Q3 FY 2025-26 (QRMP)", formNumber: "GSTR-1/IFF", category: "gst", penaltyIfMissed: "₹200/day, max ₹10,000" },
  // GST — GSTR-9 Annual Return
  { id: "d-023", date: "2025-12-31", description: "GSTR-9 Annual Return for FY 2024-25", formNumber: "GSTR-9", category: "gst", penaltyIfMissed: "₹200/day (₹100 CGST + ₹100 SGST), max 0.25% of turnover", notes: "For taxpayers with turnover > ₹2 crore" },
  // TDS — Quarterly Returns
  { id: "d-024", date: "2025-07-31", description: "TDS Return Q1 (April–June 2025) — Salary, Non-Salary", formNumber: "Form 24Q / 26Q", category: "tds", penaltyIfMissed: "₹200/day under Section 234E" },
  { id: "d-025", date: "2025-10-31", description: "TDS Return Q2 (July–September 2025)", formNumber: "Form 24Q / 26Q", category: "tds", penaltyIfMissed: "₹200/day under Section 234E" },
  { id: "d-026", date: "2026-01-31", description: "TDS Return Q3 (October–December 2025)", formNumber: "Form 24Q / 26Q", category: "tds", penaltyIfMissed: "₹200/day under Section 234E" },
  { id: "d-027", date: "2026-05-31", description: "TDS Return Q4 (January–March 2026)", formNumber: "Form 24Q / 26Q", category: "tds", penaltyIfMissed: "₹200/day under Section 234E" },
  // TDS — Monthly Deposit (7th of next month)
  { id: "d-028", date: "2025-05-07", description: "TDS/TCS deposit for April 2025", formNumber: "Challan ITNS 281", category: "tds", penaltyIfMissed: "Interest at 1.5% per month from date of deduction to deposit" },
  { id: "d-029", date: "2025-06-07", description: "TDS/TCS deposit for May 2025", formNumber: "Challan ITNS 281", category: "tds", penaltyIfMissed: "Interest at 1.5% per month" },
  { id: "d-030", date: "2025-07-07", description: "TDS/TCS deposit for June 2025", formNumber: "Challan ITNS 281", category: "tds", penaltyIfMissed: "Interest at 1.5% per month" },
  // Advance Tax
  { id: "d-031", date: "2025-06-15", description: "Advance Tax — 1st Instalment (15% of annual liability)", formNumber: "Challan ITNS 280", category: "income-tax", penaltyIfMissed: "Interest under Section 234B and 234C", notes: "For individual and corporate taxpayers" },
  { id: "d-032", date: "2025-09-15", description: "Advance Tax — 2nd Instalment (45% cumulative)", formNumber: "Challan ITNS 280", category: "income-tax", penaltyIfMissed: "Interest under Section 234B and 234C" },
  { id: "d-033", date: "2025-12-15", description: "Advance Tax — 3rd Instalment (75% cumulative)", formNumber: "Challan ITNS 280", category: "income-tax", penaltyIfMissed: "Interest under Section 234B and 234C" },
  { id: "d-034", date: "2026-03-15", description: "Advance Tax — 4th Instalment (100% cumulative)", formNumber: "Challan ITNS 280", category: "income-tax", penaltyIfMissed: "Interest under Section 234B and 234C" },
  // Income Tax Returns
  { id: "d-035", date: "2025-07-31", description: "ITR filing due date for individuals & firms (non-audit)", formNumber: "ITR-1 / ITR-2 / ITR-3 / ITR-4", category: "income-tax", penaltyIfMissed: "₹5,000 penalty (₹1,000 if income < ₹5 lakh) under Section 234F", notes: "Non-audit cases — individuals, HUFs, firms" },
  { id: "d-036", date: "2025-10-31", description: "ITR filing for audit cases (companies, firms requiring audit)", formNumber: "ITR-6 / ITR-5 / ITR-3", category: "income-tax", penaltyIfMissed: "₹5,000 penalty under Section 234F + interest on tax due", notes: "Subject to tax audit under Section 44AB" },
  { id: "d-037", date: "2025-09-30", description: "Tax Audit Report submission (Section 44AB)", formNumber: "Form 3CA / 3CB + 3CD", category: "income-tax", penaltyIfMissed: "0.5% of turnover or ₹1.5 lakh, whichever is less" },
  { id: "d-038", date: "2025-11-30", description: "Transfer Pricing Audit Report", formNumber: "Form 3CEB", category: "income-tax", penaltyIfMissed: "2% of transaction value" },
  // ROC / MCA
  { id: "d-039", date: "2025-06-30", description: "Annual General Meeting — Companies (within 6 months of FY end)", formNumber: "AGM", category: "roc", penaltyIfMissed: "Penalty on company and directors under Companies Act 2013", notes: "For FY ending March 31" },
  { id: "d-040", date: "2025-09-30", description: "ROC Annual Return filing for FY 2024-25", formNumber: "MGT-7 / MGT-7A", category: "roc", penaltyIfMissed: "₹100/day of default", notes: "Within 60 days of AGM" },
  { id: "d-041", date: "2025-10-29", description: "Financial Statements filing with ROC", formNumber: "AOC-4 / AOC-4 CFS", category: "roc", penaltyIfMissed: "₹100/day of default", notes: "Within 30 days of AGM for non-OPC companies" },
  { id: "d-042", date: "2025-06-30", description: "DIR-3 KYC for Directors with DIN", formNumber: "DIR-3 KYC / DIR-3 KYC Web", category: "mca", penaltyIfMissed: "₹5,000 penalty; DIN gets deactivated", notes: "Annual KYC for all DIN holders" },
  { id: "d-043", date: "2025-04-30", description: "MSME Form I — Outstanding payment disclosure", formNumber: "MSME Form I", category: "mca", penaltyIfMissed: "₹25,000 to ₹3 lakh per default", notes: "Companies with overdue MSME payments > 45 days" },
  { id: "d-044", date: "2025-10-30", description: "MSME Form I — Half-year (April–September)", formNumber: "MSME Form I", category: "mca", penaltyIfMissed: "₹25,000 to ₹3 lakh" },
  { id: "d-045", date: "2025-04-30", description: "XBRL filing for applicable companies (FY 2024-25)", formNumber: "AOC-4 XBRL", category: "roc", penaltyIfMissed: "₹100/day of default", notes: "For listed companies and companies with paid-up capital > ₹5 crore" },
  // Additional GST
  { id: "d-046", date: "2025-06-30", description: "GSTR-4 Annual Return (Composition Taxpayers) FY 2024-25", formNumber: "GSTR-4", category: "gst", penaltyIfMissed: "₹200/day, max ₹5,000", notes: "Composition scheme dealers only" },
  { id: "d-047", date: "2025-12-31", description: "GSTR-9C — Self-certified reconciliation statement FY 2024-25", formNumber: "GSTR-9C", category: "gst", penaltyIfMissed: "₹200/day, max 0.25% of turnover", notes: "Taxpayers with turnover > ₹5 crore" },
  { id: "d-048", date: "2025-05-31", description: "Form 16 issue deadline to employees (TDS on Salary)", formNumber: "Form 16", category: "tds", penaltyIfMissed: "₹100/day under Section 272A", notes: "Employer must issue to all salaried employees" },
  { id: "d-049", date: "2025-05-15", description: "Form 16A issue (TDS on Non-Salary) for Q4 FY 2024-25", formNumber: "Form 16A", category: "tds", penaltyIfMissed: "₹100/day under Section 272A" },
  { id: "d-050", date: "2026-03-31", description: "Last date to file updated ITR (ITR-U) for FY 2022-23", formNumber: "ITR-U", category: "income-tax", penaltyIfMissed: "Not applicable — this is voluntary updated return", notes: "Additional tax of 50% of aggregate tax and interest payable" },
]

export const deadlineCategories = [
  { value: "all", label: "All" },
  { value: "gst", label: "GST" },
  { value: "tds", label: "TDS" },
  { value: "income-tax", label: "Income Tax" },
  { value: "roc", label: "ROC" },
  { value: "mca", label: "MCA" },
]

export function getUpcomingDeadlines(days = 7): Deadline[] {
  const today = new Date()
  const future = new Date(today)
  future.setDate(today.getDate() + days)
  return deadlines.filter(d => {
    const date = new Date(d.date)
    return date >= today && date <= future
  })
}
