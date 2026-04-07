'use client'

import { BadgeCheck, MapPin, Star, Clock, Linkedin, Calendar } from 'lucide-react'
import { Mentor } from '@/lib/types/mentorship'

interface MentorProfileHeroProps {
  mentor: Mentor
  onRequestSession: () => void
}

export default function MentorProfileHero({ mentor, onRequestSession }: MentorProfileHeroProps) {
  const availableCount = mentor.availableSlots.filter(s => s.isAvailable).length

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Avatar */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
          style={{ backgroundColor: mentor.avatarColor }}
        >
          {mentor.avatarInitials}
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900">{mentor.name}</h1>
                {mentor.isVerified && (
                  <BadgeCheck className="w-5 h-5 text-[#D97706]" title="Verified CA" />
                )}
              </div>
              <p className="text-gray-600 text-sm mt-0.5">{mentor.designation}</p>
              <p className="text-gray-500 text-sm">{mentor.organisation}</p>
            </div>

            <div className="flex items-center gap-2">
              {mentor.linkedIn && (
                <a
                  href={mentor.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-gray-200 rounded-lg hover:border-[#D97706] hover:text-[#D97706] text-gray-500 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              <button
                onClick={onRequestSession}
                disabled={availableCount === 0}
                className="bg-[#D97706] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                {availableCount > 0 ? 'Request Session' : 'No Slots Available'}
              </button>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {mentor.city}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {mentor.yearsExperience} years experience
            </span>
            {mentor.rating && (
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {mentor.rating.toFixed(1)} rating
              </span>
            )}
            <span className="text-gray-400">
              {mentor.sessionsCompleted} sessions completed
            </span>
          </div>

          {/* Category badge */}
          <div className="mt-3">
            <span className="inline-block bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full">
              {mentor.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
