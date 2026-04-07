'use client'

import { useMemo, useState } from 'react'
import { Users } from 'lucide-react'
import { mentors } from '@/lib/data/mentors'
import MentorCard from '@/components/mentorship/mentor-card'
import MentorFilters, { MentorCategory } from '@/components/mentorship/mentor-filters'
import MentorStatsBar from '@/components/mentorship/mentor-stats-bar'
import HowItWorks from '@/components/mentorship/how-it-works'
import BecomeMentorCTA from '@/components/mentorship/become-mentor-cta'

export default function MentorshipPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<MentorCategory>('All')
  const [availableOnly, setAvailableOnly] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return mentors
      .filter(m => {
        if (category !== 'All' && m.category !== category) return false
        if (availableOnly && !m.availableSlots.some(s => s.isAvailable)) return false
        if (q) {
          return (
            m.name.toLowerCase().includes(q) ||
            m.organisation.toLowerCase().includes(q) ||
            m.city.toLowerCase().includes(q) ||
            m.expertise.some(e => e.toLowerCase().includes(q)) ||
            m.designation.toLowerCase().includes(q)
          )
        }
        return true
      })
      .sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1
        if (!a.isFeatured && b.isFeatured) return 1
        return 0
      })
  }, [search, category, availableOnly])

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] py-14 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-900/30 border border-amber-700/40 text-amber-400 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
            <Users className="w-3.5 h-3.5" />
            CA Mentorship Programme · Free · 1:1
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Learn from CAs Who've<br className="hidden sm:block" /> Been Where You Are
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Book a free 30-minute 1:1 session with verified CA professionals from Big 4s, industry, ICAI, and practice.
            Get the candid guidance that textbooks and coaching classes never give you.
          </p>
        </div>
      </section>

      {/* Stats */}
      <MentorStatsBar />

      {/* Main content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <MentorFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          availableOnly={availableOnly}
          onAvailableOnlyChange={setAvailableOnly}
          resultCount={filtered.length}
        />

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No mentors found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {filtered.map(mentor => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
        )}
      </section>

      {/* How it works */}
      <HowItWorks />

      {/* Become a mentor CTA */}
      <BecomeMentorCTA />
    </main>
  )
}
