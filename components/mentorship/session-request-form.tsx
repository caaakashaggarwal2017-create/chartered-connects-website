'use client'

import { useState } from 'react'
import { X, Loader2, CheckCircle } from 'lucide-react'
import { Mentor, MentorSlot } from '@/lib/types/mentorship'
import SlotPicker from './slot-picker'

interface SessionRequestFormProps {
  mentor: Mentor
  onClose: () => void
}

const LEVELS = ['CA Foundation', 'CA Intermediate', 'CA Final', 'Articleship', 'Newly Qualified', 'Post-Qualification']

const TOPICS = [
  'Articleship firm selection',
  'Big 4 interview preparation',
  'Audit & assurance career path',
  'Tax & advisory career path',
  'Industry / CFO track',
  'Starting own practice',
  'Work-life balance as a CA',
  'ICAI exams strategy',
  'Specialisation guidance',
  'General career counselling',
]

export default function SessionRequestForm({ mentor, onClose }: SessionRequestFormProps) {
  const [step, setStep] = useState<1 | 2>(1)
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null)
  const [form, setForm] = useState({
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    studentLevel: '',
    topic: '',
    goal: '',
    linkedIn: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const selectedSlot = mentor.availableSlots.find(s => s.id === selectedSlotId)

  const handleSubmit = async () => {
    if (!selectedSlotId || !form.studentName || !form.studentEmail || !form.studentLevel || !form.topic) {
      setError('Please fill in all required fields.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/mentorship/request-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mentorId: mentor.id,
          mentorName: mentor.name,
          slotId: selectedSlotId,
          slotDetails: selectedSlot ? `${selectedSlot.day}, ${selectedSlot.date} · ${selectedSlot.time}` : '',
          ...form,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="p-6 text-center">
        <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-900 mb-2">Request Sent!</h3>
        <p className="text-sm text-gray-600 mb-1">
          Your session request with <span className="font-medium">{mentor.name}</span> has been submitted.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          You'll receive a confirmation on <span className="font-medium">{form.studentEmail}</span> within 48 hours.
        </p>
        <button onClick={onClose} className="bg-[#D97706] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors">
          Done
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col max-h-[85vh]">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div>
          <h2 className="text-base font-bold text-gray-900">Request a Session</h2>
          <p className="text-xs text-gray-500 mt-0.5">with {mentor.name}</p>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-gray-100">
        {[1, 2].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= s ? 'bg-[#D97706] text-white' : 'bg-gray-100 text-gray-400'}`}>
              {s}
            </div>
            <span className={`text-xs ${step >= s ? 'text-[#D97706] font-medium' : 'text-gray-400'}`}>
              {s === 1 ? 'Pick a slot' : 'Your details'}
            </span>
            {s < 2 && <div className="w-8 h-px bg-gray-200 mx-1" />}
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="overflow-y-auto p-5 flex-1">
        {step === 1 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Select an available slot</p>
            <SlotPicker
              slots={mentor.availableSlots}
              selectedSlotId={selectedSlotId}
              onSelect={setSelectedSlotId}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            {selectedSlot && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
                <span className="text-amber-700 font-medium">Selected: </span>
                <span className="text-amber-800">{selectedSlot.day}, {selectedSlot.date} · {selectedSlot.time}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={form.studentName}
                  onChange={e => setForm(f => ({ ...f, studentName: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={form.studentEmail}
                  onChange={e => setForm(f => ({ ...f, studentEmail: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone (optional)</label>
                <input
                  type="tel"
                  value={form.studentPhone}
                  onChange={e => setForm(f => ({ ...f, studentPhone: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">CA Level *</label>
                <select
                  value={form.studentLevel}
                  onChange={e => setForm(f => ({ ...f, studentLevel: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] bg-white"
                >
                  <option value="">Select level</option>
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Topic *</label>
              <select
                value={form.topic}
                onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] bg-white"
              >
                <option value="">What would you like to discuss?</option>
                {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Your goal for this session (optional)</label>
              <textarea
                value={form.goal}
                onChange={e => setForm(f => ({ ...f, goal: e.target.value }))}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] resize-none"
                placeholder="e.g. I want to understand how to crack a Big 4 articleship interview..."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">LinkedIn Profile (optional)</label>
              <input
                type="url"
                value={form.linkedIn}
                onChange={e => setForm(f => ({ ...f, linkedIn: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            {error && <p className="text-xs text-red-600">{error}</p>}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-5 border-t border-gray-100 flex justify-between">
        {step === 2 && (
          <button
            onClick={() => setStep(1)}
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back
          </button>
        )}
        {step === 1 && (
          <button
            onClick={() => selectedSlotId && setStep(2)}
            disabled={!selectedSlotId}
            className="ml-auto bg-[#D97706] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
        )}
        {step === 2 && (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="ml-auto bg-[#D97706] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors disabled:opacity-70 flex items-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Send Request
          </button>
        )}
      </div>
    </div>
  )
}
