import { Linkedin, Youtube } from "lucide-react"

const LINKEDIN_URL = "https://www.linkedin.com/company/42837933"
const YOUTUBE_URL = "https://youtube.com/@CharteredConnects"

export default function PodcastCtaBanner() {
  return (
    <section className="bg-[#0A1628] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-white/10">
          {/* LEFT — LinkedIn */}
          <div className="flex flex-col items-center justify-center text-center px-8 py-10 bg-[#0077B5]/10 border-b md:border-b-0 md:border-r border-white/10">
            <div className="w-12 h-12 rounded-full bg-[#0077B5] flex items-center justify-center mb-4">
              <Linkedin className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="text-white text-2xl font-black mb-1">1,03,000+</p>
            <p className="text-gray-300 text-sm mb-1">CA professionals on LinkedIn</p>
            <p className="text-gray-400 text-xs mb-5 max-w-xs">
              Join India&apos;s largest CA community for daily insights, job posts and career
              resources
            </p>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0077B5] hover:bg-[#005f91] text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              Follow on LinkedIn →
            </a>
          </div>

          {/* RIGHT — YouTube / Podcast */}
          <div className="flex flex-col items-center justify-center text-center px-8 py-10 bg-[#E53E3E]/10">
            <div className="w-12 h-12 rounded-full bg-[#E53E3E] flex items-center justify-center mb-4">
              <Youtube className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="text-white text-2xl font-black mb-1">CC Podcast</p>
            <p className="text-gray-300 text-sm mb-1">Watch on YouTube</p>
            <p className="text-gray-400 text-xs mb-5 max-w-xs">
              Real conversations with India&apos;s CAs — new episodes every week on YouTube
            </p>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E53E3E] hover:bg-[#c53030] text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
            >
              <Youtube className="h-4 w-4" aria-hidden="true" />
              Subscribe →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
