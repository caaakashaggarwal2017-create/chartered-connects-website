"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Please enter a valid email"),
})

type FormData = z.infer<typeof schema>

export default function NewsletterForm({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setIsSuccess(true)
        reset()
        toast({ title: "You're in! 🎉", description: "Check your inbox every Tuesday for the CC Weekly.", variant: "success" })
      } else {
        throw new Error("Failed")
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={`text-center py-6 ${className}`}>
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="font-bold text-[#0A1628] text-lg mb-1">You're subscribed!</h3>
        <p className="text-gray-600 text-sm">Check your inbox every Tuesday for the CC Weekly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`w-full ${className}`} noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="First name"
            {...register("firstName")}
            className="h-12 bg-white border-gray-300"
            aria-label="First name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Your email address"
            {...register("email")}
            className="h-12 bg-white border-gray-300"
            aria-label="Email address"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <Button type="submit" variant="gold" size="lg" disabled={isLoading} className="h-12 whitespace-nowrap">
          {isLoading ? "Subscribing..." : "Subscribe Free →"}
        </Button>
      </div>
    </form>
  )
}
