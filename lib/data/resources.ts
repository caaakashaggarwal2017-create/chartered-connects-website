export interface Resource {
  id: string
  title: string
  category: "exam-prep" | "articleship" | "gst-tax" | "career" | "templates"
  description: string
  fileName: string
  fileSize: string
  downloadCount: number
  isNew: boolean
}

export const resources: Resource[] = [
  {
    id: "res-001",
    title: "CA Final Study Planner 2025",
    category: "exam-prep",
    description: "A comprehensive 6-month study planner for CA Final covering both groups — subject-wise hour allocation, revision schedule, and mock test strategy.",
    fileName: "ca-final-study-planner-2025.pdf",
    fileSize: "2.1 MB",
    downloadCount: 4823,
    isNew: false,
  },
  {
    id: "res-002",
    title: "Articleship Firm Selection Checklist",
    category: "articleship",
    description: "10 key factors to evaluate before accepting an articleship offer — stipend, learning quality, firm reputation, specialisation, and work culture indicators.",
    fileName: "articleship-firm-selection-checklist.pdf",
    fileSize: "850 KB",
    downloadCount: 3124,
    isNew: false,
  },
  {
    id: "res-003",
    title: "GST Return Filing Step-by-Step Guide",
    category: "gst-tax",
    description: "Complete guide to GSTR-1, GSTR-3B, and GSTR-9 filing with screenshots, common errors, and reconciliation tips for FY 2025-26.",
    fileName: "gst-return-filing-guide-2025.pdf",
    fileSize: "3.4 MB",
    downloadCount: 6712,
    isNew: false,
  },
  {
    id: "res-004",
    title: "Client Engagement Letter Template",
    category: "templates",
    description: "Professional engagement letter templates for audit, tax, and advisory assignments. Fully customizable Word documents with ICAI-compliant language.",
    fileName: "client-engagement-letter-templates.zip",
    fileSize: "420 KB",
    downloadCount: 2891,
    isNew: false,
  },
  {
    id: "res-005",
    title: "CA Career Roadmap — Industry vs Practice",
    category: "career",
    description: "A detailed comparison of industry vs practice career paths for newly qualified CAs — salary benchmarks, growth trajectories, and decision framework.",
    fileName: "ca-career-roadmap-industry-vs-practice.pdf",
    fileSize: "1.8 MB",
    downloadCount: 5234,
    isNew: true,
  },
  {
    id: "res-006",
    title: "TDS Compliance Checklist FY 2025-26",
    category: "gst-tax",
    description: "Complete TDS compliance checklist covering deduction rates, payment due dates, return filing deadlines, and penalty provisions for FY 2025-26.",
    fileName: "tds-compliance-checklist-fy2025-26.pdf",
    fileSize: "1.2 MB",
    downloadCount: 3891,
    isNew: true,
  },
  {
    id: "res-007",
    title: "CA IPCC Exam Strategy Guide",
    category: "exam-prep",
    description: "Proven exam strategy for clearing IPCC/Intermediate in the first attempt — paper-wise approach, time management, and scoring techniques.",
    fileName: "ca-ipcc-exam-strategy.pdf",
    fileSize: "1.5 MB",
    downloadCount: 4102,
    isNew: false,
  },
  {
    id: "res-008",
    title: "Articleship Interview Questions & Answers",
    category: "articleship",
    description: "Top 50 articleship interview questions with model answers — covering technical, situational, and HR questions for CA firm interviews.",
    fileName: "articleship-interview-prep.pdf",
    fileSize: "980 KB",
    downloadCount: 2678,
    isNew: true,
  },
]

export const resourceCategories = [
  { value: "all", label: "All Resources" },
  { value: "exam-prep", label: "Exam Prep" },
  { value: "articleship", label: "Articleship" },
  { value: "gst-tax", label: "GST & Tax" },
  { value: "career", label: "Career" },
  { value: "templates", label: "Templates" },
]
