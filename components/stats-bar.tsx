"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 100000, label: "Community Members", suffix: "+", display: "1,00,000+" },
  { value: 500, label: "CA Resources", suffix: "+", display: "500+" },
  { value: 200, label: "Job Listings", suffix: "+", display: "200+" },
  { value: 1, label: "Weekly Newsletter", suffix: "", display: "Weekly" },
]

function AnimatedNumber({ value, display }: { value: number; display: string }) {
  const [current, setCurrent] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (started) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    const duration = 1500
    const start = Date.now()
    const step = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, value])

  if (display === "Weekly") return <span ref={ref}>Weekly</span>
  if (value === 100000) return <span ref={ref}>{started ? `${(current / 1000).toFixed(0).padStart(2, "0")},000+` : "0"}</span>
  return <span ref={ref}>{started ? `${current.toLocaleString("en-IN")}+` : "0"}</span>
}

export default function StatsBar() {
  return (
    <section className="bg-[#0A1628] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-[#F5A623] mb-2">
                <AnimatedNumber value={stat.value} display={stat.display} />
              </div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
