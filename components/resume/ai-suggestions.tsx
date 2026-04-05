'use client'

import { useState } from 'react'
import { AnalysisResult } from '@/lib/resume/types'
import { cn } from '@/lib/utils/cn'

interface AISuggestionsProps {
  analysis: AnalysisResult
  onApplySuggestion: (section: string, suggestion: string) => void
}

export default function AISuggestions({ analysis, onApplySuggestion }: AISuggestionsProps) {
  const [dismissed, setDismissed] = useState<Set<number>>(new Set())

  const scoreColor = analysis.score >= 80 ? '#059669' : analysis.score >= 60 ? '#F5A623' : '#E53E3E'
  const scoreBg = analysis.score >= 80 ? 'bg-green-50 border-green-200' : analysis.score >= 60 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'

  return (
    <div className="space-y-4">
      {/* Score card */}
      <div className={cn('border rounded-xl p-5', scoreBg)}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-[#0A1628] text-base">Resume Score</h3>
          <span className="text-2xl font-bold" style={{ color: scoreColor }}>{analysis.score}<span className="text-sm text-gray-500">/100</span></span>
        </div>
        {/* Progress bar */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${analysis.score}%`, backgroundColor: scoreColor }}
          />
        </div>
        <p className="text-sm text-gray-600 mb-3">{analysis.summary}</p>

        {/* Strengths */}
        <div className="space-y-1.5">
          {analysis.strengths.map((s, i) => (
            <p key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-green-600 mt-0.5 flex-shrink-0">✅</span>{s}
            </p>
          ))}
          {analysis.missingElements.map((m, i) => (
            <p key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-red-500 mt-0.5 flex-shrink-0">❌</span>{m}
            </p>
          ))}
        </div>
      </div>

      {/* Improvement suggestions */}
      {analysis.improvements.filter((_, i) => !dismissed.has(i)).map((item, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className={cn(
                'text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide',
                item.priority === 'high' ? 'bg-red-100 text-red-700' :
                item.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                'bg-gray-100 text-gray-600'
              )}>
                {item.priority}
              </span>
              <span className="text-sm font-semibold text-[#0A1628]">{item.section}</span>
            </div>
            <button onClick={() => setDismissed(d => new Set(Array.from(d).concat(i)))} className="text-gray-400 hover:text-gray-600 text-xs">
              Ignore
            </button>
          </div>
          <p className="text-xs text-gray-500">{item.issue}</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-xs font-medium text-green-800 mb-0.5">Suggested improvement:</p>
            <p className="text-sm text-gray-700">{item.suggestion}</p>
          </div>
          <button
            onClick={() => onApplySuggestion(item.section, item.suggestion)}
            className="w-full bg-[#059669] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#047857] transition-colors"
          >
            Apply Suggestion
          </button>
        </div>
      ))}
    </div>
  )
}
