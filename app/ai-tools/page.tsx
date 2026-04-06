'use client'

import { useState, useMemo } from 'react'
import { aiTools as AI_TOOLS } from '@/lib/data/ai-tools'
import { AITool } from '@/lib/types/ai-tool'
import ToolFilters from '@/components/ai-tools/tool-filters'
import ToolGrid from '@/components/ai-tools/tool-grid'
import DemoRequestForm from '@/components/ai-tools/demo-request-form'

export default function AIToolsPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPricing, setSelectedPricing] = useState('All')
  const [indiaOnly, setIndiaOnly] = useState(false)
  const [demoTool, setDemoTool] = useState<AITool | null>(null)
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  const handleRequestDemo = (tool: AITool) => {
    setDemoTool(tool)
    setIsDemoOpen(true)
  }

  const filtered = useMemo(() => {
    return AI_TOOLS.filter(tool => {
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.useCases.some(u => u.toLowerCase().includes(q)) ||
        tool.tags.some(t => t.toLowerCase().includes(q))

      const matchesCategory =
        selectedCategory === 'All' || tool.category === selectedCategory

      const matchesPricing =
        selectedPricing === 'All' || tool.pricing === selectedPricing

      const matchesIndia = !indiaOnly || tool.indiaSpecific

      return matchesSearch && matchesCategory && matchesPricing && matchesIndia
    })
  }, [search, selectedCategory, selectedPricing, indiaOnly])

  // Featured first, then rest
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1
      if (!a.isFeatured && b.isFeatured) return 1
      if (a.rating && b.rating) return b.rating - a.rating
      if (a.rating) return -1
      if (b.rating) return 1
      return 0
    })
  }, [filtered])

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-[#0A1628] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#2563EB]/20 text-[#60A5FA] text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-[#2563EB]/30">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI Tools for Finance Professionals
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              The Best AI Tools for{' '}
              <span className="text-[#2563EB]">CAs & Finance Teams</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              A curated directory of AI tools built for Chartered Accountants, CFOs, and finance
              professionals in India. GST, audit, payroll, forecasting — find the right tool for
              your practice.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              {[
                { label: `${AI_TOOLS.length} Curated Tools`, icon: '🧰' },
                { label: 'India-Specific Picks', icon: '🇮🇳' },
                { label: 'Free & Paid Options', icon: '💳' },
                { label: 'Updated Regularly', icon: '🔄' },
              ].map(({ label, icon }) => (
                <span key={label} className="flex items-center gap-2 text-gray-300">
                  <span>{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-8 shadow-sm">
          <ToolFilters
            selectedCategory={selectedCategory}
            selectedPricing={selectedPricing}
            indiaOnly={indiaOnly}
            search={search}
            onCategoryChange={setSelectedCategory}
            onPricingChange={setSelectedPricing}
            onIndiaOnlyChange={setIndiaOnly}
            onSearchChange={setSearch}
            totalCount={AI_TOOLS.length}
            filteredCount={sorted.length}
          />
        </div>

        {/* Featured banner (when no filters applied) */}
        {selectedCategory === 'All' && selectedPricing === 'All' && !indiaOnly && !search && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              ★ Featured Tools
            </h2>
          </div>
        )}

        {/* Grid */}
        <ToolGrid tools={sorted} onRequestDemo={handleRequestDemo} />

        {/* Bottom CTA */}
        <div className="mt-16 bg-[#0A1628] rounded-2xl p-8 text-center">
          <h3 className="text-white font-bold text-xl mb-2">Have an AI tool to recommend?</h3>
          <p className="text-gray-400 text-sm mb-5">
            If you've built or discovered an AI tool that CA and finance professionals would love,
            we'd love to feature it.
          </p>
          <a
            href="mailto:hello@charteredconnects.com?subject=AI Tool Submission"
            className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#1d4ed8] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Submit a Tool
          </a>
        </div>
      </section>

      {/* Demo modal */}
      <DemoRequestForm
        tool={demoTool}
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </main>
  )
}
