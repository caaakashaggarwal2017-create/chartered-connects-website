export type TemplateId = 'classic' | 'modern' | 'minimal'

export interface Template {
  id: TemplateId
  name: string
  description: string
}

export const TEMPLATES: Template[] = [
  {
    id: 'classic',
    name: 'Classic CA',
    description: 'Traditional serif layout — trusted for Big 4 & established firm applications',
  },
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Navy sidebar with clean right column — stands out for industry roles',
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Single column, generous whitespace — ideal for startups & consulting',
  },
]
