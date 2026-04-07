'use client'

import { Search } from 'lucide-react'

export type MentorCategory =
  | 'All'
  | 'Big 4'
  | 'Mid-size Firms'
  | 'Industry / CFO'
  | 'ICAI Boards'
  | 'Practice Heads'
  | 'Women in CA'

const CATEGORIES: MentorCategory[] = [
  'All',
  'Big 4',
  'Mid-size Firms',
  'Industry / CFO',
  'ICAI Boards',
  'Practice Heads',
  'Women in CA',
]

interface MentorFiltersProps {
  search: string
  onSearchChange: (v: string) => void
  category: MentorCategory
  onCategoryChange: (c: MentorCategory) => void
  availableOnly: boolean
  onAvailableOnlyChange: (v: boolean) => void
  resultCount: number
}

export default function MentorFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  availableOnly,
  onAvailableOnlyChange,
  resultCount,
}: MentorFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, firm, city, or expertise..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent"
        />
      </div>

      {/* Category pills + toggles */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
              category === cat
                ? 'bg-[#D97706] text-white border-[#D97706]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#D97706] hover:text-[#D97706]'
            }`}
          >
            {cat}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => onAvailableOnlyChange(!availableOnly)}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
              availableOnly
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-600 hover:text-emerald-600'
            }`}
          >
            Available now
          </button>
        </div>
      </div>

      {/* Result count */}
      <p className="text-xs text-gray-500">
        Showing <span className="font-semibold text-gray-700">{resultCount}</span> mentor{resultCount !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
