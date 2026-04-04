import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free CA Resources — Chartered Connects",
  description: "Free downloads for CAs: study planners, GST guides, checklists and templates. No signup required.",
}

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
