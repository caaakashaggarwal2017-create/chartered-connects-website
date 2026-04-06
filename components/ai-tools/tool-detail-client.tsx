'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AITool } from '@/lib/types/ai-tool'
import { PricingBadge, VerifiedBadge } from '@/components/ai-tools/tool-badge'
import DemoRequestForm from '@/components/ai-tools/demo-request-form'

interface ToolDetailClientProps {
  tool: AITool
  related: AITool[]
}

export default function ToolDetailClient({ tool, related }: ToolDetailClientProps) {
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-[#2563EB] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/ai-tools" className="hover:text-[#2563EB] transition-colors">AI Tools</Link>
            <span>/</span>
            <span className="text-[#0A1628] font-medium">{tool.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left / Main */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hero card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="h-1.5 w-full rounded-full mb-5" style={{ background: tool.accentColor }} />

              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                  style={{ background: tool.accentColor }}
                >
                  {tool.logoInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="font-bold text-[#0A1628] text-2xl">{tool.name}</h1>
                    {tool.isVerified && <VerifiedBadge />}
                    {tool.isFeatured && (
                      <span className="bg-[#F5A623] text-[#0A1628] text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">{tool.tagline}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-5">
                <PricingBadge pricing={tool.pricing} />
                <span className="inline-flex items-center text-xs text-gray-500 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-1.5" />
                  {tool.category}
                </span>
                {tool.indiaSpecific && (
                  <span className="inline-flex items-center gap-1 text-xs text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full font-medium">
                    🇮🇳 India-specific
                  </span>
                )}
                {tool.rating && (
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-semibold text-[#0A1628]">{tool.rating}</span>
                    <span className="text-xs text-gray-400">/ 5</span>
                  </span>
                )}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-5">{tool.shortDescription}</p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setIsDemoOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#2563EB] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#1d4ed8] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14m0 0V10m0 4H9a2 2 0 01-2-2v-2a2 2 0 012-2h6" />
                  </svg>
                  Request Demo
                </button>
                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 font-medium text-sm px-5 py-2.5 rounded-xl hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                >
                  Visit Website
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Full description */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="font-bold text-[#0A1628] text-lg mb-4">About {tool.name}</h2>
              <div className="space-y-3">
                {tool.fullDescription.split('\n\n').map((para, i) => (
                  <p key={i} className="text-gray-600 text-sm leading-relaxed">{para}</p>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="font-bold text-[#0A1628] text-lg mb-4">Key Features</h2>
              <ul className="space-y-3">
                {tool.features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: tool.accentColor + '20' }}
                    >
                      <svg className="w-3 h-3" style={{ color: tool.accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Use cases */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="font-bold text-[#0A1628] text-lg mb-4">Use Cases</h2>
              <div className="flex flex-wrap gap-2">
                {tool.useCases.map(uc => (
                  <span key={uc} className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                    {uc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right / Sidebar */}
          <div className="space-y-5">

            {/* Pricing card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-[#0A1628] mb-3">Pricing</h3>
              <div className="mb-2">
                <PricingBadge pricing={tool.pricing} />
              </div>
              <p className="text-gray-600 text-sm">{tool.pricingDetail}</p>
            </div>

            {/* Best for */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-[#0A1628] mb-3">Best For</h3>
              <p className="text-gray-600 text-sm">{tool.bestFor}</p>
            </div>

            {/* Integrations */}
            {tool.integrations.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-bold text-[#0A1628] mb-3">Integrations</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.integrations.map(i => (
                    <span key={i} className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {tool.tags.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-bold text-[#0A1628] mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map(tag => (
                    <span key={tag} className="text-xs text-[#2563EB] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div
              className="rounded-2xl p-5 text-white"
              style={{ background: tool.accentColor }}
            >
              <h3 className="font-bold mb-2">Ready to try {tool.name}?</h3>
              <p className="text-white/80 text-sm mb-4">
                Request a personalised demo and see how it fits your practice.
              </p>
              <button
                onClick={() => setIsDemoOpen(true)}
                className="w-full bg-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-white/90 transition-colors"
                style={{ color: tool.accentColor }}
              >
                Request Demo
              </button>
            </div>
          </div>
        </div>

        {/* Related tools */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-bold text-[#0A1628] text-xl mb-5">
              More {tool.category} Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(t => (
                <Link
                  key={t.id}
                  href={`/ai-tools/${t.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-[#2563EB] transition-all duration-200"
                >
                  <div className="h-1 w-full rounded-full mb-4" style={{ background: t.accentColor }} />
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ background: t.accentColor }}
                    >
                      {t.logoInitials}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0A1628] text-sm group-hover:text-[#2563EB] transition-colors">{t.name}</p>
                      <PricingBadge pricing={t.pricing} className="mt-0.5" />
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs line-clamp-2">{t.shortDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link href="/ai-tools" className="inline-flex items-center gap-2 text-[#2563EB] text-sm font-medium hover:underline">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to All AI Tools
          </Link>
        </div>
      </div>

      <DemoRequestForm
        tool={tool}
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </main>
  )
}
