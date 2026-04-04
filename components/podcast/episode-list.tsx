"use client"

import { useState } from "react"
import { PodcastEpisode } from "@/lib/data/podcast-episodes"
import { PODCAST_CATEGORIES } from "@/lib/utils/podcast"
import EpisodeCard from "@/components/podcast/episode-card"

interface Props {
  episodes: PodcastEpisode[]
}

export default function EpisodeList({ episodes }: Props) {
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered =
    activeCategory === "All"
      ? episodes
      : episodes.filter((ep) => ep.category === activeCategory)

  return (
    <div>
      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {PODCAST_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
              activeCategory === cat
                ? "bg-[#E53E3E] border-[#E53E3E] text-white"
                : "border-gray-200 text-gray-600 hover:border-[#E53E3E] hover:text-[#E53E3E] bg-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Episode count */}
      <p className="text-sm text-gray-500 mb-5">
        {filtered.length} episode{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "All" && ` in ${activeCategory}`}
      </p>

      {/* Episode grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg font-medium">No episodes in this category yet</p>
          <p className="text-sm mt-1">Check back soon — new episodes every week!</p>
          <button
            onClick={() => setActiveCategory("All")}
            className="mt-4 text-[#E53E3E] text-sm font-semibold hover:underline"
          >
            View all episodes →
          </button>
        </div>
      )}
    </div>
  )
}
