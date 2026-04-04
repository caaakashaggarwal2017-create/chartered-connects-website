import Link from "next/link"
import { Linkedin, Youtube } from "lucide-react"

const LINKEDIN_URL = "https://www.linkedin.com/company/42837933"
const YOUTUBE_URL = "https://youtube.com/@CharteredConnects"

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="14" cy="14" r="3" fill="#F5A623"/>
                <circle cx="4" cy="8" r="2" fill="white"/>
                <circle cx="24" cy="8" r="2" fill="white"/>
                <circle cx="4" cy="20" r="2" fill="white"/>
                <circle cx="24" cy="20" r="2" fill="white"/>
                <line x1="14" y1="14" x2="4" y2="8" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
                <line x1="14" y1="14" x2="24" y2="8" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
                <line x1="14" y1="14" x2="4" y2="20" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
                <line x1="14" y1="14" x2="24" y2="20" stroke="white" strokeWidth="1.5" strokeOpacity="0.4"/>
              </svg>
              <span className="font-bold text-lg text-white">Chartered Connects</span>
            </Link>
            <p className="text-gray-400 text-sm italic mb-3">Inspire. Learn. Lead.</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              India's professional community for Chartered Accountants and CA aspirants. Seamless connection for a prosperous financial future.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#0077B5] bg-white/10 hover:bg-[#0077B5] hover:text-white px-3 py-2 rounded-lg transition-colors"
                aria-label="Follow Chartered Connects on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
                Follow on LinkedIn
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#E53E3E] bg-white/10 hover:bg-[#E53E3E] hover:text-white px-3 py-2 rounded-lg transition-colors"
                aria-label="Subscribe to CC Podcast on YouTube"
              >
                <Youtube className="h-4 w-4" />
                Subscribe on YouTube
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Resources</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/resources", label: "Free CA Resources" },
                { href: "/jobs", label: "CA Jobs Board" },
                { href: "/calendar", label: "Compliance Calendar" },
                { href: "/newsletter", label: "CC Newsletter" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-[#F5A623] text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Community</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/articleship", label: "CA Articleship Connect" },
                { href: "/directory", label: "Find a CA" },
                { href: "/about", label: "About Us" },
                { href: LINKEDIN_URL, label: "LinkedIn Community", external: true },
              ].map(({ href, label, external }) => (
                <li key={href}>
                  {external ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#F5A623] text-sm transition-colors">
                      {label} ↗
                    </a>
                  ) : (
                    <Link href={href} className="text-gray-400 hover:text-[#F5A623] text-sm transition-colors">
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Podcast */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Podcast</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/podcast" className="text-gray-400 hover:text-[#F5A623] text-sm transition-colors">
                  All Episodes
                </Link>
              </li>
              <li>
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#F5A623] text-sm transition-colors"
                >
                  Watch on YouTube ↗
                </a>
              </li>
              <li>
                <Link href="/podcast#be-a-guest" className="text-gray-400 hover:text-[#F5A623] text-sm transition-colors">
                  Be a Guest
                </Link>
              </li>
              <li>
                <Link href="/newsletter" className="text-gray-400 hover:text-[#F5A623] text-sm transition-colors">
                  Subscribe
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Legal</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/contact", label: "Contact Us" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-gray-400 hover:text-[#F5A623] text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © 2025 Chartered Connects. Made with care for the CA community in India.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#F5A623] text-xs transition-colors"
            >
              Back to LinkedIn →
            </a>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#E53E3E] text-xs transition-colors"
            >
              CC Podcast on YouTube →
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
