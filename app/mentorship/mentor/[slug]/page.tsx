'use client'

import { useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, MessageCircle, Globe } from 'lucide-react'
import { mentors } from '@/lib/data/mentors'
import MentorProfileHero from '@/components/mentorship/mentor-profile-hero'
import SlotPicker from '@/components/mentorship/slot-picker'
import SessionRequestForm from '@/components/mentorship/session-request-form'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog'

export default function MentorProfilePage() {
  const { slug } = useParams<{ slug: string }>()
  const mentor = mentors.find(m => m.slug === slug)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null)

  if (!mentor) return notFound()

  const relatedMentors = mentors
    .filter(m => m.id !== mentor.id && m.category === mentor.category)
    .slice(0, 3)

  const bioParas = mentor.bio.split('\n\n').filter(Boolean)

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Back */}
        <Link
          href="/mentorship"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#D97706] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          All Mentors
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column — main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero card */}
            <MentorProfileHero
              mentor={mentor}
              onRequestSession={() => setIsModalOpen(true)}
            />

            {/* Bio */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">About</h2>
              <div className="space-y-3">
                {bioParas.map((para, i) => (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>

            {/* Can help with */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">
                <MessageCircle className="w-4 h-4 inline mr-2 text-[#D97706]" />
                Can Help With
              </h2>
              <ul className="space-y-2">
                {mentor.canHelpWith.map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages & format */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">
                <Globe className="w-4 h-4 inline mr-2 text-[#D97706]" />
                Session Details
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 text-xs mb-1">Languages</p>
                  <p className="text-gray-800 font-medium">{mentor.languages.join(', ')}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Format</p>
                  <p className="text-gray-800 font-medium">{mentor.sessionFormat}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Duration</p>
                  <p className="text-gray-800 font-medium">30 minutes</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Cost</p>
                  <p className="text-emerald-600 font-semibold">Free</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — sidebar */}
          <div className="space-y-5">
            {/* Expertise */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Expertise</h3>
              <div className="flex flex-wrap gap-1.5">
                {mentor.expertise.map(tag => (
                  <span key={tag} className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Available slots */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Available Slots</h3>
              <SlotPicker
                slots={mentor.availableSlots}
                selectedSlotId={selectedSlotId}
                onSelect={id => {
                  setSelectedSlotId(id)
                  setIsModalOpen(true)
                }}
              />
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full mt-4 bg-[#D97706] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors"
              >
                Request Session
              </button>
            </div>

            {/* Stats */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-[#D97706]">{mentor.sessionsCompleted}</div>
                  <div className="text-xs text-gray-500 mt-0.5">Sessions</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#D97706]">
                    {mentor.rating ? mentor.rating.toFixed(1) : '—'}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related mentors */}
        {relatedMentors.length > 0 && (
          <div className="mt-10">
            <h2 className="text-base font-bold text-gray-900 mb-4">
              More {mentor.category} Mentors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedMentors.map(m => (
                <Link
                  key={m.id}
                  href={`/mentorship/mentor/${m.slug}`}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:border-[#D97706] hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ backgroundColor: m.avatarColor }}
                    >
                      {m.avatarInitials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{m.name}</p>
                      <p className="text-xs text-gray-500 truncate">{m.designation}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Session request modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
          <SessionRequestForm
            mentor={mentor}
            onClose={() => setIsModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </main>
  )
}
