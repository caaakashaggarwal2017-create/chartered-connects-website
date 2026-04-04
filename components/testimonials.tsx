"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote: "Chartered Connects helped me find my articleship firm. The resources are genuinely useful and the platform actually cares about CA students.",
    name: "Priya S.",
    title: "CA Final Student, Delhi",
    initials: "PS",
  },
  {
    quote: "The weekly newsletter is the best 5-minute read of my Tuesday. Career story, compliance update, job spotlight — exactly what I need.",
    name: "Rahul M.",
    title: "Practicing CA, Bengaluru",
    initials: "RM",
  },
  {
    quote: "Finally a CA community that's not just a glorified job board. The articleship platform is exactly what we needed as students.",
    name: "Anita K.",
    title: "CA, Mumbai",
    initials: "AK",
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-[#0A1628] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">What CAs are saying</h2>
          <p className="text-gray-400">TODO: Replace with real testimonials from community members</p>
        </div>

        {/* Desktop — 3 cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="text-[#F5A623] text-4xl font-serif mb-4 leading-none">"</div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623] font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile — swipeable carousel */}
        <div className="md:hidden">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="text-[#F5A623] text-4xl font-serif mb-4 leading-none">"</div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">{testimonials[active].quote}</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623] font-bold text-sm">
                {testimonials[active].initials}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{testimonials[active].name}</div>
                <div className="text-gray-500 text-xs">{testimonials[active].title}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-5">
            <button
              onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === active ? "bg-[#F5A623]" : "bg-white/30"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActive((active + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
