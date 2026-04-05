'use client'

import { useState } from 'react'
import { ResumeData } from '@/lib/resume/types'

interface DownloadBtnProps {
  resumeData: ResumeData
  variant?: 'pdf' | 'both'
}

export default function DownloadBtn({ resumeData, variant = 'both' }: DownloadBtnProps) {
  const [downloading, setDownloading] = useState(false)

  const downloadPDF = async () => {
    setDownloading(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('resume-preview')
      if (!element) return
      const name = resumeData.personalInfo.name.replace(/\s+/g, '_') || 'CA'
      const opt: Record<string, unknown> = {
        margin: [8, 8, 8, 8],
        filename: `${name}_CA_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }
      await (html2pdf() as any).set(opt).from(element).save()
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-5 mt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-[#0A1628] mb-1">Your resume is ready!</h3>
          <p className="text-gray-600 text-sm">Download as PDF for job applications.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={downloadPDF}
            disabled={downloading}
            className="inline-flex items-center justify-center gap-2 bg-[#059669] text-white font-semibold text-sm rounded-md px-5 py-2.5 hover:bg-[#047857] transition-colors disabled:opacity-60"
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
      </div>
      <p className="text-gray-500 text-xs mt-3">
        💡 Tip: Save your resume as a PDF for job applications — it preserves formatting across all devices.
      </p>
    </div>
  )
}
