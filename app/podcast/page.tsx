import type { Metadata } from "next"
import Link from "next/link"
import dynamic from "next/dynamic"
import { getAllEpisodes, getFeaturedEpisode, YOUTUBE_CHANNEL_URL } from "@/lib/utils/podcast"
import YoutubeEmbed from "@/components/podcast/youtube-embed"
import EpisodeList from "@/components/podcast/episode-list"

const GuestApplyForm = dynamic(() => import("@/components/podcast/guest-apply-form"), { ssr: false })
const PodcastNewsletterForm = dynamic(() => import("@/components/podcast/podcast-newsletter-form"), { ssr: false })

export const metadata: Metadata = {
  title: "CC Podcast — Conversations with India's CAs — Chartered Connects",
  description:
    "Real conversations with practicing CAs, Big 4 professionals and CA students. New episodes weekly.",
  openGraph: {
    title: "CC Podcast — Conversations with India's CAs — Chartered Connects",
    description:
      "Real conversations with practicing CAs, Big 4 professionals and CA students. New episodes weekly.",
    type: "website",
  },
}

const podcastSeriesJsonLd = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  name: "CC Podcast — Conversations with India's CAs",
  description:
    "Real conversations with practicing CAs, Big 4 professionals and CA students. New episodes every week.",
  url: "https://charteredconnects.com/podcast",
  image: "https://charteredconnects.com/og-podcast.jpg",
  publisher: {
    "@type": "Organization",
    name: "Chartered Connects",
    url: "https://charteredconnects.com",
  },
}

