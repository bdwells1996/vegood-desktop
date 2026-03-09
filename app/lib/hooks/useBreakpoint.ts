'use client'

import { useEffect, useState } from 'react'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// Tailwind breakpoints + xs for sub-sm
const BREAKPOINTS: Record<Breakpoint, number> = {
	xs: 0,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
}

/**
 * Hook to get the current breakpoint based on window width.
 * Uses Tailwind breakpoints with an added 'xs' for sub-sm sizes.
 *
 * @example
 * const breakpoint = useBreakpoint()
 * const isMobile = breakpoint === 'xs' || breakpoint === 'sm'
 */
export function useBreakpoint(): Breakpoint {
	const [breakpoint, setBreakpoint] = useState<Breakpoint>('md')
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)

		const handleResize = () => {
			const width = window.innerWidth

			if (width < BREAKPOINTS.sm) {
				setBreakpoint('xs')
			} else if (width < BREAKPOINTS.md) {
				setBreakpoint('sm')
			} else if (width < BREAKPOINTS.lg) {
				setBreakpoint('md')
			} else if (width < BREAKPOINTS.xl) {
				setBreakpoint('lg')
			} else if (width < BREAKPOINTS['2xl']) {
				setBreakpoint('xl')
			} else {
				setBreakpoint('2xl')
			}
		}

		// Call once on mount
		handleResize()

		// Add listener
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	// Return a default on server/before hydration
	if (!isMounted) {
		return 'md'
	}

	return breakpoint
}
