import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CA Compliance Calendar FY 2025-26 — Chartered Connects",
  description: "Full GST, TDS, Income Tax and ROC deadline calendar. Never miss a filing.",
}

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
