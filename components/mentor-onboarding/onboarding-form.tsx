'use client'

import { useState } from 'react'
import { CheckCircle, Loader2, ChevronRight, ChevronLeft } from 'lucide-react'

const SPECIALISATIONS = [
  'Statutory Audit', 'Internal Audit', 'Tax Advisory', 'GST', 'Transfer Pricing',
  'Transaction Advisory / M&A', 'Forensic Accounting', 'CFO / Finance Leadership',
  'IFRS / Ind AS', 'Risk & Compliance', 'Startup Finance', 'Personal Finance',
]

const MENTORING_AREAS = [
  'Articleship firm selection', 'Big 4 interview prep', 'Career path guidance',
  'ICAI exam strategy', 'Starting own practice', 'Industry / CFO transition',
  'Women in CA — specific challenges', 'Work-life balance', 'Specialisation guidance',
]

const WEEKLY_SLOTS = [
  'Monday Morning', 'Monday Evening',
  'Tuesday Morning', 'Tuesday Evening',
  'Wednesday Morning', 'Wednesday Evening',
  'Thursday Morning', 'Thursday Evening',
  'Friday Morning', 'Friday Evening',
  'Saturday Morning', 'Saturday Afternoon',
  'Sunday Morning', 'Sunday Afternoon',
]

const SESSION_FORMATS = ['Google Meet', 'Zoom', 'Microsoft Teams', 'Phone Call']

const STEPS = [
  { label: 'Personal Info', num: 1 },
  { label: 'Professional Details', num: 2 },
  { label: 'Mentoring Preferences', num: 3 },
  { label: 'Review & Submit', num: 4 },
]

type FormData = {
  name: string
  email: string
  phone: string
  linkedIn: string
  city: string
  designation: string
  organisation: string
  organisationType: string
  yearsExperience: string
  membershipNumber: string
  specialisations: string[]
  careerHighlights: string
  mentoringAreas: string[]
  weeklySlots: string[]
  sessionFormat: string
  maxSessionsPerWeek: string
  languages: string
  noteToStudents: string
}

const INITIAL: FormData = {
  name: '', email: '', phone: '', linkedIn: '', city: '',
  designation: '', organisation: '', organisationType: '', yearsExperience: '', membershipNumber: '',
  specialisations: [], careerHighlights: '',
  mentoringAreas: [], weeklySlots: [], sessionFormat: '', maxSessionsPerWeek: '2', languages: '', noteToStudents: '',
}

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]
}

