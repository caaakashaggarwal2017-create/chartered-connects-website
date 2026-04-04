"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  designation: z.enum([
    "CA Student",
    "CA Final Qualified",
    "Practicing CA",
    "CA in Industry",
    "CA Partner",
    "Finance Professional",
    "Other",
  ]),
  organisation: z.string().min(1, "Organisation / firm name is required"),
  yearsExperience: z.string().min(1, "Years of experience is required"),
  topicIdea: z
    .string()
    .min(20, "Please describe your topic idea in at least 20 characters")
    .max(1000, "Topic idea must be under 1000 characters"),
  linkedInUrl: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  beenOnPodcastBefore: z.enum(["Yes", "No"]),
  heardAboutUs: z.enum(["LinkedIn", "YouTube", "Friend", "Google", "Other"]),
})

type FormData = z.infer<typeof schema>

const inputClass =
  "bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#E53E3E] focus:ring-[#E53E3E]"
const labelClass = "text-gray-200 text-sm font-medium mb-1.5 block"
const selectClass =
  "w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#E53E3E] focus:ring-1 focus:ring-[#E53E3E] transition-colors"
const errorClass = "text-red-400 text-xs mt-1"

export default function GuestApplyForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setSubmitting(true)
    setServerError(null)
    try {
      const res = await fetch("/api/podcast/guest-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Server error")
      setSubmitted(true)
    } catch {
      setServerError("Something went wrong. Please try again in a few moments.")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-white/10 border border-white/20 p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-[#E53E3E] flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-7 h-7"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="text-white font-bold text-xl mb-2">Application Received!</h3>
        <p className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto">
          Thanks! We&apos;ll review your application and reach out within 5 working days.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Row 1: Full name + email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName" className={labelClass}>
            Full Name *
          </Label>
          <Input
            id="fullName"
            placeholder="CA Priya Sharma"
            className={inputClass}
            {...register("fullName")}
          />
          {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
        </div>
        <div>
          <Label htmlFor="email" className={labelClass}>
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="priya@example.com"
            className={inputClass}
            {...register("email")}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      {/* Row 2: Phone + designation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone" className={labelClass}>
            Phone Number *
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            className={inputClass}
            {...register("phone")}
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
        <div>
          <Label htmlFor="designation" className={labelClass}>
            I am a *
          </Label>
          <select id="designation" className={selectClass} {...register("designation")}>
            <option value="" disabled>
              Select your designation
            </option>
            <option value="CA Student">CA Student</option>
            <option value="CA Final Qualified">CA Final Qualified</option>
            <option value="Practicing CA">Practicing CA</option>
            <option value="CA in Industry">CA in Industry</option>
            <option value="CA Partner">CA Partner</option>
            <option value="Finance Professional">Finance Professional</option>
            <option value="Other">Other</option>
          </select>
          {errors.designation && <p className={errorClass}>{errors.designation.message}</p>}
        </div>
      </div>

      {/* Row 3: Organisation + years experience */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="organisation" className={labelClass}>
            Organisation / Firm *
          </Label>
          <Input
            id="organisation"
            placeholder="Deloitte India / Self-employed"
            className={inputClass}
            {...register("organisation")}
          />
          {errors.organisation && <p className={errorClass}>{errors.organisation.message}</p>}
        </div>
        <div>
          <Label htmlFor="yearsExperience" className={labelClass}>
            Years of Experience *
          </Label>
          <Input
            id="yearsExperience"
            placeholder="e.g. 5 years"
            className={inputClass}
            {...register("yearsExperience")}
          />
          {errors.yearsExperience && (
            <p className={errorClass}>{errors.yearsExperience.message}</p>
          )}
        </div>
      </div>

      {/* Topic idea */}
      <div>
        <Label htmlFor="topicIdea" className={labelClass}>
          What would you like to talk about on the podcast? *
        </Label>
        <Textarea
          id="topicIdea"
          placeholder="Describe your story, expertise, or the topic you'd like to cover. What unique insight or experience can you share with the CA community?"
          rows={4}
          className={`${inputClass} resize-none`}
          {...register("topicIdea")}
        />
        {errors.topicIdea && <p className={errorClass}>{errors.topicIdea.message}</p>}
      </div>

      {/* LinkedIn URL */}
      <div>
        <Label htmlFor="linkedInUrl" className={labelClass}>
          LinkedIn Profile URL (optional)
        </Label>
        <Input
          id="linkedInUrl"
          type="url"
          placeholder="https://linkedin.com/in/yourprofile"
          className={inputClass}
          {...register("linkedInUrl")}
        />
        {errors.linkedInUrl && <p className={errorClass}>{errors.linkedInUrl.message}</p>}
      </div>

      {/* Row 4: Been on podcast + heard about */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="beenOnPodcastBefore" className={labelClass}>
            Have you been on a podcast before? *
          </Label>
          <select
            id="beenOnPodcastBefore"
            className={selectClass}
            {...register("beenOnPodcastBefore")}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.beenOnPodcastBefore && (
            <p className={errorClass}>{errors.beenOnPodcastBefore.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="heardAboutUs" className={labelClass}>
            How did you hear about CC Podcast? *
          </Label>
          <select id="heardAboutUs" className={selectClass} {...register("heardAboutUs")}>
            <option value="" disabled>
              Select
            </option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="YouTube">YouTube</option>
            <option value="Friend">Friend / Colleague</option>
            <option value="Google">Google</option>
            <option value="Other">Other</option>
          </select>
          {errors.heardAboutUs && <p className={errorClass}>{errors.heardAboutUs.message}</p>}
        </div>
      </div>

      {serverError && (
        <p className="text-red-400 text-sm bg-red-900/30 px-4 py-2 rounded-lg">{serverError}</p>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#E53E3E] hover:bg-[#c53030] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Apply to Be a Guest →"}
      </Button>

      <p className="text-gray-400 text-xs text-center">
        We review all applications within 5 working days and reach out via email.
      </p>
    </form>
  )
}
