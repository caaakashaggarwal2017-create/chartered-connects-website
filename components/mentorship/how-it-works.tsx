import { UserSearch, CalendarCheck, Video, Star } from 'lucide-react'

const STEPS = [
  {
    icon: UserSearch,
    step: '01',
    title: 'Browse Mentors',
    desc: 'Filter by firm type, city, or expertise. Every mentor is a verified CA professional.',
  },
  {
    icon: CalendarCheck,
    step: '02',
    title: 'Pick a Slot',
    desc: 'Choose from the mentor\'s available time slots. Sessions are 30 minutes, free of charge.',
  },
  {
    icon: Video,
    step: '03',
    title: 'Join the Call',
    desc: 'Meet on Google Meet or Zoom. Get candid, experience-backed guidance.',
  },
  {
    icon: Star,
    step: '04',
    title: 'Leave Feedback',
    desc: 'Rate your session to help future students find the right mentors.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">How It Works</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Four simple steps to a meaningful 1:1 conversation with a senior CA professional.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map(({ icon: Icon, step, title, desc }) => (
            <div key={step} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-5 h-5 text-[#D97706]" />
              </div>
              <div className="text-xs font-bold text-[#D97706] mb-2 tracking-wider">{step}</div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