export default function PodcastPage() {
  const featured = getFeaturedEpisode()
  const allEpisodes = getAllEpisodes()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSeriesJsonLd) }}
      />

      {/* ============================================================
          SECTION 1 — Hero
      ============================================================ */}
      <section className="relative bg-[#0A1628] min-h-[60vh] overflow-hidden">
        {/* Waveform background — CSS-only animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="podcast-waveform" />
        </div>

        <style>{`
          .podcast-waveform {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 80px;
            background: repeating-linear-gradient(
              90deg,
              transparent,
              transparent 3px,
              rgba(229,62,62,0.15) 3px,
              rgba(229,62,62,0.15) 5px
            );
            animation: waveScroll 8s linear infinite;
            mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 80'%3E%3Cpath d='M0 40 Q30 10 60 40 Q90 70 120 40 Q150 10 180 40 Q210 70 240 40 Q270 10 300 40 Q330 70 360 40 Q390 10 420 40 Q450 70 480 40 Q510 10 540 40 Q570 70 600 40 Q630 10 660 40 Q690 70 720 40 Q750 10 780 40 Q810 70 840 40 Q870 10 900 40 Q930 70 960 40 Q990 10 1020 40 Q1050 70 1080 40 Q1110 10 1140 40 Q1170 70 1200 40 V80 H0Z' fill='%23E53E3E' opacity='0.12'/%3E%3C/svg%3E");
            -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 80'%3E%3Cpath d='M0 40 Q30 10 60 40 Q90 70 120 40 Q150 10 180 40 Q210 70 240 40 Q270 10 300 40 Q330 70 360 40 Q390 10 420 40 Q450 70 480 40 Q510 10 540 40 Q570 70 600 40 Q630 10 660 40 Q690 70 720 40 Q750 10 780 40 Q810 70 840 40 Q870 10 900 40 Q930 70 960 40 Q990 10 1020 40 Q1050 70 1080 40 Q1110 10 1140 40 Q1170 70 1200 40 V80 H0Z' fill='%23E53E3E' opacity='0.12'/%3E%3C/svg%3E");
            mask-size: 1200px 80px;
            -webkit-mask-size: 1200px 80px;
            mask-repeat: repeat-x;
            -webkit-mask-repeat: repeat-x;
          }
          @keyframes waveScroll {
            from { background-position: 0 0; }
            to { background-position: 1200px 0; }
          }
        `}</style>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* Left — text */}
            <div className="w-full lg:w-1/2">
              {/* Pill */}
              <div className="inline-flex items-center gap-2 bg-[#E53E3E]/20 border border-[#E53E3E]/40 text-[#E53E3E] text-xs font-bold px-3 py-1 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E53E3E] animate-pulse" />
                YOUTUBE PODCAST SERIES
              </div>

              {/* H1 */}
              <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-black mb-4 leading-none tracking-tight">
                CC Podcast
              </h1>

              {/* Tagline */}
              <p className="text-[#F5A623] text-lg sm:text-xl font-semibold mb-4">
                Real conversations. Real CAs. Real stories.
              </p>

              {/* Description */}
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
                Long-form conversations with practicing CAs, Big 4 professionals, CA rankers and
                finance leaders across India. No fluff — just honest stories.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mb-7">
                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#E53E3E] hover:bg-[#c53030] text-white px-5 py-3 rounded-lg font-semibold text-sm transition-colors"
                >
                  Subscribe on YouTube →
                </a>
                <a
                  href="#latest-episode"
                  className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white px-5 py-3 rounded-lg font-semibold text-sm transition-colors"
                >
                  Watch Latest Episode ↓
                </a>
              </div>

              {/* Social proof */}
              <p className="text-gray-400 text-xs mb-6">
                500+ subscribers &middot; 20+ Episodes &middot; New every week
              </p>

              {/* Platform links */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-medium text-[#E53E3E] hover:text-[#ff6b6b] transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-[#E53E3E]" aria-hidden="true" />
                  YouTube
                </a>
                <a
                  href="https://open.spotify.com/show/charteredconnects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-medium text-[#1DB954] hover:text-[#1DB954]/80 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-[#1DB954]" aria-hidden="true" />
                  Spotify
                </a>
                <a
                  href="https://podcasts.apple.com/in/podcast/chartered-connects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-medium text-[#A428C3] hover:text-[#A428C3]/80 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-[#A428C3]" aria-hidden="true" />
                  Apple Podcasts
                </a>
                <span className="flex items-center gap-1.5 text-sm font-medium text-[#4285F4]">
                  <span className="w-2 h-2 rounded-full bg-[#4285F4]" aria-hidden="true" />
                  Google Podcasts
                </span>
              </div>
            </div>

            {/* Right — featured episode card */}
            <div className="w-full lg:w-1/2">
              <div className="rounded-2xl bg-gradient-to-br from-[#1A0000] to-[#0A1628] border border-white/10 overflow-hidden">
                {/* Thumbnail placeholder */}
                <div className="relative aspect-video flex items-center justify-center">
                  {/* Guest avatar */}
                  <div className="flex flex-col items-center gap-3">
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl"
                      style={{ backgroundColor: featured.guest.avatarColor }}
                      aria-hidden="true"
                    >
                      {featured.guest.avatarInitials}
                    </div>
                    <p className="text-gray-400 text-xs">Episode {featured.episodeNumber}</p>
                  </div>

                  {/* Play button overlay */}
                  <a
                    href={featured.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch: ${featured.title}`}
                    className="absolute inset-0 flex items-center justify-center group"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#E53E3E]/80 group-hover:bg-[#E53E3E] flex items-center justify-center shadow-2xl transition-all duration-200 group-hover:scale-110">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-7 h-7 ml-1"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </a>
                </div>

                {/* Card body */}
                <div className="p-5 border-t border-white/10">
                  <p className="text-[#E53E3E] text-xs font-bold mb-1">
                    LATEST EPISODE &mdash; EP {featured.episodeNumber}
                  </p>
                  <h3 className="text-white font-bold text-base leading-snug line-clamp-2 mb-2">
                    {featured.title}
                  </h3>
                  <p className="text-[#F5A623] text-xs font-medium">
                    {featured.guest.name} &middot; {featured.guest.company}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — Latest Episode (full embed)
      ============================================================ */}
      <section id="latest-episode" className="bg-[#0A1628] py-14 lg:py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#E53E3E] text-xs font-bold uppercase tracking-widest mb-6">
            FEATURED EPISODE
          </p>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* Video embed */}
            <div className="w-full lg:w-3/5">
              <YoutubeEmbed videoId={featured.youtubeVideoId} title={featured.title} />
            </div>

            {/* Episode details */}
            <div className="w-full lg:w-2/5">
              <span className="bg-[#E53E3E] text-white text-xs font-bold px-2 py-0.5 rounded mb-3 inline-block">
                EP {featured.episodeNumber}
              </span>
              <h2 className="text-white text-xl sm:text-2xl font-bold mb-3 leading-tight">
                {featured.title}
              </h2>
              <p className="text-[#F5A623] text-sm font-semibold mb-3">
                {featured.guest.name} &middot; {featured.guest.designation},{" "}
                {featured.guest.company}
              </p>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                {featured.description}
              </p>

              {/* Key takeaways */}
              <h3 className="text-white text-sm font-bold mb-2">Key Takeaways</h3>
              <ul className="space-y-1.5 mb-5">
                {featured.keyTakeaways.slice(0, 4).map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                    <span className="text-[#E53E3E] font-bold mt-0.5">→</span>
                    {point}
                  </li>
                ))}
              </ul>

              {/* Watch button */}
              <a
                href={featured.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E53E3E] hover:bg-[#c53030] text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
              >
                Watch on YouTube →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3 — All Episodes with filter
      ============================================================ */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-[#0A1628] text-2xl sm:text-3xl font-bold mb-2">All Episodes</h2>
            <p className="text-gray-600 text-sm">
              {allEpisodes.length} episodes &middot; New every week
            </p>
          </div>

          <EpisodeList episodes={allEpisodes} />
        </div>
      </section>

      {/* ============================================================
          SECTION 4 — Be a Guest CTA
      ============================================================ */}
      <section
        id="be-a-guest"
        className="bg-gradient-to-br from-[#1A0000] to-[#0A1628] py-16 lg:py-24"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#E53E3E]/20 border border-[#E53E3E]/40 text-[#E53E3E] text-xs font-bold px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E53E3E]" aria-hidden="true" />
              APPLY TO BE A GUEST
            </div>
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Be Our Next Guest
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl mx-auto">
              Have a story worth sharing? We feature CAs at all stages — from articleship students
              to Big 4 partners. Apply below and we&apos;ll review your application within 5
              working days.
            </p>
          </div>

          <GuestApplyForm />
        </div>
      </section>

      {/* ============================================================
          SECTION 5 — Platforms
      ============================================================ */}
      <section className="bg-gray-50 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#0A1628] text-xl sm:text-2xl font-bold text-center mb-2">
            Listen &amp; Watch Everywhere
          </h2>
          <p className="text-gray-500 text-sm text-center mb-10">
            CC Podcast is available on all major platforms
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* YouTube */}
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-gray-200 hover:border-[#E53E3E] hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E53E3E]/10 group-hover:bg-[#E53E3E] flex items-center justify-center transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-[#E53E3E] group-hover:fill-white transition-colors"
                  aria-hidden="true"
                >
                  <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.7-.8-2.1-.9C16.5 5 12 5 12 5s-4.5 0-6.9.1c-.4.1-1.3.1-2.1.9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.3.8C6.8 19 12 19 12 19s4.5 0 6.9-.2c.4-.1 1.3-.1 2.1-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM9.7 14.6V9.4l5.7 2.6-5.7 2.6z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-semibold text-[#0A1628] text-sm">YouTube</p>
                <p className="text-gray-400 text-xs">Subscribe for free</p>
              </div>
            </a>

            {/* Spotify */}
            <a
              href="https://open.spotify.com/show/charteredconnects"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-gray-200 hover:border-[#1DB954] hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1DB954]/10 group-hover:bg-[#1DB954] flex items-center justify-center transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-[#1DB954] group-hover:fill-white transition-colors"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-semibold text-[#0A1628] text-sm">Spotify</p>
                <p className="text-gray-400 text-xs">Stream episodes</p>
              </div>
            </a>

            {/* Apple Podcasts */}
            <a
              href="https://podcasts.apple.com/in/podcast/chartered-connects"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-gray-200 hover:border-[#A428C3] hover:shadow-md transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#A428C3]/10 group-hover:bg-[#A428C3] flex items-center justify-center transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-[#A428C3] group-hover:fill-white transition-colors"
                  aria-hidden="true"
                >
                  <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392.12.59.12 2.2.007 2.864a8.506 8.506 0 01-3.24 5.403c-.862.636-2.088 1.2-3.132 1.423-.405.088-.413.084-.413-.2v-1.48c0-.24.013-.286.124-.347.74-.414 1.508-1.09 1.994-1.768.376-.523.752-1.349.876-1.92l.09-.4H15.5c-1.648 0-2.44-.018-2.59-.052a2.374 2.374 0 01-1.778-1.777c-.054-.196-.064-.37-.064-1.573v-1.35l.086-.38c.34-1.514 1.518-2.617 3.072-2.868.193-.032.536-.04 2.368-.04h2.143l-.097-.213c-.546-1.205-1.504-2.178-2.69-2.75a5.623 5.623 0 00-2.437-.558c-1.948 0-3.726.979-4.776 2.617-.317.492-.557 1.03-.711 1.61-.089.338-.103.456-.103 1.01v.523l-.093.404c-.34 1.482-1.515 2.587-3.063 2.84-.198.033-.566.041-2.42.041H2.28l.097.213c.544 1.206 1.504 2.178 2.69 2.75.62.3 1.36.495 1.944.514.13.004.24.016.24.024 0 .056-.24 1.64-.267 1.755-.02.086-.036.095-.205.109-.51.04-1.318-.086-1.99-.31-2.178-.729-3.89-2.48-4.6-4.69a8.537 8.537 0 01-.35-2.568c0-4.765 3.878-8.617 8.642-8.617z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-semibold text-[#0A1628] text-sm">Apple Podcasts</p>
                <p className="text-gray-400 text-xs">Subscribe &amp; review</p>
              </div>
            </a>

            {/* Google Podcasts */}
            <div className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl border border-gray-200 hover:border-[#4285F4] hover:shadow-md transition-all duration-200 group cursor-default">
              <div className="w-12 h-12 rounded-xl bg-[#4285F4]/10 group-hover:bg-[#4285F4] flex items-center justify-center transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-[#4285F4] group-hover:fill-white transition-colors"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 17H8V7h2v10zm4 0h-2V7h2v10z" />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-semibold text-[#0A1628] text-sm">Google Podcasts</p>
                <p className="text-gray-400 text-xs">Coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6 — Newsletter signup
      ============================================================ */}
      <section className="bg-[#0A1628] py-14 border-t border-white/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-2">
            Never Miss a New Episode
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Get episode alerts + our weekly newsletter for India&apos;s CA community
          </p>
          <PodcastNewsletterForm />
          <p className="text-gray-500 text-xs mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  )
}
