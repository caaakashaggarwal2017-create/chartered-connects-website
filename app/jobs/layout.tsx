import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CA Jobs Board — Chartered Connects",
  description: "CA job openings in Delhi, Mumbai, Bengaluru and across India. Updated weekly.",
}

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
