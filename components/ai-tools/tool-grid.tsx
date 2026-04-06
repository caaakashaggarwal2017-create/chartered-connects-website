import { AITool } from '@/lib/types/ai-tool'
import ToolCard from './tool-card'

interface ToolGridProps {
  tools: AITool[]
  onRequestDemo: (tool: AITool) => void
}

export default function ToolGrid({ tools, onRequestDemo }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="font-semibold text-[#0A1628] mb-1">No tools found</h3>
        <p className="text-gray-500 text-sm max-w-xs">
          Try adjusting your filters or search query to find AI tools for your needs.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {tools.map(tool => (
        <ToolCard key={tool.id} tool={tool} onRequestDemo={onRequestDemo} />
      ))}
    </div>
  )
}
