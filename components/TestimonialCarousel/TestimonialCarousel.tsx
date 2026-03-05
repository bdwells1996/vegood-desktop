'use client'

import { useEffect, useState } from 'react'
import { Quote } from 'lucide-react'
import { Icon } from '@/components/Icon'
import { TestimonialProgressDots } from './TestimonialProgressDots'

export interface TestimonialItem {
  id: string
  avatarSrc: string
  avatarAlt: string
  quote: string
  name: string
  role: string
}

interface TestimonialCarouselProps {
  testimonials: TestimonialItem[]
  intervalMs?: number
}

export function TestimonialCarousel({
  testimonials,
  intervalMs = 8000,
}: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (true) return
    const timer = setTimeout(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length)
    }, intervalMs)
    return () => clearTimeout(timer)
  }, [activeIndex, isPaused, intervalMs, testimonials.length])

  const current = testimonials[activeIndex]

  return (
    <div
      className="flex flex-col items-center justify-center h-full px-12 py-16 text-center w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        key={activeIndex}
        className="flex flex-col items-center gap-6 w-full"
        style={{ animation: 'fadeIn 500ms ease-in-out' }}
      >
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white/20 shrink-0">
          <img
            src={current.avatarSrc}
            alt={current.avatarAlt}
            className="w-full h-full object-cover"
          />
        </div>
 
        {/* Quote + Attribution */}
        <figure className="flex flex-col items-center gap-6">
          <blockquote className="w-full max-w-[448px]">
            <p className="text-white text-h3 leading-relaxed font-regular">
              <Icon icon={Quote} size="sm" strokeWidth={0} className="text-green-500 inline align-top mr-1 fill-current" />
              {current.quote}
              <Icon icon={Quote} size="sm" strokeWidth={0} className="text-green-500 inline align-top ml-1 scale-x-[-1] fill-current" />
            </p>
          </blockquote>
          <figcaption className="flex flex-col items-center gap-1">
            <span className="text-white font-semibold text-body-lg">{current.name}</span>
            <cite className="text-white/60 text-body not-italic">{current.role}</cite>
          </figcaption>
        </figure>
      </div>

      <TestimonialProgressDots
        count={testimonials.length}
        activeIndex={activeIndex}
        intervalMs={intervalMs}
        isPaused={isPaused}
        onDotClick={setActiveIndex}
        />
    </div>
  )
}
