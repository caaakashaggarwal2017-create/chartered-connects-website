'use client'

import { useState, useMemo, useCallback } from 'react'
import { ResumeData, AnalysisResult, emptyResumeData } from '@/lib/resume/types'
import { TemplateId } from '@/lib/resume/templates'
import BuilderForm from '@/components/resume/builder-form'
import UploadZone from '@/components/resume/upload-zone'
import ResumePreview from '@/components/resume/resume-preview'
import TemplateSelector from '@/components/resume/template-selector'
import AISuggestions from '@/components/resume/ai-suggestions'
import DownloadBtn from '@/components/resume/download-btn'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'

/* ── localStorage hook ── */
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch { return initialValue }
  })
  const setValue = useCallback((value: T) => {
    setStoredValue(value)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value))
    }
  }, [key])
  return [storedValue, setValue] as const
}

type Mode = 'build' | 'upload'

export default function ResumeBuilderPage() {
  const [resumeData, setResumeData] = useLocalStorage<ResumeData>('cc-resume-data', emptyResumeData)
  const [mode, setMode] = useState<Mode>('build')
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('classic')
  const [uploadLoading, setUploadLoading] = useState(false)
  const [uploadedText, setUploadedText] = useState('')
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [analysingUpload, setAnalysingUpload] = useState(false)
  const [showConfirmReset, setShowConfirmReset] = useState(false)
  const { toast } = useToast()

  /* ── Memoised preview so it doesn't re-render every keystroke ── */
  const preview = useMemo(() => (
    <ResumePreview data={resumeData} template={selectedTemplate} />
  ), [resumeData, selectedTemplate])

  /* ── File upload & parse ── */
  const handleFileSelected = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Please upload a file under 5MB.', variant: 'destructive' })
      return
    }
    setUploadLoading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/resume/parse-pdf', { method: 'POST', body: fd })
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      setUploadedText(json.text)
      await analyseResume(json.text)
      toast({ title: '✅ Resume parsed!', description: 'AI is now analysing your resume…' })
    } catch (err: any) {
      toast({ title: 'Parse failed', description: err.message || 'Could not read file.', variant: 'destructive' })
    } finally {
      setUploadLoading(false)
    }
  }

  const analyseResume = async (text: string) => {
    setAnalysingUpload(true)
    try {
      const res = await fetch('/api/resume/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'full_analysis', content: text.slice(0, 4000) }),
      })
      const json = await res.json()
      if (json.success) {
        try { setAnalysis(JSON.parse(json.result)) } catch {}
      }
    } finally {
      setAnalysingUpload(false)
    }
  }

  const handleApplySuggestion = (_section: string, suggestion: string) => {
    setResumeData({ ...resumeData, summary: suggestion, lastUpdated: new Date().toISOString() })
    toast({ title: '✅ Suggestion applied', description: 'Your resume has been updated.' })
  }

  const handleReset = () => {
    setResumeData(emptyResumeData)
    setAnalysis(null)
    setUploadedText('')
    setShowConfirmReset(false)
    toast({ title: 'Started fresh!', description: 'All resume data has been cleared.' })
  }

  const PreviewPanel = (
    <div className="sticky top-24">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-[#0A1628] px-4 py-3 flex items-center justify-between">
          <span className="text-white text-sm font-medium">Live Preview</span>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-xs hidden sm:block">Updates as you type</span>
            <DownloadBtn resumeData={resumeData} variant="pdf" />
          </div>
        </div>
        <div className="overflow-y-auto max-h-[620px] bg-gray-50 p-2">
          <div className="bg-white shadow-sm mx-auto text-xs scale-[0.85] origin-top" style={{ width: '118%', marginLeft: '-9%' }}>
            {preview}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Choose template</p>
        <TemplateSelector selected={selectedTemplate} onChange={setSelectedTemplate} />
      </div>
      <button
        onClick={() => setShowConfirmReset(true)}
        className="mt-4 w-full text-xs text-gray-400 hover:text-red-500 transition-colors text-center"
      >
        Start over (clear all data)
      </button>
    </div>
  )

  return (
    <>
      <Toaster />

      {/* Confirm reset dialog */}
      {showConfirmReset && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-bold text-[#0A1628] mb-2">Start over?</h3>
            <p className="text-gray-600 text-sm mb-5">This will clear all your resume data. This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirmReset(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleReset} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600">Clear All</button>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="bg-[#0A1628] py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-[#059669] text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full mb-5">
            AI-Powered · Free Tool
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            CA Resume Builder
          </h1>
          <p className="text-gray-400 text-base lg:text-lg max-w-2xl mx-auto mb-2">
            Build a professional CA resume from scratch, or upload your existing resume and let AI improve it.
          </p>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Tailored for articleship applications, CA job roles, Big 4 applications, and senior CA positions.
          </p>
        </div>
      </section>

      {/* Mode selector */}
      <section className="bg-gray-50 border-b border-gray-200 py-6 sticky top-16 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Build from scratch */}
            <button
              onClick={() => setMode('build')}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${mode === 'build' ? 'border-[#059669] bg-white shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${mode === 'build' ? 'bg-[#059669]' : 'bg-gray-100'}`}>
                <svg className={`w-6 h-6 ${mode === 'build' ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm ${mode === 'build' ? 'text-[#0A1628]' : 'text-gray-700'}`}>Build from scratch</p>
                <p className="text-gray-500 text-xs mt-0.5">Fill in your details step by step — we format it professionally</p>
              </div>
              {mode === 'build' && (
                <div className="w-5 h-5 bg-[#059669] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
              )}
            </button>

            {/* Upload & improve */}
            <button
              onClick={() => setMode('upload')}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${mode === 'upload' ? 'border-[#059669] bg-white shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${mode === 'upload' ? 'bg-[#059669]' : 'bg-gray-100'}`}>
                <svg className={`w-6 h-6 ${mode === 'upload' ? 'text-white' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm ${mode === 'upload' ? 'text-[#0A1628]' : 'text-gray-700'}`}>Upload & improve with AI</p>
                <p className="text-gray-500 text-xs mt-0.5">Upload your existing resume — AI will suggest improvements instantly</p>
              </div>
              {mode === 'upload' && (
                <div className="w-5 h-5 bg-[#059669] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main builder area */}
      <section className="bg-white py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Left: form */}
            <div className="lg:col-span-3">
              {mode === 'build' ? (
                <BuilderForm data={resumeData} onChange={setResumeData} />
              ) : (
                <div className="space-y-6">
                  <UploadZone onFileSelected={handleFileSelected} isLoading={uploadLoading} />

                  {analysingUpload && (
                    <div className="flex items-center gap-3 text-sm text-gray-600 bg-green-50 border border-green-200 rounded-xl p-4">
                      <svg className="animate-spin w-5 h-5 text-[#059669] flex-shrink-0" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      AI is analysing your resume… this takes 10–20 seconds.
                    </div>
                  )}

                  {analysis && !analysingUpload && (
                    <AISuggestions analysis={analysis} onApplySuggestion={handleApplySuggestion} />
                  )}

                  {uploadedText && (
                    <div className="border-t border-gray-100 pt-6">
                      <p className="text-sm font-semibold text-[#0A1628] mb-4">Edit your parsed resume below, then download:</p>
                      <BuilderForm data={resumeData} onChange={setResumeData} />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right: preview (desktop) */}
            <div className="lg:col-span-2 hidden lg:block">
              {PreviewPanel}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: floating preview button */}
      <div className="lg:hidden fixed bottom-5 right-5 z-40">
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex items-center gap-2 bg-[#059669] text-white font-semibold text-sm rounded-full px-4 py-3 shadow-lg hover:bg-[#047857] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview Resume
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh] bg-white p-0 overflow-y-auto">
            <SheetHeader className="p-4 border-b">
              <SheetTitle>Resume Preview</SheetTitle>
            </SheetHeader>
            <div className="p-4">
              {PreviewPanel}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
