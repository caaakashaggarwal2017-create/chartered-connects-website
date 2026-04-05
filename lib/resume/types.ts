export interface PersonalInfo {
  name: string
  email: string
  phone: string
  linkedIn: string
  city: string
  state: string
  headline: string
}

export interface WorkExperience {
  id: string
  company: string
  title: string
  employmentType: 'Full-time' | 'Part-time' | 'Articleship' | 'Internship' | 'Freelance'
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
  isPresent: boolean
  responsibilities: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  year: string
  score: string
}

export interface CAQualification {
  level: 'Foundation' | 'IPCC' | 'Final'
  membershipNumber: string
  passingMonth: string
  passingYear: string
  airRank: string
  attempts: string
}

export interface Certification {
  id: string
  name: string
  issuingBody: string
  year: string
}

export interface Language {
  id: string
  name: string
  canRead: boolean
  canWrite: boolean
  canSpeak: boolean
}

export interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  targetRole: string
  workExperience: WorkExperience[]
  caQualification: CAQualification
  education: Education[]
  certifications: Certification[]
  technicalSkills: string[]
  caSpecialisations: string[]
  softSkills: string[]
  languages: Language[]
  lastUpdated: string
}

export interface AnalysisResult {
  score: number
  strengths: string[]
  improvements: Array<{
    section: string
    issue: string
    suggestion: string
    priority: 'high' | 'medium' | 'low'
  }>
  missingElements: string[]
  summary: string
}

export const emptyResumeData: ResumeData = {
  personalInfo: { name: '', email: '', phone: '', linkedIn: '', city: '', state: '', headline: '' },
  summary: '',
  targetRole: '',
  workExperience: [],
  caQualification: { level: 'Final', membershipNumber: '', passingMonth: '', passingYear: '', airRank: '', attempts: '' },
  education: [],
  certifications: [],
  technicalSkills: [],
  caSpecialisations: [],
  softSkills: [],
  languages: [],
  lastUpdated: new Date().toISOString(),
}

export const CA_SPECIALISATIONS = [
  'Statutory Audit',
  'Internal Audit',
  'Tax Audit',
  'GST Advisory',
  'Direct Tax',
  'Transfer Pricing',
  'NRI & International Tax',
  'Corporate Law',
  'Company Secretarial',
  'Startup Advisory',
  'Forensic Accounting',
  'Management Consulting',
  'Banking & Finance',
  'Real Estate',
  'FEMA & RBI',
]

export const TECH_SKILL_SUGGESTIONS = [
  'Tally ERP', 'SAP', 'QuickBooks', 'MS Excel (Advanced)', 'Zoho Books', 'BUSY Accounting',
  'GSTN Portal', 'MCA Portal', 'Income Tax Portal', 'TDS CPC', 'TRACES',
]

export const SOFT_SKILL_SUGGESTIONS = [
  'Client Management', 'Team Leadership', 'Report Writing', 'Problem Solving',
  'Communication', 'Attention to Detail', 'Time Management',
]

export const QUICK_CERTIFICATIONS = [
  { name: 'DISA', body: 'ICAI' },
  { name: 'DIRM', body: 'ICAI' },
  { name: 'ISA', body: 'ICAI' },
  { name: 'Concurrent Audit', body: 'ICAI' },
  { name: 'Forensic Audit', body: 'ICAI' },
  { name: 'FAFD', body: 'ICAI' },
]

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export const TARGET_ROLES = [
  'Articleship Trainee',
  'CA Fresher',
  'CA (1-3 years)',
  'Senior CA',
  'Manager',
  'Partner',
  'CFO',
  'Finance Director',
  'Other',
]
