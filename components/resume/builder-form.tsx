'use client'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  ResumeData, WorkExperience, Education, Certification, Language,
  CA_SPECIALISATIONS, TECH_SKILL_SUGGESTIONS, SOFT_SKILL_SUGGESTIONS,
  QUICK_CERTIFICATIONS, MONTHS, TARGET_ROLES,
} from '@/lib/resume/types'
import ProgressBar from './progress-bar'
import DownloadBtn from './download-btn'
import { cn } from '@/lib/utils/cn'
import { useToast } from '@/components/ui/use-toast'

interface BuilderFormProps {
  data: ResumeData
  onChange: (data: ResumeData) => void
}

const YEARS = Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i))
const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Articleship', 'Internship', 'Freelance'] as const

export default function BuilderForm({ data, onChange }: BuilderFormProps) {
  const [step, setStep] = useState(1)
  const [enhancing, setEnhancing] = useState<string | null>(null)
  const { toast } = useToast()

  const set = (path: keyof ResumeData, value: unknown) =>
    onChange({ ...data, [path]: value, lastUpdated: new Date().toISOString() })

  const setPersonal = (key: keyof ResumeData['personalInfo'], value: string) =>
    set('personalInfo', { ...data.personalInfo, [key]: value })

  const setCAQual = (key: keyof ResumeData['caQualification'], value: string) =>
    set('caQualification', { ...data.caQualification, [key]: value })

  /* ── AI enhance ── */
  const enhanceSummary = async () => {
    setEnhancing('summary')
    try {
      const res = await fetch('/api/resume/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'summary',
          content: data.summary || 'CA professional with experience in auditing and taxation',
          context: {
            name: data.personalInfo.name,
            targetRole: data.targetRole,
            skills: data.caSpecialisations.slice(0, 5),
            yearsExperience: data.workExperience.length,
          },
        }),
      })
      const json = await res.json()
      if (json.success) {
        set('summary', json.result)
        toast({ title: '✨ Summary improved!', description: 'Your professional summary has been enhanced by AI.' })
      }
    } finally {
      setEnhancing(null)
    }
  }

  const enhanceBullets = async (expId: string) => {
    setEnhancing(expId)
    const exp = data.workExperience.find((e) => e.id === expId)
    if (!exp) return
    try {
      const res = await fetch('/api/resume/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'experience_bullets',
          content: exp.responsibilities,
          context: { role: exp.title, company: exp.company, targetRole: data.targetRole },
        }),
      })
      const json = await res.json()
      if (json.success) {
        updateExp(expId, 'responsibilities', json.result)
        toast({ title: '✨ Bullets improved!', description: 'Your experience bullets have been enhanced.' })
      }
    } finally {
      setEnhancing(null)
    }
  }

  /* ── Work experience helpers ── */
  const addExp = () =>
    set('workExperience', [...data.workExperience, {
      id: uuidv4(), company: '', title: '', employmentType: 'Full-time',
      startMonth: '', startYear: '', endMonth: '', endYear: '', isPresent: false, responsibilities: '',
    } as WorkExperience])

  const removeExp = (id: string) => set('workExperience', data.workExperience.filter((e) => e.id !== id))
  const updateExp = (id: string, key: keyof WorkExperience, val: unknown) =>
    set('workExperience', data.workExperience.map((e) => e.id === id ? { ...e, [key]: val } : e))

  /* ── Education helpers ── */
  const addEdu = () => set('education', [...data.education, { id: uuidv4(), degree: '', institution: '', year: '', score: '' } as Education])
  const removeEdu = (id: string) => set('education', data.education.filter((e) => e.id !== id))
  const updateEdu = (id: string, key: keyof Education, val: string) =>
    set('education', data.education.map((e) => e.id === id ? { ...e, [key]: val } : e))

  /* ── Certification helpers ── */
  const addCert = (name = '', body = '') => set('certifications', [...data.certifications, { id: uuidv4(), name, issuingBody: body, year: '' } as Certification])
  const removeCert = (id: string) => set('certifications', data.certifications.filter((c) => c.id !== id))
  const updateCert = (id: string, key: keyof Certification, val: string) =>
    set('certifications', data.certifications.map((c) => c.id === id ? { ...c, [key]: val } : c))

  /* ── Tag input helpers ── */
  const toggleSkill = (skill: string, field: 'technicalSkills' | 'caSpecialisations' | 'softSkills') => {
    const arr = data[field] as string[]
    set(field, arr.includes(skill) ? arr.filter((s) => s !== skill) : [...arr, skill])
  }
  const addTagFromInput = (e: React.KeyboardEvent<HTMLInputElement>, field: 'technicalSkills' | 'softSkills') => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const val = (e.target as HTMLInputElement).value.trim().replace(/,$/, '')
      if (val && !(data[field] as string[]).includes(val)) {
        set(field, [...(data[field] as string[]), val])
      }
      ;(e.target as HTMLInputElement).value = ''
    }
  }

  /* ── Language helpers ── */
  const addLang = () => set('languages', [...data.languages, { id: uuidv4(), name: '', canRead: true, canWrite: true, canSpeak: true } as Language])
  const removeLang = (id: string) => set('languages', data.languages.filter((l) => l.id !== id))
  const updateLang = (id: string, key: keyof Language, val: unknown) =>
    set('languages', data.languages.map((l) => l.id === id ? { ...l, [key]: val } : l))

  const fieldCls = 'border-gray-200 focus:border-[#059669] focus:ring-[#059669]'

  return (
    <div>
      <ProgressBar currentStep={step} onStepClick={(s) => s <= step && setStep(s)} />

      {/* ──── STEP 1: Personal Info ──── */}
      {step === 1 && (
        <div className="space-y-5">
          <h2 className="text-lg font-bold text-[#0A1628]">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Full Name *</Label>
              <Input className={fieldCls} placeholder="CA Priya Sharma" value={data.personalInfo.name} onChange={(e) => setPersonal('name', e.target.value)} />
            </div>
            <div>
              <Label>Email *</Label>
              <Input className={fieldCls} type="email" placeholder="priya@example.com" value={data.personalInfo.email} onChange={(e) => setPersonal('email', e.target.value)} />
            </div>
            <div>
              <Label>Phone</Label>
              <Input className={fieldCls} placeholder="+91 98765 43210" value={data.personalInfo.phone} onChange={(e) => setPersonal('phone', e.target.value)} />
            </div>
            <div>
              <Label>LinkedIn URL</Label>
              <Input className={fieldCls} placeholder="linkedin.com/in/yourprofile" value={data.personalInfo.linkedIn} onChange={(e) => setPersonal('linkedIn', e.target.value)} />
            </div>
            <div>
              <Label>City</Label>
              <Input className={fieldCls} placeholder="Mumbai" value={data.personalInfo.city} onChange={(e) => setPersonal('city', e.target.value)} />
            </div>
            <div>
              <Label>State</Label>
              <Input className={fieldCls} placeholder="Maharashtra" value={data.personalInfo.state} onChange={(e) => setPersonal('state', e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Professional Headline</Label>
            <Input
              className={fieldCls}
              placeholder="Chartered Accountant | GST Specialist | 5 Years Experience"
              maxLength={100}
              value={data.personalInfo.headline}
              onChange={(e) => setPersonal('headline', e.target.value)}
            />
            <p className="text-xs text-gray-400 mt-1">{data.personalInfo.headline.length}/100 · A strong headline is the first thing recruiters read. Be specific.</p>
          </div>
        </div>
      )}

      {/* ──── STEP 2: Work Experience ──── */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-[#0A1628]">Work Experience</h2>
          {data.workExperience.length === 0 && (
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-400 text-sm">
              No experience added yet. Click below to add your first role.
            </div>
          )}
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="border border-gray-200 rounded-xl p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Company Name *</Label>
                  <Input className={fieldCls} placeholder="Deloitte India" value={exp.company} onChange={(e) => updateExp(exp.id, 'company', e.target.value)} />
                </div>
                <div>
                  <Label>Job Title *</Label>
                  <Input className={fieldCls} placeholder="Senior Associate — Audit" value={exp.title} onChange={(e) => updateExp(exp.id, 'title', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <Label>Start Month</Label>
                  <select className="w-full h-10 rounded-md border border-gray-200 px-3 text-sm focus:border-[#059669] focus:outline-none" value={exp.startMonth} onChange={(e) => updateExp(exp.id, 'startMonth', e.target.value)}>
                    <option value="">Month</option>
                    {MONTHS.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Start Year</Label>
                  <select className="w-full h-10 rounded-md border border-gray-200 px-3 text-sm focus:border-[#059669] focus:outline-none" value={exp.startYear} onChange={(e) => updateExp(exp.id, 'startYear', e.target.value)}>
                    <option value="">Year</option>
                    {YEARS.map((y) => <option key={y}>{y}</option>)}
                  </select>
                </div>
                {!exp.isPresent && <>
                  <div>
                    <Label>End Month</Label>
                    <select className="w-full h-10 rounded-md border border-gray-200 px-3 text-sm focus:border-[#059669] focus:outline-none" value={exp.endMonth} onChange={(e) => updateExp(exp.id, 'endMonth', e.target.value)}>
                      <option value="">Month</option>
                      {MONTHS.map((m) => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label>End Year</Label>
                    <select className="w-full h-10 rounded-md border border-gray-200 px-3 text-sm focus:border-[#059669] focus:outline-none" value={exp.endYear} onChange={(e) => updateExp(exp.id, 'endYear', e.target.value)}>
                      <option value="">Year</option>
                      {YEARS.map((y) => <option key={y}>{y}</option>)}
                    </select>
                  </div>
                </>}
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={exp.isPresent} onChange={(e) => updateExp(exp.id, 'isPresent', e.target.checked)} className="accent-[#059669]" />
                Currently working here
              </label>
              <div>
                <Label>Employment Type</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {EMPLOYMENT_TYPES.map((t) => (
                    <button key={t} onClick={() => updateExp(exp.id, 'employmentType', t)}
                      className={cn('px-3 py-1 rounded-full text-xs font-medium border transition-colors', exp.employmentType === t ? 'bg-[#059669] text-white border-[#059669]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#059669]')}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Key Responsibilities</Label>
                <Textarea
                  className={cn('resize-none', fieldCls)}
                  rows={4}
                  placeholder={'• Handled statutory audits for 12+ manufacturing clients\n• Filed 200+ GSTR-3B returns with 100% on-time compliance\n• Prepared financials for companies with turnover up to ₹50 Cr'}
                  value={exp.responsibilities}
                  onChange={(e) => updateExp(exp.id, 'responsibilities', e.target.value)}
                />
                <button
                  disabled={enhancing === exp.id || !exp.responsibilities}
                  onClick={() => enhanceBullets(exp.id)}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#059669] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {enhancing === exp.id ? (
                    <><svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>Improving…</>
                  ) : '✨ Improve with AI'}
                </button>
              </div>
              <button onClick={() => removeExp(exp.id)} className="text-red-500 text-xs hover:underline">Remove</button>
            </div>
          ))}
          <button onClick={addExp} className="flex items-center gap-2 text-[#059669] font-medium text-sm hover:underline">
            <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-[#059669] font-bold text-base leading-none">+</span>
            Add Experience
          </button>
        </div>
      )}

      {/* ──── STEP 3: Education & Qualifications ──── */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-[#0A1628]">Education & Qualifications</h2>

          {/* CA Qualification */}
          <div className="border border-[#059669]/30 bg-green-50/40 rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-[#0A1628] text-sm flex items-center gap-2">
              <span className="w-5 h-5 bg-[#059669] rounded-full flex items-center justify-center text-white text-[10px] font-bold">CA</span>
              CA Qualification
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>CA Level</Label>
                <select className="w-full h-10 rounded-md border border-gray-200 px-3 text-sm focus:border-[#059669] focus:outline-none" value={data.caQualification.level} onChange={(e) => setCAQual('level', e.target.value as any)}>
                  <option value="Foundation">CA Foundation</option>
                  <option value="IPCC">CA IPCC / Intermediate</option>
                  <option value="Final">CA Final (Qualified)</option>
                </select>
              </div>
              <div>
                <Label>ICAI Membership Number</Label>
                <Input className={fieldCls} placeholder="XXXXXXXX (if qualified)" value={data.caQualification.membershipNumber} onChange={(e) => setCAQual('membershipNumber', e.target.value)} />
              </div>
              <div>
                <Label>Month of Passing CA Final</Label>
                <select className="w-full h-10 rounded-md border border-gray-200 px-3 text-sm focus:border-[#059669] focus:outline-none" value={data.caQualification.passingMonth} onChange={(e) => setCAQual('passingMonth', e.target.value)}>
                  <option value="">Select month</option>
                  {MONTHS.map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <Label>Year of Passing</Label>
                <select className="w-full h-10 rounded-md border border-gray-200 px-3 text-sm focus:border-[#059669] focus:outline-none" value={data.caQualification.passingYear} onChange={(e) => setCAQual('passingYear', e.target.value)}>
                  <option value="">Select year</option>
                  {YEARS.map((y) => <option key={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <Label>All India Rank (optional)</Label>
                <Input className={fieldCls} placeholder="e.g. AIR 47" value={data.caQualification.airRank} onChange={(e) => setCAQual('airRank', e.target.value)} />
              </div>
              <div>
                <Label>Attempts Taken</Label>
                <select className="w-full h-10 rounded-md border border-gray-200 px-3 text-sm focus:border-[#059669] focus:outline-none" value={data.caQualification.attempts} onChange={(e) => setCAQual('attempts', e.target.value)}>
                  <option value="">Select</option>
                  <option>1st attempt</option>
                  <option>2nd attempt</option>
                  <option>3rd attempt</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Graduation */}
          {data.education.map((edu) => (
            <div key={edu.id} className="border border-gray-200 rounded-xl p-5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label>Degree</Label>
                  <Input className={fieldCls} placeholder="B.Com (Hons)" value={edu.degree} onChange={(e) => updateEdu(edu.id, 'degree', e.target.value)} />
                </div>
                <div>
                  <Label>College / University</Label>
                  <Input className={fieldCls} placeholder="Delhi University" value={edu.institution} onChange={(e) => updateEdu(edu.id, 'institution', e.target.value)} />
                </div>
                <div>
                  <Label>Year</Label>
                  <select className="w-full h-10 rounded-md border border-gray-200 px-3 text-sm focus:border-[#059669] focus:outline-none" value={edu.year} onChange={(e) => updateEdu(edu.id, 'year', e.target.value)}>
                    <option value="">Select year</option>
                    {YEARS.map((y) => <option key={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <Label>Percentage / CGPA</Label>
                  <Input className={fieldCls} placeholder="78% or 8.5 CGPA" value={edu.score} onChange={(e) => updateEdu(edu.id, 'score', e.target.value)} />
                </div>
              </div>
              <button onClick={() => removeEdu(edu.id)} className="text-red-500 text-xs hover:underline">Remove</button>
            </div>
          ))}
          <button onClick={addEdu} className="flex items-center gap-2 text-[#059669] font-medium text-sm hover:underline">
            <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-[#059669] font-bold text-base leading-none">+</span>
            Add Education
          </button>

          {/* Certifications */}
          <div>
            <h3 className="font-semibold text-[#0A1628] text-sm mb-3">Certifications</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {QUICK_CERTIFICATIONS.map((c) => (
                <button key={c.name} onClick={() => addCert(c.name, c.body)}
                  className="px-3 py-1 text-xs font-medium bg-green-50 text-green-700 border border-green-200 rounded-full hover:bg-green-100 transition-colors">
                  + {c.name}
                </button>
              ))}
            </div>
            {data.certifications.map((cert) => (
              <div key={cert.id} className="grid grid-cols-3 gap-3 mb-3">
                <Input className={fieldCls} placeholder="Certification" value={cert.name} onChange={(e) => updateCert(cert.id, 'name', e.target.value)} />
                <Input className={fieldCls} placeholder="Issuing body" value={cert.issuingBody} onChange={(e) => updateCert(cert.id, 'issuingBody', e.target.value)} />
                <div className="flex gap-2">
                  <Input className={fieldCls} placeholder="Year" value={cert.year} onChange={(e) => updateCert(cert.id, 'year', e.target.value)} />
                  <button onClick={() => removeCert(cert.id)} className="text-red-400 hover:text-red-600 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            ))}
            <button onClick={() => addCert()} className="flex items-center gap-2 text-[#059669] font-medium text-sm hover:underline">
              <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-[#059669] font-bold text-base leading-none">+</span>
              Add Certification
            </button>
          </div>
        </div>
      )}

      {/* ──── STEP 4: Skills ──── */}
      {step === 4 && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-[#0A1628]">Skills & Expertise</h2>

          {/* Technical Skills */}
          <div>
            <Label className="text-sm font-semibold">Technical Skills</Label>
            <p className="text-xs text-gray-500 mb-2">Type and press Enter to add, or click suggestions below</p>
            <div className="border border-gray-200 rounded-md p-2 flex flex-wrap gap-2 min-h-[48px] mb-2">
              {data.technicalSkills.map((skill) => (
                <span key={skill} className="flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                  {skill}
                  <button onClick={() => set('technicalSkills', data.technicalSkills.filter((s) => s !== skill))} className="text-gray-400 hover:text-gray-600">×</button>
                </span>
              ))}
              <input className="flex-1 min-w-[140px] outline-none text-sm p-1" placeholder="Add skill…" onKeyDown={(e) => addTagFromInput(e, 'technicalSkills')} />
            </div>
            <div className="flex flex-wrap gap-2">
              {TECH_SKILL_SUGGESTIONS.filter((s) => !data.technicalSkills.includes(s)).map((s) => (
                <button key={s} onClick={() => set('technicalSkills', [...data.technicalSkills, s])}
                  className="px-2.5 py-1 text-xs bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:border-[#059669] hover:text-[#059669] transition-colors">
                  + {s}
                </button>
              ))}
            </div>
          </div>

          {/* CA Specialisations */}
          <div>
            <Label className="text-sm font-semibold">CA Specialisations</Label>
            <p className="text-xs text-gray-500 mb-3">Select all that apply</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {CA_SPECIALISATIONS.map((spec) => (
                <label key={spec} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.caSpecialisations.includes(spec)}
                    onChange={() => toggleSkill(spec, 'caSpecialisations')}
                    className="accent-[#059669] w-4 h-4 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-700">{spec}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <Label className="text-sm font-semibold">Soft Skills</Label>
            <div className="border border-gray-200 rounded-md p-2 flex flex-wrap gap-2 min-h-[48px] mb-2 mt-2">
              {data.softSkills.map((skill) => (
                <span key={skill} className="flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                  {skill}
                  <button onClick={() => set('softSkills', data.softSkills.filter((s) => s !== skill))} className="text-gray-400 hover:text-gray-600">×</button>
                </span>
              ))}
              <input className="flex-1 min-w-[140px] outline-none text-sm p-1" placeholder="Add skill…" onKeyDown={(e) => addTagFromInput(e, 'softSkills')} />
            </div>
            <div className="flex flex-wrap gap-2">
              {SOFT_SKILL_SUGGESTIONS.filter((s) => !data.softSkills.includes(s)).map((s) => (
                <button key={s} onClick={() => set('softSkills', [...data.softSkills, s])}
                  className="px-2.5 py-1 text-xs bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:border-[#059669] hover:text-[#059669] transition-colors">
                  + {s}
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <Label className="text-sm font-semibold mb-2 block">Languages</Label>
            {data.languages.map((lang) => (
              <div key={lang.id} className="flex items-center gap-3 mb-3">
                <Input className={cn('flex-1', fieldCls)} placeholder="Language name" value={lang.name} onChange={(e) => updateLang(lang.id, 'name', e.target.value)} />
                {(['canRead', 'canWrite', 'canSpeak'] as const).map((k) => (
                  <label key={k} className="flex items-center gap-1 text-xs text-gray-600 whitespace-nowrap cursor-pointer">
                    <input type="checkbox" checked={lang[k]} onChange={(e) => updateLang(lang.id, k, e.target.checked)} className="accent-[#059669]" />
                    {k.replace('can', '')}
                  </label>
                ))}
                <button onClick={() => removeLang(lang.id)} className="text-red-400 hover:text-red-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
            <button onClick={addLang} className="flex items-center gap-2 text-[#059669] font-medium text-sm hover:underline">
              <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-[#059669] font-bold text-base leading-none">+</span>
              Add Language
            </button>
          </div>
        </div>
      )}

      {/* ──── STEP 5: Summary & Review ──── */}
      {step === 5 && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-[#0A1628]">Professional Summary & Review</h2>

          <div>
            <Label>Target Role</Label>
            <select className="w-full h-10 rounded-md border border-gray-200 px-3 text-sm mt-1 focus:border-[#059669] focus:outline-none" value={data.targetRole} onChange={(e) => set('targetRole', e.target.value)}>
              <option value="">Select target role (helps AI tailor your resume)</option>
              {TARGET_ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>

          <div>
            <Label>Professional Summary</Label>
            <Textarea
              className={cn('resize-none mt-1', fieldCls)}
              rows={5}
              placeholder="CA qualified with 5+ years of experience in statutory audit and GST advisory. Handled clients across manufacturing, retail, and IT sectors with combined turnover of ₹500+ Cr. Proven track record of delivering accurate, compliant financial work under tight deadlines."
              value={data.summary}
              onChange={(e) => set('summary', e.target.value)}
            />
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-400">{data.summary.length} chars (50–400 recommended)</p>
              <button
                onClick={enhanceSummary}
                disabled={enhancing === 'summary'}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#059669] hover:underline disabled:opacity-50"
              >
                {enhancing === 'summary' ? (
                  <><svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>Generating…</>
                ) : '✨ Generate Summary with AI'}
              </button>
            </div>
          </div>

          {/* Review accordion */}
          <div className="space-y-3">
            <h3 className="font-semibold text-[#0A1628] text-sm">Review</h3>
            {[
              { label: 'Personal Info', step: 1, content: `${data.personalInfo.name || 'Not filled'} · ${data.personalInfo.email || ''}` },
              { label: 'Work Experience', step: 2, content: `${data.workExperience.length} role(s) added` },
              { label: 'Education', step: 3, content: `CA ${data.caQualification.level} · ${data.education.length} other education(s)` },
              { label: 'Skills', step: 4, content: `${data.technicalSkills.length} technical skills · ${data.caSpecialisations.length} specialisations` },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-[#0A1628]">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.content}</p>
                </div>
                <button onClick={() => setStep(item.step)} className="text-xs text-[#059669] font-medium hover:underline">Edit →</button>
              </div>
            ))}
          </div>

          <DownloadBtn resumeData={data} />
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        {step < 5 ? (
          <button
            onClick={() => setStep((s) => Math.min(5, s + 1))}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-[#059669] text-white font-semibold text-sm hover:bg-[#047857] transition-colors"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={() => document.getElementById('resume-preview')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-[#059669] text-white font-semibold text-sm hover:bg-[#047857] transition-colors"
          >
            View Resume →
          </button>
        )}
      </div>
    </div>
  )
}
