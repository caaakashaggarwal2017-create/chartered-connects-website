import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Find a CA — Chartered Connects",
  description: "Search verified CAs by city and specialisation across India.",
}

export default function DirectoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
