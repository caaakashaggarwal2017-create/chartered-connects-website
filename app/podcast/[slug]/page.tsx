import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getEpisodeBySlug, getAllEpisodes, getRelatedEpisodes, YOUTUBE_CHANNEL_URL } from "@/lib/utils/podcast"
import YoutubeEmbed from "@/components/podcast/youtube-embed"
import EpisodeCard from "@/components/podcast/episode-card"
import GuestApplyForm from "@/components/podcast/guest-apply-form"

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const episodes = getAllEpisodes()
  return episodes.map((ep) => ({ slug: ep.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const episode = getEpisodeBySlug(params.slug)
  if (!episode) return { title: "Episode Not Found" }

  return {
    title: `${episode.title} — CC Podcast Ep ${episode.episodeNumber} — Chartered Connects`,
    description: episode.description,
    openGraph: {
      title: `${episode.title} — CC Podcast`,
      description: episode.description,
      type: "article",
      images: [
        {
          url: "/og-podcast.jpg",
          width: 1200,
          height: 630,
          alt: episode.thumbnailAlt,
        },
      ],
    },
  }
}

export default function EpisodePage({ params }: Props) {
  const episode = getEpisodeBySlug(params.slug)
  if (!episode) notFound()

  const relatedEpisodes = getRelatedEpisodes(params.slug, 3)

  const episodeJsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.title,
    description: episode.description,
    episodeNumber: episode.episodeNumber,
    datePublished: episode.publishedAt,
    duration: `PT${episode.durationMinutes}M`,
    url: `https://charteredconnects.com/podcast/${episode.slug}`,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "CC Podcast — Conversations with India's CAs",
      url: "https://charteredconnects.com/podcast",
    },
    actor: {
      "@type": "Person",
      name: episode.guest.name,
      jobTitle: episode.guest.designation,
      worksFor: {
        "@type": "Organization",
        name: episode.guest.company,
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(episodeJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav
        className="bg-white border-b border-gray-100 py-3"
        aria-label="Breadcrumb"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-1.5 text-xs text-gray-500 flex-wrap">
            <li>
              <Link href="/" className="hover:text-[#0A1628] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/podcast" className="hover:text-[#0A1628] transition-colors">
                Podcast
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#0A1628] font-medium truncate max-w-[200px] sm:max-w-none">
              {episode.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="bg-gradient-to-b from-[#0A1628] to-[#111827] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Episode number badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#E53E3E] text-white text-xs font-bold px-3 py-1 rounded-full">
              EPISODE {episode.episodeNumber}
            </span>
            <span className="text-gray-400 text-xs">{episode.category}</span>
          </div>

          {/* Title */}
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight max-w-4xl">
            {episode.title}
          </h1>

          {/* Guest info */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ backgroundColor: episode.guest.avatarColor }}
              aria-hidden="true"
            >
              {episode.guest.avatarInitials}
            </div>
            <div>
              <p className="text-[#F5A623] font-semibold text-sm">{episode.guest.name}</p>
              <p className="text-gray-400 text-xs">
                {episode.guest.designation}, {episode.guest.company}
              </p>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-6">
            <span>{episode.durationMinutes} min</span>
            <span>&middot;</span>
            <span>
              {new Date(episode.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span>&middot;</span>
            <span>{episode.viewCount.toLocaleString("en-IN")} views</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href={episode.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E53E3E] hover:bg-[#c53030] text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
            >
              Watch on YouTube →
            </a>
            <a
              href={episode.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-[#1DB954] hover:text-[#1DB954] text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors"
            >
              Listen on Spotify
            </a>
            <Link
              href="/podcast"
              className="inline-flex items-center gap-2 border border-white/20 text-gray-400 hover:text-white hover:border-white/40 px-4 py-2.5 rounded-lg text-sm transition-colors"
            >
              ← All Episodes
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          MAIN CONTENT — 65/35 two-column
      ============================================================ */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
            {/* LEFT — 65% */}
            <div className="w-full lg:w-[65%]">
              {/* YouTube embed */}
              <YoutubeEmbed
                videoId={episode.youtubeVideoId}
                title={episode.title}
                className="mb-8 shadow-xl"
              />

              {/* Tabs — Show Notes / Key Takeaways / Timestamps / Transcript */}
              <EpisodeTabs episode={episode} />
            </div>

            {/* RIGHT sidebar — 35% */}
            <div className="w-full lg:w-[35%] space-y-6">
              {/* Guest profile card */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <h3 className="text-[#0A1628] font-bold text-sm uppercase tracking-wide mb-4">
                  About the Guest
                </h3>
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
                    style={{ backgroundColor: episode.guest.avatarColor }}
                    aria-hidden="true"
                  >
                    {episode.guest.avatarInitials}
                  </div>
                  <div>
                    <p className="font-bold text-[#0A1628] text-sm">{episode.guest.name}</p>
                    <p className="text-gray-600 text-xs">{episode.guest.designation}</p>
                    <p className="text-gray-500 text-xs">{episode.guest.company}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed mb-3">{episode.guest.bio}</p>
                {episode.guest.linkedIn && (
                  <a
                    href={episode.guest.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0077B5] hover:underline"
                  >
                    View LinkedIn Profile →
                  </a>
                )}
              </div>

              {/* Topics */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <h3 className="text-[#0A1628] font-bold text-sm uppercase tracking-wide mb-3">
                  Topics Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {episode.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs px-2.5 py-1 rounded-full bg-[#E53E3E]/10 text-[#E53E3E] font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Subscribe CTA */}
              <div className="bg-[#0A1628] rounded-xl p-5 text-center">
                <p className="text-[#E53E3E] text-xs font-bold uppercase tracking-wide mb-2">
                  CC PODCAST
                </p>
                <p className="text-white font-bold text-sm mb-1">
                  New episodes every week
                </p>
                <p className="text-gray-400 text-xs mb-4">
                  Real conversations with India&apos;s CAs
                </p>
                <a
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full bg-[#E53E3E] hover:bg-[#c53030] text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors text-center"
                >
                  Subscribe on YouTube →
                </a>
              </div>

              {/* Related episodes */}
              {relatedEpisodes.length > 0 && (
                <div>
                  <h3 className="text-[#0A1628] font-bold text-sm uppercase tracking-wide mb-4">
                    Related Episodes
                  </h3>
                  <div className="space-y-4">
                    {relatedEpisodes.map((ep) => (
                      <Link
                        key={ep.id}
                        href={`/podcast/${ep.slug}`}
                        className="flex items-start gap-3 group"
                      >
                        <div className="relative flex-shrink-0 w-16 h-10 rounded-lg bg-gradient-to-br from-[#0A1628] to-gray-700 flex items-center justify-center">
                          <div className="w-5 h-5 rounded-full bg-[#E53E3E] flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="white"
                              className="w-3 h-3 ml-0.5"
                              aria-hidden="true"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[#0A1628] text-xs font-semibold line-clamp-2 group-hover:text-[#E53E3E] transition-colors leading-snug">
                            {ep.title}
                          </p>
                          <p className="text-gray-400 text-[10px] mt-0.5">
                            Ep {ep.episodeNumber} &middot; {ep.durationMinutes} min
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MORE EPISODES
      ============================================================ */}
      {relatedEpisodes.length > 0 && (
        <section className="bg-gray-50 py-12 lg:py-16 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[#0A1628] text-xl sm:text-2xl font-bold">More Episodes</h2>
              <Link
                href="/podcast"
                className="text-[#E53E3E] text-sm font-semibold hover:underline"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedEpisodes.map((ep) => (
                <EpisodeCard key={ep.id} episode={ep} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          BE A GUEST CTA banner
      ============================================================ */}
      <section className="bg-gradient-to-br from-[#1A0000] to-[#0A1628] py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3">
            Have a Story to Share?
          </h2>
          <p className="text-gray-300 text-sm mb-6 max-w-xl mx-auto">
            We feature CAs at all stages — from articleship students to Big 4 partners. Apply to
            be a guest on CC Podcast.
          </p>
          <Link
            href="/podcast#be-a-guest"
            className="inline-flex items-center gap-2 bg-[#E53E3E] hover:bg-[#c53030] text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
          >
            Be Our Next Guest →
          </Link>
        </div>
      </section>
    </>
  )
}

// Inline client component for tabs — embedded to keep page.tsx a server component
function EpisodeTabs({ episode }: { episode: NonNullable<ReturnType<typeof getEpisodeBySlug>> }) {
  // We use a pure CSS/HTML approach with details/summary for zero-JS accordion tabs
  // since the parent is a server component
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Show Notes */}
      <details open className="group border-b border-gray-200 last:border-b-0">
        <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none bg-white hover:bg-gray-50 transition-colors list-none">
          <span className="font-semibold text-[#0A1628] text-sm">Show Notes</span>
          <span className="text-gray-400 text-xs transition-transform group-open:rotate-180">
            ▾
          </span>
        </summary>
        <div className="px-5 py-4 bg-gray-50">
          <p className="text-gray-700 text-sm leading-relaxed">{episode.description}</p>
          <div className="mt-4">
            <p className="text-[#0A1628] font-semibold text-xs mb-2">Guest:</p>
            <p className="text-gray-600 text-sm">
              <strong>{episode.guest.name}</strong> — {episode.guest.designation},{" "}
              {episode.guest.company}
            </p>
            <p className="text-gray-500 text-xs mt-1">{episode.guest.bio}</p>
          </div>
        </div>
      </details>

      {/* Key Takeaways */}
      <details className="group border-b border-gray-200 last:border-b-0">
        <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none bg-white hover:bg-gray-50 transition-colors list-none">
          <span className="font-semibold text-[#0A1628] text-sm">
            Key Takeaways ({episode.keyTakeaways.length})
          </span>
          <span className="text-gray-400 text-xs transition-transform group-open:rotate-180">
            ▾
          </span>
        </summary>
        <div className="px-5 py-4 bg-gray-50">
          <ol className="space-y-3">
            {episode.keyTakeaways.map((point, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E53E3E] text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="text-gray-700 text-sm leading-relaxed">{point}</p>
              </li>
            ))}
          </ol>
        </div>
      </details>

      {/* Timestamps */}
      <details className="group border-b border-gray-200 last:border-b-0">
        <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none bg-white hover:bg-gray-50 transition-colors list-none">
          <span className="font-semibold text-[#0A1628] text-sm">
            Timestamps / Chapters ({episode.timestamps.length})
          </span>
          <span className="text-gray-400 text-xs transition-transform group-open:rotate-180">
            ▾
          </span>
        </summary>
        <div className="px-5 py-4 bg-gray-50">
          <div className="space-y-2">
            {episode.timestamps.map((ts, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="font-mono text-[#E53E3E] text-xs font-bold bg-[#E53E3E]/10 px-2 py-0.5 rounded">
                  {ts.time}
                </span>
                <span className="text-gray-700 text-sm">{ts.chapter}</span>
              </div>
            ))}
          </div>
        </div>
      </details>

      {/* Transcript (placeholder) */}
      <details className="group">
        <summary className="flex items-center justify-between px-5 py-4 cursor-pointer select-none bg-white hover:bg-gray-50 transition-colors list-none">
          <span className="font-semibold text-[#0A1628] text-sm">Transcript</span>
          <span className="text-gray-400 text-xs transition-transform group-open:rotate-180">
            ▾
          </span>
        </summary>
        <div className="px-5 py-4 bg-gray-50 text-center">
          <p className="text-gray-500 text-sm">
            Full transcript coming soon. Watch the episode on{" "}
            <a
              href={episode.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E53E3E] font-medium hover:underline"
            >
              YouTube
            </a>{" "}
            with auto-generated captions.
          </p>
        </div>
      </details>
    </div>
  )
}
