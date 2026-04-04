"use client"

import { Suspense, useState, FormEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get("from") ?? "/admin"

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      if (res.ok) {
        router.push(from)
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error ?? "Login failed.")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 justify-center mb-10">
          <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="3" fill="#F5A623" />
            <circle cx="4"  cy="8"  r="2" fill="white" opacity="0.9" />
            <circle cx="24" cy="8"  r="2" fill="white" opacity="0.9" />
            <circle cx="4"  cy="20" r="2" fill="white" opacity="0.9" />
            <circle cx="24" cy="20" r="2" fill="white" opacity="0.9" />
            <line x1="14" y1="14" x2="4"  y2="8"  stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
            <line x1="14" y1="14" x2="24" y2="8"  stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
            <line x1="14" y1="14" x2="4"  y2="20" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
            <line x1="14" y1="14" x2="24" y2="20" stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
            <line x1="4"  y1="8"  x2="24" y2="8"  stroke="#F5A623" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="4"  y1="20" x2="24" y2="20" stroke="#F5A623" strokeWidth="1" strokeOpacity="0.4" />
          </svg>
          <div>
            <p className="text-white font-bold text-lg leading-none">Chartered Connects</p>
            <p className="text-[#F5A623] text-xs font-medium tracking-widest uppercase mt-0.5">Admin Panel</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-2xl font-bold text-[#0A1628] mb-1">Sign in</h1>
          <p className="text-gray-500 text-sm mb-7">Enter your admin credentials to continue.</p>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent transition"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0A1628] hover:bg-[#0d1f38] text-white font-semibold rounded-lg text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-white/30 mt-6">
          Chartered Connects Admin · Restricted Access
        </p>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
