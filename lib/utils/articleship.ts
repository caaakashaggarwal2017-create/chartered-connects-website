export function getInitialsColor(name: string): string {
  const colors = [
    "bg-blue-100 text-blue-800",
    "bg-purple-100 text-purple-800",
    "bg-green-100 text-green-800",
    "bg-amber-100 text-amber-800",
    "bg-red-100 text-red-800",
    "bg-teal-100 text-teal-800",
    "bg-indigo-100 text-indigo-800",
    "bg-pink-100 text-pink-800",
    "bg-cyan-100 text-cyan-800",
  ]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()
}

export function isNewListing(listedDate: string): boolean {
  const listed = new Date(listedDate)
  const now = new Date()
  const diffDays = (now.getTime() - listed.getTime()) / (1000 * 60 * 60 * 24)
  return diffDays <= 7
}

export function formatStipend(stipend: { min: number; max: number } | null): string {
  if (!stipend) return "No stipend"
  if (stipend.min === stipend.max)
    return `₹${stipend.min.toLocaleString("en-IN")}/mo`
  return `₹${stipend.min.toLocaleString("en-IN")}–₹${stipend.max.toLocaleString("en-IN")}/mo`
}

export function getSizeLabel(size: string): string {
  const map: Record<string, string> = {
    big4: "Big 4",
    mid: "Mid-size (10–50 CAs)",
    small: "Small (2–10 CAs)",
    boutique: "Boutique (1–2 CAs)",
  }
  return map[size] || size
}
