'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { AITool } from '@/lib/types/ai-tool'

interface DemoRequestFormProps {
  tool: AITool | null
  isOpen: boolean
  onClose: () => void
}

const emptyForm = {
  name: '', email: '', phone: '', designation: '', organisation: '', goal: '', teamSize: '',
}

export default function DemoRequestForm({ tool, isOpen, onClose }: DemoRequestFormProps) {
  const [form, setForm] = useState(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/ai-tools/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, toolId: tool?.id, toolName: tool?.name }),
      })
      const json = await res.json()
      if (!json.success) throw new Error('Submission failed')
      setIsSubmitted(true)
      setForm(emptyForm)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setIsSubmitted(false)
    setError('')
    setForm(emptyForm)
    onClose()
  }

  const inputCls = 'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563EB] transition-colors'

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {tool && (
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ background: tool.accentColor }}
              >
                {tool.logoInitials}
              </div>
            )}
            <div>
              <p className="font-bold text-[#0A1628]">Request a Demo</p>
              <p className="text-sm text-gray-500 font-normal">{tool?.name}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-[#0A1628] mb-1">Demo Request Sent!</h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              The {tool?.name} team will contact you within 2 working days to arrange your personalised demo.
            </p>
            <button onClick={handleClose} className="mt-4 text-[#2563EB] text-sm font-medium hover:underline">
              Explore more tools →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" required placeholder="CA Priya Sharma" className={inputCls}
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Email *</label>
              <input type="email" required placeholder="you@yourfirm.com" className={inputCls}
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" placeholder="+91 98765 43210" className={inputCls}
                value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Role *</label>
              <select required className={inputCls + ' bg-white'}
                value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })}>
                <option value="">Select your role</option>
                <option>Chartered Accountant (Practice)</option>
                <option>Chartered Accountant (Industry)</option>
                <option>CA Student / Articleship</option>
                <option>CFO / Finance Director</option>
                <option>Finance Manager</option>
                <option>Accounts Manager</option>
                <option>Business Owner</option>
                <option>Other Finance Professional</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organisation / Firm</label>
              <input type="text" placeholder="Sharma & Associates" className={inputCls}
                value={form.organisation} onChange={e => setForm({ ...form, organisation: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">What are you hoping to achieve?</label>
              <textarea rows={3} className={inputCls + ' resize-none'}
                placeholder="e.g. Automate my GST reconciliation, reduce audit time..."
                value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team / Firm Size</label>
              <select className={inputCls + ' bg-white'}
                value={form.teamSize} onChange={e => setForm({ ...form, teamSize: e.target.value })}>
                <option value="">Select size</option>
                <option>Solo / Freelance</option>
                <option>2–10 people</option>
                <option>11–50 people</option>
                <option>51–200 people</option>
                <option>200+ people</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            <button type="submit" disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#2563EB] text-white font-semibold text-sm rounded-lg px-4 py-3 hover:bg-[#1d4ed8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
              {isSubmitting ? (
                <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>Submitting...</>
              ) : 'Request Demo'}
            </button>
            <p className="text-gray-400 text-xs text-center">
              We'll share your details with the tool vendor to arrange a personalised demo.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
