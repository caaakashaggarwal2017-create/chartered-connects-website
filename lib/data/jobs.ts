export interface Job {
  id: string
  company: string
  role: string
  location: string
  city: "Delhi" | "Bengaluru" | "Mumbai" | "Hyderabad" | "Pune" | "Chennai" | "Kolkata" | "Remote"
  type: "articleship" | "practice" | "industry" | "big4"
  experience: string
  salary?: string
  description: string
  postedDate: string
  applyEmail: string
  isUrgent: boolean
}

export const jobs: Job[] = [
  {
    id: "job-001",
    company: "HDFC Bank",
    role: "Finance Manager — CA",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    type: "industry",
    experience: "0–2 years post qualification",
    salary: "₹12–18 LPA",
    description: "Looking for a newly qualified CA to join the treasury and finance operations team. Role involves MIS reporting, variance analysis, and regulatory filings.",
    postedDate: "2025-03-10",
    applyEmail: "careers@hdfcbank.com",
    isUrgent: false,
  },
  {
    id: "job-002",
    company: "PricewaterhouseCoopers",
    role: "Associate — Audit & Assurance",
    location: "Delhi NCR",
    city: "Delhi",
    type: "big4",
    experience: "CA Final / Newly Qualified",
    salary: "₹8–11 LPA",
    description: "PwC India is hiring audit associates for its Delhi practice. You will work on statutory audits of listed and unlisted companies across BFSI, manufacturing, and consumer sectors.",
    postedDate: "2025-03-12",
    applyEmail: "campus.india@pwc.com",
    isUrgent: true,
  },
  {
    id: "job-003",
    company: "Swiggy",
    role: "Senior Analyst — Tax & Compliance",
    location: "Bengaluru, Karnataka",
    city: "Bengaluru",
    type: "industry",
    experience: "CA with 1–3 years experience",
    salary: "₹15–20 LPA",
    description: "Join Swiggy's Finance team to manage indirect tax compliance across states, GST reconciliations, and manage responses to tax authority notices.",
    postedDate: "2025-03-08",
    applyEmail: "taxjobs@swiggy.in",
    isUrgent: true,
  },
  {
    id: "job-004",
    company: "BSR & Co. LLP (KPMG Network)",
    role: "Senior Associate — Direct Tax",
    location: "Hyderabad, Telangana",
    city: "Hyderabad",
    type: "big4",
    experience: "CA with 1–2 years in tax",
    salary: "₹10–14 LPA",
    description: "BSR & Co. is looking for a Direct Tax Senior Associate to support advisory and compliance engagements. Exposure to transfer pricing and international tax preferred.",
    postedDate: "2025-03-05",
    applyEmail: "recruitment@bsr.in",
    isUrgent: false,
  },
  {
    id: "job-005",
    company: "Tata Consultancy Services",
    role: "Finance Business Partner — CA",
    location: "Pune, Maharashtra",
    city: "Pune",
    type: "industry",
    experience: "0–2 years post qualification",
    salary: "₹10–14 LPA",
    description: "Finance BP role supporting TCS business units with P&L reviews, budgeting, forecasting, and MIS. Excellent learning opportunity in a structured corporate environment.",
    postedDate: "2025-03-01",
    applyEmail: "finance.careers@tcs.com",
    isUrgent: false,
  },
  {
    id: "job-006",
    company: "Sharma & Verma Associates",
    role: "Audit Executive",
    location: "Delhi NCR",
    city: "Delhi",
    type: "practice",
    experience: "CA Final appeared / Qualified",
    salary: "₹5–8 LPA",
    description: "Growing practice in South Delhi looking for a CA (final appeared or newly qualified) for statutory and internal audit engagements. Good partner-to-article ratio.",
    postedDate: "2025-03-11",
    applyEmail: "hr@sharmaverma.in",
    isUrgent: false,
  },
  {
    id: "job-007",
    company: "Razorpay",
    role: "CA — Direct Tax & Compliance",
    location: "Bengaluru, Karnataka",
    city: "Bengaluru",
    type: "industry",
    experience: "CA with 2–4 years in direct tax",
    salary: "₹18–24 LPA",
    description: "Razorpay is looking for a CA to own its direct tax compliance, advance tax planning, and respond to tax department notices. Fintech sector experience a plus.",
    postedDate: "2025-03-07",
    applyEmail: "finance@razorpay.com",
    isUrgent: true,
  },
  {
    id: "job-008",
    company: "Grant Thornton Bharat",
    role: "Manager — Transaction Advisory",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    type: "big4",
    experience: "CA with 3–5 years experience",
    salary: "₹18–25 LPA",
    description: "GT Bharat's TAS practice is hiring a Manager-level CA for M&A due diligence, financial modelling, and valuation mandates across India.",
    postedDate: "2025-02-28",
    applyEmail: "tas.careers@in.gt.com",
    isUrgent: false,
  },
]

export const jobCities = ["All", "Delhi", "Bengaluru", "Mumbai", "Hyderabad", "Pune", "Chennai", "Kolkata", "Remote"]
export const jobTypes = [
  { value: "all", label: "All Types" },
  { value: "articleship", label: "Articleship" },
  { value: "practice", label: "Practice" },
  { value: "industry", label: "Industry" },
  { value: "big4", label: "Big 4" },
]
