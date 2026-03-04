'use client'

import type { LucideIcon } from 'lucide-react'
import React from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  iconLeft?: LucideIcon
  loading?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      iconLeft: IconComponent,
      loading = false,
      disabled = false,
      children,
      onClick,
      type = 'button',
      className = '',
    },
    ref
  ) => {
    // Base classes applied to all variants
    const baseClasses =
      'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[14px] font-sans font-medium text-[15px] leading-[22.5px] tracking-[-0.534px] transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed'

    // Variant-specific classes
    const variantClasses = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-button',
      secondary:
        'bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100 active:bg-primary-200 active:border-primary-300',
      ghost: 'bg-transparent text-primary-500 hover:bg-primary-50 hover:text-primary-600 active:bg-primary-100 active:text-primary-700',
      destructive: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
    }

    const finalClasses = `${baseClasses} ${variantClasses[variant]} ${className}`

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={finalClasses}
      >
        {loading ? (
          // Loading spinner
          <svg
            className="animate-spin"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Loading"
          >
            <circle
              cx="8"
              cy="8"
              r="7"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="11 22"
              strokeLinecap="round"
            />
          </svg>
        ) : IconComponent ? (
          <IconComponent size={16} />
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
