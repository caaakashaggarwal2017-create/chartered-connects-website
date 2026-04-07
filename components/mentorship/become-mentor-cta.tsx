import Link from 'next/link'
import { Users, Clock, Award } from 'lucide-react'

export default function BecomeMentorCTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-900/30 border border-amber-700/40 text-amber-400 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <Award className="w-3.5 h-3.5" />
          For CA Professionals
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Give Back to the CA Community
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed mb-8">
          You've earned your stripes. Now help the next generation navigate articleship, exams, and early career decisions.
          Mentor 1–2 students per week — it takes just 30 minutes and makes a lasting difference.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          {[
            { icon: Clock, label: 'Just 30 min / session' },
            { icon: Users, label: 'Your own schedule' },
            { icon: Award, label: 'Verified CA badge' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-gray-300">
              <Icon className="w-4 h-4 text-[#D97706]" />
              {label}
            </div>
          ))}
        </div>

        <Link
          href="/mentor-onboarding"
          className="inline-block bg-[#D97706] text-white px-8 py-3 rounded-lg font-semibold text-sm hover:bg-amber-700 transition-colors"
        >
          Apply to Mentor →
        </Link>
        <p className="text-xs text-gray-500 mt-3">Free forever. We review all applications within 5 business days.</p>
      </div>
    </section>
  )
}
