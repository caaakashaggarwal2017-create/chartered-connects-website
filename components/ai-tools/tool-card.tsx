import Link from 'next/link'
import { AITool } from '@/lib/types/ai-tool'
import { PricingBadge, VerifiedBadge } from './tool-badge'

interface ToolCardProps {
  tool: AITool
  onRequestDemo: (tool: AITool) => void
}

export default function ToolCard({ tool, onRequestDemo }: ToolCardProps) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-[#2563EB] transition-all duration-200 flex flex-col relative">
      {/* Featured badge */}
      {tool.isFeatured && (
        <div className="absolute top-3 right-3 z-10 bg-[#F5A623] text-[#0A1628] text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
          Featured
        </div>
      )}

      {/* Coloured top band */}
      <div className="h-1.5 w-full flex-shrink-0" style={{ background: tool.accentColor }} />

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
            style={{ background: tool.accentColor }}
          >
            {tool.logoInitials}
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
            {tool.isVerified && <VerifiedBadge />}
            <PricingBadge pricing={tool.pricing} />
          </div>
        </div>

        {/* Name + category */}
        <div className="mb-2">
          <h3 className="font-bold text-[#0A1628] text-base mb-1 group-hover:text-[#2563EB] transition-colors pr-2">
            {tool.name}
          </h3>
          <span className="inline-flex items-center text-xs text-gray-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-1.5" />
            {tool.category}
          </span>
        </div>

        {/* Short description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
          {tool.shortDescription}
        </p>

        {/* Use case pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.useCases.slice(0, 3).map(uc => (
            <span key={uc} className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
              {uc}
            </span>
          ))}
          {tool.useCases.length > 3 && (
            <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200">
              +{tool.useCases.length - 3} more
            </span>
          )}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100">
          {tool.rating ? (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-[#0A1628]">{tool.rating}</span>
              <span className="text-xs text-gray-400">/ 5</span>
            </div>
          ) : <div />}

          <div className="flex items-center gap-2 ml-auto">
            <Link href={`/ai-tools/${tool.slug}`}
              className="text-gray-500 hover:text-[#2563EB] text-xs font-medium transition-colors">
              Details →
            </Link>
            <button
              onClick={() => onRequestDemo(tool)}
              className="inline-flex items-center gap-1.5 bg-[#2563EB] text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-[#1d4ed8] transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14m0 0V10m0 4H9a2 2 0 01-2-2v-2a2 2 0 012-2h6" />
              </svg>
              Request Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
