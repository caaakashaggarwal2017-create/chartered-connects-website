'use client'

import Link from 'next/link'
import { BadgeCheck, Star, MapPin, Clock } from 'lucide-react'
import { Mentor } from '@/lib/types/mentorship'

interface MentorCardProps {
  mentor: Mentor
}

export default function MentorCard({ mentor }: MentorCardProps) {
  const availableCount = mentor.availableSlots.filter(s => s.isAvailable).length

  return (
    <Link href={`/mentorship/mentor/${mentor.slug}`} className="block group">
      <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#D97706] hover:shadow-md transition-all duration-200 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
            style={{ backgroundColor: mentor.avatarColor }}
          >
            {mentor.avatarInitials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-[#D97706] transition-colors">
                {mentor.name}
              </h3>
              {mentor.isVerified && (
                <BadgeCheck className="w-4 h-4 text-[#D97706] flex-shrink-0" />
              )}
            </div>
            <p className="text-xs text-gray-500 truncate">{mentor.designation}</p>
            <p className="text-xs text-gray-500 truncate">{mentor.organisation}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {mentor.city}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {mentor.yearsExperience}y exp
          </span>
          {mentor.rating && (
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {mentor.rating.toFixed(1)}
            </span>
          )}
        </div>

        {/* Bio */}
        <p className="text-xs text-gray-600 leading-relaxed mb-3 flex-1 line-clamp-2">
          {mentor.shortBio}
        </p>

        {/* Expertise tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {mentor.expertise.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
          {mentor.expertise.length > 3 && (
            <span className="text-[10px] text-gray-400">+{mentor.expertise.length - 3}</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {mentor.sessionsCompleted} sessions
          </span>
          {availableCount > 0 ? (
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {availableCount} slot{availableCount > 1 ? 's' : ''} free
            </span>
          ) : (
            <span className="text-xs text-gray-400">No slots available</span>
          )}
        </div>
      </div>
    </Link>
  )
}
