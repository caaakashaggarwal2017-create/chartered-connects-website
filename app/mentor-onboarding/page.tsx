import OnboardingForm from '@/components/mentor-onboarding/onboarding-form'
import { Award, Users, Clock } from 'lucide-react'

export default function MentorOnboardingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-900/30 border border-amber-700/40 text-amber-400 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
            <Award className="w-3.5 h-3.5" />
            Apply to Mentor
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Share Your Experience. Shape a Career.
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Join verified CA professionals who give back to the next generation — one 30-minute conversation at a time.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
            {[
              { icon: Clock, label: '30 min sessions', sub: 'Your schedule, your terms' },
              { icon: Users, label: '1:1 guidance', sub: 'Meaningful conversations' },
              { icon: Award, label: 'Verified badge', sub: 'Showcased on your profile' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-amber-900/40 border border-amber-700/40 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{label}</p>
                  <p className="text-gray-500 text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
          <OnboardingForm />
        </div>
      </section>
    </main>
  )
}
