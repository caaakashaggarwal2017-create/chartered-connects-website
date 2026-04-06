export interface CAProfile {
  id: string
  name: string
  city: string
  state: string
  specialisations: string[]
  yearsExperience: number
  membershipNumber: string
  email: string
  phone?: string
  about: string
  isVerified: boolean
}

export const caProfiles: CAProfile[] = [
  { id: "ca-001", name: "Rajesh Sharma", city: "Delhi", state: "Delhi", specialisations: ["Direct Tax", "GST Advisory"], yearsExperience: 12, membershipNumber: "ICAI-049234", email: "rajesh.sharma@rscaoffice.in", about: "Practicing CA with 12 years expertise in direct tax planning, ITR filing, and GST advisory for SMEs and corporates.", isVerified: true },
  { id: "ca-002", name: "Priya Agarwal", city: "Bengaluru", state: "Karnataka", specialisations: ["Startup Advisory", "Corporate Law"], yearsExperience: 7, membershipNumber: "ICAI-214506", email: "priya@priyacaservices.in", about: "CA specializing in startup compliance, funding-stage advisory, ESOP structuring, and company incorporation.", isVerified: true },
  { id: "ca-003", name: "Deepak Mehta", city: "Mumbai", state: "Maharashtra", specialisations: ["NRI & International Tax", "FEMA"], yearsExperience: 15, membershipNumber: "ICAI-089312", email: "deepak@nriadvisory.in", about: "India's NRI tax specialist with 15 years handling DTAA applications, FEMA compliance, and repatriation advisory for NRIs in USA, UK, UAE.", isVerified: true },
  { id: "ca-004", name: "Anitha Krishnan", city: "Chennai", state: "Tamil Nadu", specialisations: ["Audit & Assurance", "Banking & Finance"], yearsExperience: 9, membershipNumber: "ICAI-167841", email: "anitha@ak-audit.in", about: "Statutory audit expert with deep expertise in bank audits, NBFC compliance, and financial sector regulatory matters.", isVerified: true },
  { id: "ca-005", name: "Vikram Singh", city: "Hyderabad", state: "Telangana", specialisations: ["GST Advisory", "Indirect Tax"], yearsExperience: 6, membershipNumber: "ICAI-298761", email: "vikram@gstconsult.in", about: "GST practitioner specialising in complex GST advisory, refund claims, appeals, and multi-state compliance for manufacturing and services sectors.", isVerified: true },
  { id: "ca-006", name: "Sunita Patel", city: "Ahmedabad", state: "Gujarat", specialisations: ["Tax Planning", "Direct Tax"], yearsExperience: 18, membershipNumber: "ICAI-034521", email: "sunita@spatel-ca.in", about: "Senior CA with 18 years in individual and corporate tax planning. Expertise in HUF planning, succession planning, and tax-efficient structuring.", isVerified: true },
  { id: "ca-007", name: "Arjun Nair", city: "Kochi", state: "Kerala", specialisations: ["NRI & International Tax", "Tax Planning"], yearsExperience: 11, membershipNumber: "ICAI-187423", email: "arjun@nairandco.in", about: "Kerala-based CA serving the Gulf NRI community with FEMA compliance, income tax planning, and property transaction advisory.", isVerified: true },
  { id: "ca-008", name: "Meera Joshi", city: "Pune", state: "Maharashtra", specialisations: ["Startup Advisory", "Corporate Law"], yearsExperience: 5, membershipNumber: "ICAI-312674", email: "meera@startupca.in", about: "Young CA with strong startup ecosystem connections in Pune. Specialises in DPIIT recognition, MCA compliance, and investor reporting.", isVerified: false },
  { id: "ca-009", name: "Sunil Banerjee", city: "Kolkata", state: "West Bengal", specialisations: ["Audit & Assurance", "Direct Tax"], yearsExperience: 22, membershipNumber: "ICAI-023198", email: "sunil@banerjee-co.in", about: "Veteran CA with 22 years in statutory audit and direct tax. Strong track record with listed companies and PSUs in eastern India.", isVerified: true },
  { id: "ca-010", name: "Kavitha Reddy", city: "Hyderabad", state: "Telangana", specialisations: ["Startup Advisory", "GST Advisory"], yearsExperience: 4, membershipNumber: "ICAI-387621", email: "kavitha@reddy-ca.in", about: "Hyderabad-based CA supporting IT and tech startups with comprehensive compliance — from incorporation to Series A fundraising.", isVerified: false },
  { id: "ca-011", name: "Harish Gupta", city: "Delhi", state: "Delhi", specialisations: ["Corporate Law", "Direct Tax", "Audit & Assurance"], yearsExperience: 14, membershipNumber: "ICAI-078234", email: "harish@hgca.in", about: "Full-service CA practice in Connaught Place. Serves medium enterprises with audit, tax planning, and corporate secretarial services.", isVerified: true },
  { id: "ca-012", name: "Nalini Venkat", city: "Chennai", state: "Tamil Nadu", specialisations: ["Tax Planning", "NRI & International Tax"], yearsExperience: 8, membershipNumber: "ICAI-241876", email: "nalini@nvca.in", about: "Chennai-based CA with dual expertise in domestic tax planning and NRI taxation. Growing practice serving the Tamil diaspora in Singapore and USA.", isVerified: true },
]

export const directorySpecialisations = [
  "All",
  "GST Advisory",
  "Audit & Assurance",
  "Startup Advisory",
  "NRI & International Tax",
  "Tax Planning",
  "Corporate Law",
  "Direct Tax",
  "Banking & Finance",
]

export const directoryCities = ["All", "Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Pune", "Chennai", "Kolkata", "Ahmedabad", "Kochi"]
