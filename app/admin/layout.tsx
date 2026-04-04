import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin — Chartered Connects",
  robots: { index: false, follow: false },
}

// This layout deliberately excludes the main site Nav and Footer
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
