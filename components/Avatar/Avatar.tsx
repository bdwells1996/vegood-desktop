type AvatarSize = 'sm' | 'md' | 'lg'

interface AvatarProps {
  firstName: string
  lastName: string
  size?: AvatarSize
}

const SIZE_CLASSES: Record<AvatarSize, { container: string; text: string }> = {
  sm: { container: 'w-8 h-8', text: 'text-xs' },
  md: { container: 'w-12 h-12', text: 'text-base' },
  lg: { container: 'w-20 h-20', text: 'text-2xl' },
}

export function Avatar({ firstName, lastName, size = 'md' }: AvatarProps) {
  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase()
  const { container, text } = SIZE_CLASSES[size]

  return (
    <div
      className={[
        container,
        text,
        'rounded-full bg-primary-500 text-white',
        'flex items-center justify-center font-semibold select-none',
      ].join(' ')}
      aria-label={`${firstName} ${lastName}`}
    >
      {initials}
    </div>
  )
}
