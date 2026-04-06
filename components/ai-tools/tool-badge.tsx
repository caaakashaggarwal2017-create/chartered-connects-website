import { cn } from '@/lib/utils/cn'

interface PricingBadgeProps {
  pricing: 'Free' | 'Freemium' | 'Paid'
  className?: string
}

export function PricingBadge({ pricing, className }: PricingBadgeProps) {
  return (
    <span className={cn(
      'text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0',
      pricing === 'Free' ? 'bg-green-50 text-green-700 border-green-200' :
      pricing === 'Freemium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
      'bg-blue-50 text-blue-700 border-blue-200',
      className
    )}>
      {pricing}
    </span>
  )
}

interface CategoryBadgeProps {
  category: string
  className?: string
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <span className={cn('inline-flex items-center text-xs text-gray-500 font-medium', className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mr-1.5" />
      {category}
    </span>
  )
}

interface VerifiedBadgeProps {
  className?: string
}

export function VerifiedBadge({ className }: VerifiedBadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full', className)}>
      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      Verified
    </span>
  )
}
