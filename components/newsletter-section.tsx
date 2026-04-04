import NewsletterForm from "@/components/newsletter-form"

export default function NewsletterSection() {
  return (
    <section id="newsletter" className="bg-[#F8F9FA] py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-[#F5A623]/10 text-[#F5A623] text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
          Free Every Tuesday
        </div>
        <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628] mb-3">
          Get the CC Weekly
        </h2>
        <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
          Career stories, compliance reminders, job highlights and free resources. Join 5,000+ CAs.
        </p>

        {/* Social proof avatars */}
        <div className="flex items-center justify-center gap-2 mb-7">
          <div className="flex -space-x-2">
            {["RK", "AS", "PM"].map((initials) => (
              <div
                key={initials}
                className="w-8 h-8 rounded-full bg-[#0A1628] border-2 border-white flex items-center justify-center text-white text-xs font-bold"
              >
                {initials}
              </div>
            ))}
          </div>
          <span className="text-gray-600 text-sm ml-2">Join 200+ others this week</span>
        </div>

        <NewsletterForm className="max-w-xl mx-auto" />

        <p className="text-gray-400 text-xs mt-4">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}
