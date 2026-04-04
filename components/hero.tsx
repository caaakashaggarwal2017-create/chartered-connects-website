"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let isVisible = true

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const NODE_COUNT = 50
    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 1,
      })
    }

    const draw = () => {
      if (!isVisible) { animationId = requestAnimationFrame(draw); return }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
      })
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 150) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(245,166,35,${0.12*(1-dist/150)})`
            ctx.lineWidth = 0.8; ctx.stroke()
          }
        })
      })
      nodes.forEach(n => {
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(245,166,35,0.5)"; ctx.fill()
      })
      animationId = requestAnimationFrame(draw)
    }
    draw()

    const onVisibility = () => { isVisible = !document.hidden }
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <section className="relative bg-[#0A1628] overflow-hidden min-h-screen w-full">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

      <div className="relative z-10 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 pt-24 sm:pt-28 md:pt-32 pb-20">
        {/* Tagline pill */}
        <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium rounded-full backdrop-blur-sm px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-[#F5A623] rounded-full animate-pulse" aria-hidden="true" />
          Inspire. Learn. Lead.
        </div>

        {/* Heading */}
        <h1 className="font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6 max-w-5xl">
          India&apos;s Community for{" "}
          <span className="text-[#F5A623]">Chartered Accountants</span>
        </h1>

        {/* Subheadline */}
        <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
          Resources, jobs, compliance tools and a growing network of 1 lakh+ CAs and CA aspirants — all in one place.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-10">
          <Link
            href="/resources"
            className="inline-flex items-center justify-center font-semibold rounded-md bg-[#F5A623] text-[#0A1628] hover:bg-[#e09615] transition-colors text-sm sm:text-base px-6 py-3"
          >
            Explore Free Resources
          </Link>
          <a
            href="#newsletter"
            className="inline-flex items-center justify-center font-semibold rounded-md border-2 border-white text-white hover:bg-white hover:text-[#0A1628] transition-colors text-sm sm:text-base px-6 py-3"
          >
            Join the Newsletter
          </a>
        </div>

        {/* Social proof */}
        <div className="flex flex-wrap items-center gap-3 text-gray-400 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#F5A623] rounded-full" aria-hidden="true" />
            1,03,000+ followers on LinkedIn
          </span>
          <span className="text-gray-600 hidden sm:inline">·</span>
          <span>Delhi</span>
          <span className="text-gray-600">·</span>
          <span>Bengaluru</span>
          <span className="text-gray-600">·</span>
          <span>Mumbai</span>
          <span className="text-gray-600">·</span>
          <span>Hyderabad</span>
        </div>
      </div>
    </section>
  )
}
