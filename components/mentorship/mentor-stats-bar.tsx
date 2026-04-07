const STATS = [
  { value: '10+', label: 'Verified Mentors' },
  { value: '100%', label: 'Free Sessions' },
  { value: '30 min', label: 'Per Session' },
  { value: '48h', label: 'Response Time' },
]

export default function MentorStatsBar() {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-wrap justify-center sm:justify-between gap-6 sm:gap-4">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-xl font-bold text-[#D97706]">{value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
