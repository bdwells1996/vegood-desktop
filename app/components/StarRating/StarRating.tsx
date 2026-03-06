import { type FC } from 'react'

/**
 * A star filled/empty indicator rendered inline.
 * Accepts a numeric value 0–1 where 1 = full star, 0 = empty, 0.5 = half.
 */
const Star: FC<{ fill: number; index: number }> = ({ fill, index }) => {
  const id = `star-clip-${index}`
  const fillPct = Math.min(1, Math.max(0, fill)) * 100

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={id}>
          <rect x="0" y="0" width={`${fillPct}%`} height="14" />
        </clipPath>
      </defs>
      {/* Empty star background — neutral-200 */}
      <path
        d="M7 1L8.854 5.09L13.364 5.636L10.182 8.727L10.909 13.227L7 11.182L3.091 13.227L3.818 8.727L0.636 5.636L5.146 5.09L7 1Z"
        fill="#e5e7eb"
      />
      {/* Filled portion clipped to the fill percentage — amber-500 */}
      <path
        d="M7 1L8.854 5.09L13.364 5.636L10.182 8.727L10.909 13.227L7 11.182L3.091 13.227L3.818 8.727L0.636 5.636L5.146 5.09L7 1Z"
        fill="#f59e0b"
        clipPath={`url(#${id})`}
      />
    </svg>
  )
}

/**
 * StarRating — renders a row of 5 stars representing a 0–5 rating.
 * Supports decimal ratings (e.g. 4.6) for partial star fills.
 *
 * @example
 * <StarRating rating={4.6} />
 */
export const StarRating: FC<{ rating: number }> = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.min(1, Math.max(0, rating - i))
    return <Star key={i} fill={fill} index={i} />
  })

  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {stars}
    </div>
  )
}

export default StarRating