export default function OnboardingForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(INITIAL)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const set = (key: keyof FormData, val: string | string[]) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/mentorship/mentor-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          languages: form.languages.split(',').map(l => l.trim()).filter(Boolean),
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16 px-4">
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-5" />
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
        <p className="text-gray-600 mb-2 max-w-md mx-auto">
          Thank you, <strong>{form.name}</strong>. We'll review your application and get back to you within 5 business days.
        </p>
        <p className="text-sm text-gray-500">Confirmation sent to <strong>{form.email}</strong></p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        {STEPS.map((s, i) => (
          <div key={s.num} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step > s.num ? 'bg-emerald-500 text-white' : step === s.num ? 'bg-[#D97706] text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {step > s.num ? '✓' : s.num}
              </div>
              <span className={`text-[10px] mt-1 hidden sm:block ${step === s.num ? 'text-[#D97706] font-medium' : 'text-gray-400'}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-2 ${step > s.num ? 'bg-emerald-400' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Personal Info */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'name', label: 'Full Name *', type: 'text', placeholder: 'CA Rahul Khanna' },
              { key: 'email', label: 'Email *', type: 'email', placeholder: 'you@example.com' },
              { key: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '+91 98765 43210' },
              { key: 'city', label: 'City *', type: 'text', placeholder: 'Mumbai' },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type={type}
                  value={form[key as keyof FormData] as string}
                  onChange={e => set(key as keyof FormData, e.target.value)}
                  placeholder={placeholder}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">LinkedIn Profile URL *</label>
            <input
              type="url"
              value={form.linkedIn}
              onChange={e => set('linkedIn', e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
            />
          </div>
        </div>
      )}

      {/* Step 2: Professional */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Professional Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'designation', label: 'Designation *', placeholder: 'Senior Manager – Audit' },
              { key: 'organisation', label: 'Organisation *', placeholder: 'Deloitte India' },
              { key: 'yearsExperience', label: 'Years of Experience *', placeholder: '12' },
              { key: 'membershipNumber', label: 'ICAI Membership No. *', placeholder: '123456' },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                <input
                  type="text"
                  value={form[key as keyof FormData] as string}
                  onChange={e => set(key as keyof FormData, e.target.value)}
                  placeholder={placeholder}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Organisation Type *</label>
            <select
              value={form.organisationType}
              onChange={e => set('organisationType', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] bg-white"
            >
              <option value="">Select type</option>
              <option value="big4">Big 4</option>
              <option value="mid-size">Mid-size Firm</option>
              <option value="boutique">Boutique Firm</option>
              <option value="industry">Industry / Listed Co.</option>
              <option value="icai">ICAI / Regulatory</option>
              <option value="own-practice">Own Practice</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Specialisations (select all that apply)</label>
            <div className="flex flex-wrap gap-2">
              {SPECIALISATIONS.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set('specialisations', toggle(form.specialisations, s))}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    form.specialisations.includes(s)
                      ? 'bg-[#D97706] text-white border-[#D97706]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#D97706]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Career Highlights *</label>
            <textarea
              value={form.careerHighlights}
              onChange={e => set('careerHighlights', e.target.value)}
              rows={4}
              placeholder="Share your key career milestones, notable engagements, or achievements that would inspire students..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] resize-none"
            />
          </div>
        </div>
      )}

      {/* Step 3: Mentoring Preferences */}
      {step === 3 && (
        <div className="space-y-5">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Mentoring Preferences</h2>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">What can you help students with?</label>
            <div className="flex flex-wrap gap-2">
              {MENTORING_AREAS.map(a => (
                <button
                  key={a}
                  type="button"
                  onClick={() => set('mentoringAreas', toggle(form.mentoringAreas, a))}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    form.mentoringAreas.includes(a)
                      ? 'bg-[#D97706] text-white border-[#D97706]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#D97706]'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Generally available slots</label>
            <div className="flex flex-wrap gap-2">
              {WEEKLY_SLOTS.map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => set('weeklySlots', toggle(form.weeklySlots, slot))}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    form.weeklySlots.includes(slot)
                      ? 'bg-[#D97706] text-white border-[#D97706]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#D97706]'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Session Format *</label>
              <select
                value={form.sessionFormat}
                onChange={e => set('sessionFormat', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] bg-white"
              >
                <option value="">Select format</option>
                {SESSION_FORMATS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Max sessions per week</label>
              <select
                value={form.maxSessionsPerWeek}
                onChange={e => set('maxSessionsPerWeek', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] bg-white"
              >
                {['1', '2', '3', '4', '5'].map(n => <option key={n} value={n}>{n} session{n !== '1' ? 's' : ''}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Languages (comma separated)</label>
            <input
              type="text"
              value={form.languages}
              onChange={e => set('languages', e.target.value)}
              placeholder="English, Hindi, Marathi"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Note to students (optional)</label>
            <textarea
              value={form.noteToStudents}
              onChange={e => set('noteToStudents', e.target.value)}
              rows={3}
              placeholder="Anything specific students should know before booking a session with you..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] resize-none"
            />
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Review & Submit</h2>
          <div className="bg-gray-50 rounded-xl p-5 space-y-3 text-sm">
            {[
              { label: 'Name', value: form.name },
              { label: 'Email', value: form.email },
              { label: 'City', value: form.city },
              { label: 'Designation', value: form.designation },
              { label: 'Organisation', value: form.organisation },
              { label: 'Experience', value: `${form.yearsExperience} years` },
              { label: 'ICAI Membership', value: form.membershipNumber },
              { label: 'Session Format', value: form.sessionFormat },
              { label: 'Max Sessions/Week', value: form.maxSessionsPerWeek },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="text-gray-500 shrink-0">{label}</span>
                <span className="text-gray-800 font-medium text-right">{value || '—'}</span>
              </div>
            ))}
            <div>
              <span className="text-gray-500">Specialisations</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {form.specialisations.map(s => (
                  <span key={s} className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full text-xs">{s}</span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            By submitting, you confirm that all information provided is accurate. Your profile will be reviewed and activated within 5 business days.
          </p>

          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <button
            onClick={() => setStep(s => (s - 1) as 1 | 2 | 3 | 4)}
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        ) : <div />}

        {step < 4 ? (
          <button
            onClick={() => setStep(s => (s + 1) as 1 | 2 | 3 | 4)}
            className="flex items-center gap-1.5 bg-[#D97706] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
          >
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 bg-[#D97706] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors disabled:opacity-70"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Submit Application
          </button>
        )}
      </div>
    </div>
  )
}
