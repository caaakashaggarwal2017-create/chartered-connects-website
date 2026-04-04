"use client"

import { useState } from "react"
import { Download, Search } from "lucide-react"
import { resources, resourceCategories } from "@/lib/data/resources"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({ email: z.string().email("Enter a valid email") })
type FormData = z.infer<typeof schema>

const categoryColors: Record<string, string> = {
  "exam-prep": "bg-blue-100 text-blue-800",
  articleship: "bg-purple-100 text-purple-800",
  "gst-tax": "bg-green-100 text-green-800",
  career: "bg-amber-100 text-amber-800",
  templates: "bg-gray-100 text-gray-800",
}

const categoryLabels: Record<string, string> = {
  "exam-prep": "Exam Prep",
  articleship: "Articleship",
  "gst-tax": "GST & Tax",
  career: "Career",
  templates: "Templates",
}

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [search, setSearch] = useState("")
  const [downloadResource, setDownloadResource] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const filtered = resources.filter((r) => {
    const matchCat = activeCategory === "all" || r.category === activeCategory
    const matchSearch =
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const onDownload = async (data: FormData) => {
    setIsLoading(true)
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, firstName: "Resource Download" }),
      })
      toast({
        title: "Download starting!",
        description: "Check your downloads folder.",
        variant: "success",
      })
      setDownloadResource(null)
      reset()
    } catch {
      toast({ title: "Error", description: "Please try again.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Hero */}
      <section className="bg-[#0A1628] py-14 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="gold" className="mb-4 text-xs font-bold uppercase tracking-wider px-3 py-1">
            No Signup Required
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Free CA Resources
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Study planners, GST guides, articleship checklists, templates — all free. New resources every week.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
            <Input
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 bg-white"
              aria-label="Search resources"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {resourceCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] ${
                  activeCategory === cat.value
                    ? "bg-[#0A1628] text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
                }`}
                aria-pressed={activeCategory === cat.value}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <p className="text-sm text-gray-500 mb-5">{filtered.length} resources found</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[resource.category]}`}
                >
                  {categoryLabels[resource.category]}
                </span>
                {resource.isNew && (
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    NEW
                  </span>
                )}
              </div>

              <h2 className="font-bold text-[#0A1628] text-base mb-2">{resource.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{resource.description}</p>

              <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                <span>{resource.fileSize}</span>
                <span>{resource.downloadCount.toLocaleString("en-IN")} downloads</span>
              </div>

              <Button
                variant="gold"
                size="sm"
                className="w-full"
                onClick={() => setDownloadResource(resource.fileName)}
              >
                <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                Download Free
              </Button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No resources found. Try a different search or category.</p>
          </div>
        )}
      </div>

      {/* Download modal */}
      <Dialog open={!!downloadResource} onOpenChange={() => { setDownloadResource(null); reset() }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter your email to download</DialogTitle>
            <DialogDescription>
              We&apos;ll send the resource to your email. No spam — ever.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onDownload)} className="space-y-4 mt-2">
            <div>
              <Input
                type="email"
                placeholder="your@email.com"
                {...register("email")}
                className="h-11"
                aria-label="Email address"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <Button type="submit" variant="gold" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Download Now →"}
            </Button>
            <p className="text-xs text-gray-400 text-center">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
