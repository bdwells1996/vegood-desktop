import type { SVGProps } from 'react'

// Covers both Lucide icons and hand-written SVG components.
// Custom SVGs should be written as React components accepting SVGProps:
//
//   export function MyIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
//     return <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>...</svg>
//   }
//
// Then used exactly like a Lucide icon: <Icon icon={MyIcon} size="md" />
export type SvgIconComponent = React.ComponentType<
  SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }
>

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const ICON_SIZE_MAP: Record<IconSize, number> = {
  xs: 16,
  sm: 18,
  md: 20,
  lg: 24,
  xl: 26,
}

interface IconProps {
  icon: SvgIconComponent
  size?: IconSize
  strokeWidth?: number
  className?: string
  'aria-label'?: string
  'aria-hidden'?: boolean
}

export function Icon({
  icon: IconComponent,
  size = 'md',
  strokeWidth = 1.5,
  className,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}: IconProps) {
  const px = ICON_SIZE_MAP[size]
  return (
    <IconComponent
      size={px}
      width={px}
      height={px}
      strokeWidth={strokeWidth}
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ?? !ariaLabel}
    />
  )
}
