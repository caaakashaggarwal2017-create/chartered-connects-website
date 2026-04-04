"use client"

import { PodcastEpisode } from "@/lib/data/podcast-episodes"

interface Props {
  episode: PodcastEpisode
}

function getCategoryColor(category: string): { bg: string; text: string } {
  switch (category) {
    case "Career & Growth":
      return { bg: "bg-amber-100", text: "text-amber-700" }
    case "CA Exam":
      return { bg: "bg-purple-100", text: "text-purple-700" }
    case "Big 4 Life":
      return { bg: "bg-blue-100", text: "text-blue-700" }
    case "Articleship":
      return { bg: "bg-green-100", text: "text-green-700" }
    case "GST & Tax":
      return { bg: "bg-orange-100", text: "text-orange-700" }
    case "Startup & Business":
      return { bg: "bg-teal-100", text: "text-teal-700" }
    case "Finance":
      return { bg: "bg-indigo-100", text: "text-indigo-700" }
    case "Student Stories":
      return { bg: "bg-pink-100", text: "text-pink-700" }
    default:
      return { bg: "bg-gray-100", text: "text-gray-700" }
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

export default function EpisodeCard({ episode }: Props) {
  const categoryStyle = getCategoryColor(episode.category)

  function handleShare() {
    if (typeof window !== "undefined") {
      navigator.clipboard
        .writeText(window.location.origin + "/podcast/" + episode.slug)
        .catch(() => {})
    }
  }

  return (
    <div className="group bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-[#E53E3E] transition-all duration-200 overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-[#0A1628] to-gray-700 overflow-hidden">
        {/* Centered play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#E53E3E] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5 ml-0.5"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Guest initials watermark */}
        <div
          className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow"
          style={{ backgroundColor: episode.guest.avatarColor }}
          aria-hidden="true"
        >
          {episode.guest.avatarInitials}
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
          {episode.durationMinutes} min
        </div>

        {/* Category badge */}
        <div
          className={`absolute bottom-2 right-2 text-xs px-2 py-0.5 rounded font-medium ${categoryStyle.bg} ${categoryStyle.text}`}
        >
          {episode.category}
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pb-4 pt-3 flex flex-col flex-1">
        {/* Episode meta */}
        <p className="text-xs text-gray-500 mb-1">
          Ep {episode.episodeNumber} &middot; {episode.category}
        </p>

        {/* Title */}
        <h3
          className="font-bold text-[#0A1628] text-sm leading-snug mb-2 line-clamp-2"
          title={episode.title}
        >
          {episode.title}
        </h3>

        {/* Guest info */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
            style={{ backgroundColor: episode.guest.avatarColor }}
            aria-hidden="true"
          >
            {episode.guest.avatarInitials}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#0A1628] truncate">{episode.guest.name}</p>
            <p className="text-[10px] text-gray-500 truncate">
              {episode.guest.designation}, {episode.guest.company}
            </p>
          </div>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 mt-auto">
          <span>{episode.durationMinutes} min</span>
          <span>&middot;</span>
          <span>{formatDate(episode.publishedAt)}</span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 border-t border-gray-100 pt-2">
          <a
            href={episode.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#E53E3E] hover:underline"
          >
            Watch →
          </a>
          <button
            onClick={handleShare}
            className="text-xs font-medium text-gray-400 hover:text-gray-600 transition-colors ml-auto"
            type="button"
            aria-label={`Share episode: ${episode.title}`}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  )
}
