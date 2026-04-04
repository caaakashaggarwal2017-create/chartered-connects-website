import { Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

const LINKEDIN_URL = "https://www.linkedin.com/company/42837933"

export default function LinkedInCTA() {
  return (
    <section className="bg-[#EBF5FB] border-y border-[#0077B5]/20 py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-14 h-14 rounded-xl bg-[#0077B5] flex items-center justify-center mx-auto mb-5">
          <Linkedin className="h-7 w-7 text-white" aria-hidden="true" />
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-[#0A1628] mb-3">
          Already 1,03,000+ strong on LinkedIn
        </h2>
        <p className="text-gray-600 text-lg mb-6 max-w-xl mx-auto">
          Join the conversation. Daily insights, exam updates, CA career stories and more.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-[#0077B5] hover:bg-[#006399] text-white font-semibold px-8"
        >
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-4 w-4 mr-2" aria-hidden="true" />
            Follow on LinkedIn →
          </a>
        </Button>
        <p className="text-gray-400 text-xs mt-4">Opens linkedin.com/company/42837933</p>
      </div>
    </section>
  )
}
