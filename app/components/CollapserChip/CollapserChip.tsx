'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import type { FC } from 'react'

interface CollapserChipProps {
  count: number
  isExpanded: boolean
  onToggle: () => void
}

export const CollapserChip: FC<CollapserChipProps> = ({ count, isExpanded, onToggle }) => {
  const Icon = isExpanded ? ChevronUp : ChevronDown

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isExpanded}
      className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full border border-neutral-200 bg-neutral-50 text-neutral-700 cursor-pointer hover:bg-neutral-100 transition-colors"
    >
      <span className="text-[12px] leading-4.5 tracking-[-0.08px] font-medium whitespace-nowrap font-sans">
        {isExpanded ? 'Show less' : `+${count} more`}
      </span>
      <Icon size={14} strokeWidth={2} aria-hidden="true" />
    </button>
  )
}

export default CollapserChip
