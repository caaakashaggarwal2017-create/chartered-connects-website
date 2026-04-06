export interface AITool {
  id: string
  slug: string
  name: string
  logoInitials: string
  accentColor: string
  tagline: string
  shortDescription: string
  fullDescription: string
  category: string
  useCases: string[]
  features: string[]
  pricing: 'Free' | 'Freemium' | 'Paid'
  pricingDetail: string
  bestFor: string
  rating: number | null
  integrations: string[]
  indiaSpecific: boolean
  websiteUrl: string
  isVerified: boolean
  isFeatured: boolean
  tags: string[]
  addedDate: string
}
