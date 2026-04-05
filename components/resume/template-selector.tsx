import { TEMPLATES, TemplateId } from '@/lib/resume/templates'
import { cn } from '@/lib/utils/cn'

interface TemplateSelectorProps {
  selected: TemplateId
  onChange: (id: TemplateId) => void
}

export default function TemplateSelector({ selected, onChange }: TemplateSelectorProps) {
  return (
    <div className="flex gap-2">
      {TEMPLATES.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            'flex-1 rounded-lg border-2 p-2 text-left transition-all',
            selected === t.id ? 'border-[#059669] bg-green-50' : 'border-gray-200 hover:border-gray-400 bg-white'
          )}
          title={t.description}
        >
          {/* Thumbnail abstract */}
          <div className="h-10 rounded mb-1 overflow-hidden flex gap-0.5">
            {t.id === 'modern' ? (
              <>
                <div className="w-5 bg-[#0A1628] rounded-sm flex-shrink-0" />
                <div className="flex-1 flex flex-col gap-0.5 pt-0.5">
                  <div className="h-1.5 bg-gray-300 rounded w-3/4" />
                  <div className="h-1 bg-gray-200 rounded w-1/2" />
                  <div className="h-1 bg-gray-200 rounded w-full mt-0.5" />
                  <div className="h-1 bg-gray-200 rounded w-5/6" />
                </div>
              </>
            ) : t.id === 'classic' ? (
              <div className="flex-1 flex flex-col gap-0.5 pt-0.5">
                <div className="h-2 bg-[#0A1628] rounded w-2/3 mx-auto" />
                <div className="h-1 bg-gray-300 rounded w-1/2 mx-auto" />
                <div className="border-t border-gray-300 mt-0.5 pt-0.5 space-y-0.5">
                  <div className="h-1 bg-gray-200 rounded w-full" />
                  <div className="h-1 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col gap-0.5 pt-0.5">
                <div className="h-2 bg-gray-600 rounded w-1/2" />
                <div className="h-1 bg-gray-200 rounded w-3/4 mt-0.5" />
                <div className="h-1 bg-gray-200 rounded w-full" />
                <div className="h-1 bg-gray-200 rounded w-5/6" />
              </div>
            )}
          </div>
          <p className={cn('text-[10px] font-semibold', selected === t.id ? 'text-[#059669]' : 'text-gray-600')}>
            {t.name}
          </p>
        </button>
      ))}
    </div>
  )
}
