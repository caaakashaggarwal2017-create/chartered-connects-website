export interface MentorSlot {
  id: string
  day: string       // e.g. "Mon"
  date: string      // e.g. "14 Apr"
  time: string      // e.g. "7:00 PM – 7:30 PM"
  isAvailable: boolean
}

export interface Mentor {
  id: string
  slug: string
  name: string
  avatarInitials: string
  avatarColor: string
  designation: string
  organisation: string
  organisationType: 'big4' | 'mid-size' | 'boutique' | 'industry' | 'icai' | 'own-practice'
  category: 'Big 4' | 'Mid-size Firms' | 'Industry / CFO' | 'ICAI Boards' | 'Practice Heads' | 'Women in CA'
  yearsExperience: number
  city: string
  shortBio: string
  bio: string
  expertise: string[]
  canHelpWith: string[]
  languages: string[]
  sessionFormat: string
  availableSlots: MentorSlot[]
  sessionsCompleted: number
  rating: number | null
  isVerified: boolean
  isFeatured: boolean
  linkedIn: string
  addedDate: string
}

export interface SessionRequest {
  id: string
  mentorId: string
  mentorName: string
  slotId: string
  slotDetails: string
  studentName: string
  studentEmail: string
  studentPhone?: string
  studentLevel: string
  topic: string
  goal?: string
  linkedIn?: string
  status: 'pending' | 'confirmed' | 'declined'
  requestedAt: string
}

export interface MentorApplication {
  id: string
  name: string
  email: string
  phone?: string
  linkedIn: string
  city: string
  photoUrl?: string
  designation: string
  organisation: string
  organisationType: string
  yearsExperience: string
  membershipNumber: string
  specialisations: string[]
  careerHighlights: string
  mentoringAreas: string[]
  weeklySlots: string[]
  sessionFormat: string
  maxSessionsPerWeek: string
  languages: string[]
  noteToStudents?: string
  status: 'pending_review' | 'approved' | 'rejected'
  appliedAt: string
}
