'use client'

import { useState, useRef, DragEvent } from 'react'
import { cn } from '@/lib/utils/cn'

interface UploadZoneProps {
  onFileSelected: (file: File) => void
  isLoading: boolean
}

export default function UploadZone({ onFileSelected, isLoading }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: DragEvent) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = () => setIsDragging(false)
  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) onFileSelected(file)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onFileSelected(file)
  }

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'border-2 border-dashed rounded-xl p-10 text-center transition-all',
          isDragging ? 'border-[#059669] bg-green-50' : 'border-gray-300 hover:border-[#059669] hover:bg-gray-50',
          isLoading && 'opacity-60 pointer-events-none'
        )}
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {isLoading ? (
            <svg className="animate-spin w-8 h-8 text-[#059669]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-[#059669]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          )}
        </div>
        <p className="text-gray-700 font-semibold mb-1">
          {isLoading ? 'Parsing your resume…' : 'Drop your resume here'}
        </p>
        <p className="text-gray-500 text-sm mb-4">PDF or DOCX — max 5MB</p>
        {!isLoading && (
          <label className="inline-flex items-center justify-center gap-2 bg-[#059669] text-white font-semibold text-sm rounded-md px-5 py-2.5 hover:bg-[#047857] transition-colors cursor-pointer">
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleChange}
            />
            Browse Files
          </label>
        )}
      </div>
      <p className="text-gray-400 text-xs text-center">
        🔒 Your resume is processed temporarily and never stored on our servers. We use AI to suggest improvements but never share your personal data.
      </p>
    </div>
  )
}
