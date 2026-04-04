import Link from "next/link"
import { PodcastEpisode } from "@/lib/data/podcast-episodes"

interface Props {
  episode: PodcastEpisode
}

export default function LatestEpisodeHero({ episode }: Props) {
  return (
    <section className="bg-[#0A1628] py-16 lg:py-24 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <p className="text-[#E53E3E] text-xs font-bold uppercase tracking-widest mb-8 text-center lg:text-left">
          LATEST FROM CC PODCAST
        </p>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* LEFT — 55% */}
          <div className="w-full lg:w-[55%]">
            {/* New episode badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="bg-[#E53E3E] text-white text-xs font-bold px-3 py-1 rounded-full">
                NEW EPISODE
              </span>
              <span className="text-gray-400 text-xs">Ep {episode.episodeNumber}</span>
            </div>

            {/* Title */}
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              {episode.title}
            </h2>

            {/* Guest */}
            <p className="text-[#F5A623] text-sm font-semibold mb-3">
              {episode.guest.name} &middot; {episode.guest.designation},{" "}
              {episode.guest.company}
            </p>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed mb-5 max-w-lg">
              {episode.description}
            </p>

            {/* Topics */}
            <div className="flex flex-wrap gap-2 mb-6">
              {episode.topics.slice(0, 5).map((topic) => (
                <span
                  key={topic}
                  className="text-xs px-3 py-1 rounded-full bg-[#E53E3E]/10 text-[#E53E3E] font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-5">
              <a
                href={episode.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E53E3E] hover:bg-[#c53030] text-white px-5 py-2.5 rounded-md font-semibold text-sm transition-colors"
              >
                Watch on YouTube →
              </a>
              <Link
                href="/podcast"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white px-5 py-2.5 rounded-md font-semibold text-sm transition-colors"
              >
                All Episodes →
              </Link>
            </div>

            {/* Listen platforms */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-gray-400 text-xs">Listen on:</span>
              <a
                href={episode.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-[#1DB954] transition-colors font-medium"
              >
                Spotify
              </a>
              <span className="text-gray-600 text-xs">&middot;</span>
              <a
                href={episode.applePodcastsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-[#A428C3] transition-colors font-medium"
              >
                Apple Podcasts
              </a>
              <span className="text-gray-600 text-xs">&middot;</span>
              <span className="text-xs text-gray-400 font-medium">Google Podcasts</span>
            </div>
          </div>

          {/* RIGHT — 45% */}
          <div className="w-full lg:w-[45%]">
            {/* Thumbnail placeholder */}
            <div className="relative aspect-video bg-gradient-to-br from-[#1A0000] to-[#0A1628] rounded-xl overflow-hidden border border-white/10">
              {/* Guest avatar centered */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                  style={{ backgroundColor: episode.guest.avatarColor }}
                  aria-hidden="true"
                >
                  {episode.guest.avatarInitials}
                </div>
                <span className="text-gray-400 text-xs font-medium tracking-wide">
                  Episode {episode.episodeNumber}
                </span>
              </div>

              {/* Red play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href={episode.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch episode: ${episode.title}`}
                  className="w-14 h-14 rounded-full bg-[#E53E3E]/90 hover:bg-[#E53E3E] flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-6 h-6 ml-1"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Below thumbnail */}
            <p className="text-gray-400 text-xs text-center mt-3">
              Episode {episode.episodeNumber} &middot; {episode.durationMinutes} mins
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
