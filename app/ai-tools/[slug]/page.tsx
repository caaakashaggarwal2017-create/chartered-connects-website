import { notFound } from 'next/navigation'
import { aiTools } from '@/lib/data/ai-tools'
import ToolDetailClient from '@/components/ai-tools/tool-detail-client'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return aiTools.map(tool => ({ slug: tool.slug }))
}

export default function AIToolDetailPage({ params }: Props) {
  const tool = aiTools.find(t => t.slug === params.slug)

  if (!tool) return notFound()

  const related = aiTools
    .filter(t => t.id !== tool.id && t.category === tool.category)
    .slice(0, 3)

  return <ToolDetailClient tool={tool} related={related} />
}
