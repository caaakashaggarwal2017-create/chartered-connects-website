'use client'

import { cn } from '@/lib/utils/cn'

const CATEGORIES = [
  'All',
  'Tax & GST',
  'Audit & Assurance',
  'Financial Reporting',
  'Document AI',
  'Payroll & HR',
  'Forecasting & FP&A',
  'Compliance',
]

const PRICING_OPTIONS = ['All', 'Free', 'Freemium', 'Paid'] as const

interface ToolFiltersProps {
  selectedCategory: string
  selectedPricing: string
  indiaOnly: boolean
  search: string
  onCategoryChange: (cat: string) => void
  onPricingChange: (p: string) => void
  onIndiaOnlyChange: (v: boolean) => void
  onSearchChange: (q: string) => void
  totalCount: number
  filteredCount: number
}

export default function ToolFilters({
  selectedCategory,
  selectedPricing,
  indiaOnly,
  search,
  onCategoryChange,
  onPricingChange,
  onIndiaOnlyChange,
  onSearchChange,
  totalCount,
  filteredCount,
}: ToolFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search tools, categories, use cases..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2563EB] transition-colors bg-white"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-colors border',
              selectedCategory === cat
                ? 'bg-[#2563EB] text-white border-[#2563EB]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#2563EB] hover:text-[#2563EB]'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pricing + India filter row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl p-1">
          {PRICING_OPTIONS.map(opt => (
            <button
              key={opt}
              onClick={() => onPricingChange(opt)}
              className={cn(
                'px-3 py-1 rounded-lg text-xs font-medium transition-colors',
                selectedPricing === opt
                  ? 'bg-[#2563EB] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              {opt}
            </button>
          ))}
        </div>

        <button
          onClick={() => onIndiaOnlyChange(!indiaOnly)}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors',
            indiaOnly
              ? 'bg-orange-50 text-orange-700 border-orange-300'
              : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-700'
          )}
        >
          <span>🇮🇳</span>
          India-specific only
        </button>

        {/* Result count */}
        <span className="ml-auto text-xs text-gray-400">
          {filteredCount === totalCount
            ? `${totalCount} tools`
            : `${filteredCount} of ${totalCount} tools`}
        </span>
      </div>
    </div>
  )
}
