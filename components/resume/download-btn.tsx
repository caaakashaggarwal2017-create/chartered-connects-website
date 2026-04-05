'use client'

import { useState, useEffect } from 'react'
import { ResumeData } from '@/lib/resume/types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

const STORAGE_KEY = 'cc_resume_registered'

interface DownloadBtnProps {
  resumeData: ResumeData
  variant?: 'pdf' | 'both'
}

export default function DownloadBtn({ resumeData, variant = 'both' }: DownloadBtnProps) {
  const [showGate, setShowGate] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isRegistered, setIsRegistered] = useState(false)
  const { toast } = useToast()

  // Pre-fill from resume data if available; check localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setIsRegistered(true)
    }
    if (resumeData.personalInfo.name) setName(resumeData.personalInfo.name)
    if (resumeData.personalInfo.email) setEmail(resumeData.personalInfo.email)
  }, [resumeData.personalInfo.name, resumeData.personalInfo.email])

  const triggerDownload = async () => {
    setDownloading(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('resume-preview')
      if (!element) return
      const pdfName = resumeData.personalInfo.name.replace(/\s+/g, '_') || 'CA'
      const opt: Record<string, unknown> = {
        margin: [8, 8, 8, 8],
        filename: `${pdfName}_CA_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }
      await (html2pdf() as any).set(opt).from(element).save()
    } finally {
      setDownloading(false)
    }
  }

  const handleDownloadClick = () => {
    if (isRegistered) {
      triggerDownload()
    } else {
      setShowGate(true)
    }
  }

  const handleRegisterAndDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim()) {
      setError('Please fill in both fields.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/resume/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      })
      const json = await res.json()
      if (!json.success) {
        setError(json.error || 'Something went wrong. Please try again.')
        return
      }

      // Mark as registered in localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: name.trim(), email: email.trim(), at: new Date().toISOString() }))
      setIsRegistered(true)
      setShowGate(false)

      toast({ title: '🎉 All set!', description: 'Your resume is downloading now.' })
      await triggerDownload()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Registration gate modal */}
      {showGate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && setShowGate(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Modal header */}
            <div className="bg-[#0A1628] px-6 py-5 relative">
              <button onClick={() => setShowGate(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" aria-label="Close">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#059669] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg leading-tight">One last step</h2>
                  <p className="text-gray-400 text-xs">Your resume is ready to download!</p>
                </div>
              </div>
            </div>

            {/* Modal body */}
            <form onSubmit={handleRegisterAndDownload} className="px-6 py-5 space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                Enter your details to download your resume. We'll also send you the <span className="font-medium text-[#0A1628]">CC Weekly Newsletter</span> — CA jobs, compliance updates & career tips every Tuesday.
              </p>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="reg-name" className="text-sm font-medium text-gray-700">Full Name *</Label>
                  <Input
                    id="reg-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="CA Priya Sharma"
                    className="mt-1 border-gray-200 focus:border-[#059669] focus:ring-[#059669]"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <Label htmlFor="reg-email" className="text-sm font-medium text-gray-700">Email Address *</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priya@example.com"
                    className="mt-1 border-gray-200 focus:border-[#059669] focus:ring-[#059669]"
                    autoComplete="email"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-xs flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#059669] text-white font-semibold text-sm rounded-lg px-5 py-3 hover:bg-[#047857] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Downloading…
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download My Resume
                  </>
                )}
              </button>

              <p className="text-gray-400 text-[11px] text-center">
                No spam. Unsubscribe anytime. We never share your data.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Download card */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 mt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-[#0A1628] mb-1">Your resume is ready!</h3>
            <p className="text-gray-600 text-sm">Download as PDF for job applications.</p>
          </div>
          <button
            onClick={handleDownloadClick}
            disabled={downloading}
            className="inline-flex items-center justify-center gap-2 bg-[#059669] text-white font-semibold text-sm rounded-md px-5 py-2.5 hover:bg-[#047857] transition-colors disabled:opacity-60 whitespace-nowrap"
          >
            {downloading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Generating…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>
        <p className="text-gray-500 text-xs mt-3">
          💡 Tip: Save your resume as a PDF for job applications — it preserves formatting across all devices.
        </p>
      </div>
    </>
  )
}
