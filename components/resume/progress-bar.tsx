import { cn } from '@/lib/utils/cn'

const STEPS = [
  { number: 1, label: 'Personal Info' },
  { number: 2, label: 'Experience' },
  { number: 3, label: 'Education' },
  { number: 4, label: 'Skills' },
  { number: 5, label: 'Summary & Review' },
]

interface ProgressBarProps {
  currentStep: number
  onStepClick?: (step: number) => void
}

export default function ProgressBar({ currentStep, onStepClick }: ProgressBarProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center">
        {STEPS.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1 last:flex-none">
            <button
              onClick={() => onStepClick?.(step.number)}
              disabled={step.number > currentStep}
              className={cn(
                'flex flex-col items-center gap-1 group',
                step.number <= currentStep ? 'cursor-pointer' : 'cursor-default'
              )}
            >
              <span
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors',
                  step.number === currentStep
                    ? 'bg-[#059669] text-white shadow-md'
                    : step.number < currentStep
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-400'
                )}
              >
                {step.number < currentStep ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  step.number
                )}
              </span>
              <span
                className={cn(
                  'text-[10px] font-medium hidden sm:block whitespace-nowrap',
                  step.number === currentStep ? 'text-[#059669]' : step.number < currentStep ? 'text-green-600' : 'text-gray-400'
                )}
              >
                {step.label}
              </span>
            </button>
            {index < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 mb-4 sm:mb-0 rounded-full overflow-hidden bg-gray-200">
                <div
                  className={cn('h-full bg-[#059669] transition-all duration-300', step.number < currentStep ? 'w-full' : 'w-0')}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
