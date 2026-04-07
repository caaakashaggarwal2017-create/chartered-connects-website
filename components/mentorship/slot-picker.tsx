'use client'

import { MentorSlot } from '@/lib/types/mentorship'

interface SlotPickerProps {
  slots: MentorSlot[]
  selectedSlotId: string | null
  onSelect: (slotId: string) => void
}

export default function SlotPicker({ slots, selectedSlotId, onSelect }: SlotPickerProps) {
  const available = slots.filter(s => s.isAvailable)

  if (available.length === 0) {
    return (
      <p className="text-sm text-gray-500 italic">No slots currently available. Check back soon.</p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {available.map(slot => (
        <button
          key={slot.id}
          onClick={() => onSelect(slot.id)}
          className={`text-left p-3 rounded-lg border text-sm transition-all ${
            selectedSlotId === slot.id
              ? 'border-[#D97706] bg-amber-50 text-[#D97706] font-medium'
              : 'border-gray-200 bg-white text-gray-700 hover:border-[#D97706] hover:text-[#D97706]'
          }`}
        >
          <div className="font-medium">{slot.day}, {slot.date}</div>
          <div className="text-xs text-gray-500 mt-0.5">{slot.time}</div>
        </button>
      ))}
    </div>
  )
}
