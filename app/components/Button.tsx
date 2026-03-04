'use client'

import React from 'react'
import { Icon, ICON_SIZE_MAP, type SvgIconComponent } from './Icon'

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: ButtonSize
  iconLeft?: SvgIconComponent
  loading?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

const sizeClasses: Record<ButtonSize, string> = {
  xs: 'h-[30px] px-[10px] gap-[4px] text-[12px] leading-[18px] tracking-[-0.24px] rounded-[8px]',
  sm: 'h-[36px] px-[14px] gap-[6px] text-[13px] leading-[19.5px] tracking-[-0.3362px] rounded-[10px]',
  md: 'h-[42px] px-[20px] gap-[8px] text-[15px] leading-[22.5px] tracking-[-0.534px] rounded-[14px]',
  lg: 'h-[50px] px-[24px] gap-[10px] text-[16px] leading-[24px] tracking-[-0.6325px] rounded-[16px]',
  xl: 'h-[58px] px-[32px] gap-[12px] text-[18px] leading-[27px] tracking-[-0.7995px] rounded-[18px]',
}

const variantClasses = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-button',
  secondary:
    'bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100 active:bg-primary-200 active:border-primary-300',
  ghost: 'bg-transparent text-primary-500 hover:bg-primary-50 hover:text-primary-600 active:bg-primary-100 active:text-primary-700',
  destructive: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
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
    const baseClasses =
      'inline-flex items-center justify-center font-sans font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed'

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      >
        {loading ? (
          <svg
            className="animate-spin"
            width={ICON_SIZE_MAP[size]}
            height={ICON_SIZE_MAP[size]}
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
          <Icon icon={IconComponent} size={size} strokeWidth={1.5} />
        ) : null}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
