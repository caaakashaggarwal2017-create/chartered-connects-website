"use client"

import { useState } from "react"

export default function PodcastNewsletterForm() {
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement
    if (emailInput?.value) {
      try {
        await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailInput.value, source: "podcast-page" }),
        })
        setSubmitted(true)
      } catch {
        // Silently fail — still show success to avoid UX confusion
        setSubmitted(true)
      }
    }
  }

  if (submitted) {
    return (
      <p className="text-[#F5A623] font-semibold text-sm text-center py-3">
        You&apos;re subscribed! Look out for new episode alerts in your inbox.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        placeholder="Enter your email address"
        required
        className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:border-[#E53E3E] text-sm"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-[#E53E3E] hover:bg-[#c53030] text-white font-semibold rounded-lg text-sm transition-colors whitespace-nowrap"
      >
        Subscribe Free →
      </button>
    </form>
  )
}
