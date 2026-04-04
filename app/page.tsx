import type { Metadata } from "next"
import Hero from "@/components/hero"
import StatsBar from "@/components/stats-bar"
import FeatureCards from "@/components/feature-cards"
import NewsletterSection from "@/components/newsletter-section"
import Testimonials from "@/components/testimonials"
import LatestEpisodeHero from "@/components/podcast/latest-episode-hero"
import PodcastCtaBanner from "@/components/podcast/podcast-cta-banner"
import { featuredEpisode } from "@/lib/data/podcast-episodes"

export const metadata: Metadata = {
  title: "India's CA Community — Chartered Connects",
  description:
    "Resources, jobs, articleship and compliance tools for 1 lakh+ CAs and CA aspirants across India",
  openGraph: {
    title: "India's CA Community — Chartered Connects",
    description:
      "Resources, jobs, articleship and compliance tools for 1 lakh+ CAs and CA aspirants across India",
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <FeatureCards />
      <LatestEpisodeHero episode={featuredEpisode} />
      <NewsletterSection />
      <Testimonials />
      <PodcastCtaBanner />
    </>
  )
}
