interface TestimonialProgressDotsProps {
  count: number
  activeIndex: number
  intervalMs: number
  isPaused: boolean
  onDotClick: (index: number) => void
}

export function TestimonialProgressDots({
  count,
  activeIndex,
  intervalMs,
  isPaused,
  onDotClick,
}: TestimonialProgressDotsProps) {
  return (
    <div className="flex items-center gap-2 mt-6">
      {Array.from({ length: count }).map((_, i) => {
        if (i === activeIndex) {
          return (
            <button
              key={i}
              onClick={() => onDotClick(i)}
              className="w-6 h-2 rounded-full bg-primary-500 overflow-hidden relative"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div
                key={activeIndex}
                className="absolute inset-y-0 left-0 bg-primary-600 rounded-full h-full"
                style={{
                  animation: `dotFill ${intervalMs}ms linear forwards`,
                  animationPlayState: isPaused ? 'paused' : 'running',
                }}
              />
            </button>
          )
        }

        return (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            className="w-2 h-2 rounded-full bg-white/30"
            aria-label={`Go to slide ${i + 1}`}
          />
        )
      })}
    </div>
  )
}
