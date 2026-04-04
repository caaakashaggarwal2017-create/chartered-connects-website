import { MetadataRoute } from "next"
import { articleshipFirms } from "@/lib/data/articleship-firms"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://charteredconnects.com"

  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/resources`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/jobs`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/calendar`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/newsletter`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/directory`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.6 },
  ]

  const firmPages = articleshipFirms.map((firm) => ({
    url: `${baseUrl}/articleship/firms/${firm.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...firmPages]
}
