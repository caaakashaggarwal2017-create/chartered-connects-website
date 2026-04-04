import { podcastEpisodes, PodcastEpisode } from "@/lib/data/podcast-episodes"

export function getAllEpisodes(): PodcastEpisode[] {
  return [...podcastEpisodes].sort((a, b) => b.episodeNumber - a.episodeNumber)
}

export function getEpisodeBySlug(slug: string): PodcastEpisode | undefined {
  return podcastEpisodes.find((ep) => ep.slug === slug)
}

export function getFeaturedEpisode(): PodcastEpisode {
  return podcastEpisodes.find((ep) => ep.isFeatured) ?? podcastEpisodes[0]
}

export function getEpisodesByCategory(category: string): PodcastEpisode[] {
  return getAllEpisodes().filter((ep) => ep.category === category)
}

export function getRelatedEpisodes(slug: string, count = 3): PodcastEpisode[] {
  const ep = getEpisodeBySlug(slug)
  if (!ep) return getAllEpisodes().slice(0, count)
  return getAllEpisodes()
    .filter((e) => e.slug !== slug && e.category === ep.category)
    .slice(0, count)
}

export const PODCAST_CATEGORIES = [
  "All",
  "Career & Growth",
  "CA Exam",
  "Big 4 Life",
  "Articleship",
  "GST & Tax",
  "Startup & Business",
  "Finance",
  "Student Stories",
  "Interviews",
]

export const YOUTUBE_CHANNEL_URL = "https://youtube.com/@CharteredConnects"
