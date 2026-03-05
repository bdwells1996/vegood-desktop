'use client'

import { useState, useId } from 'react'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Icon } from '../Icon'
import { useFormErrors } from '../Form/FormContext'

type InputSize = 'md' | 'lg'

interface BaseProps {
  name: string
  label?: string
  helperText?: string
  size?: InputSize
  fullWidth?: boolean
  error?: string
}

type InputProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'name'> & {
    type?: Exclude<InputHTMLAttributes<HTMLInputElement>['type'], undefined>
  }

type TextareaProps = BaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'>

type Props = (InputProps & { type?: string }) | (TextareaProps & { type: 'textarea' })

const SIZE_CLASSES: Record<InputSize, { height: string; padding: string; text: string }> = {
  md: { height: 'h-[44px]', padding: 'px-[15px]', text: 'text-body' },
  lg: { height: 'h-[52px]', padding: 'px-[17px]', text: 'text-body-lg' },
}

export function Input({
  name,
  label,
  helperText,
  size = 'md',
  fullWidth,
  error: errorProp,
  className,
  disabled,
  ...rest
}: Props) {
  const uid = useId()
  const id = `input-${name}-${uid}`
  const descId = `${id}-desc`

  const { errors, inForm } = useFormErrors()
  const contextError = inForm ? errors[name]?.[0] : undefined
  const error = errorProp ?? contextError

  const isTextarea = (rest as { type?: string }).type === 'textarea'
  const isPassword = !isTextarea && (rest as InputProps).type === 'password'

  const [showPassword, setShowPassword] = useState(false)

  const sizeClasses = SIZE_CLASSES[size]

  const widthClass = inForm && !fullWidth ? 'w-full md:w-1/2' : 'w-full'

  const baseInputClasses = [
    'flex-1 bg-transparent outline-none',
    'text-content-primary',
    sizeClasses.text,
    'placeholder:text-content-tertiary',
    disabled ? 'cursor-not-allowed' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const wrapperBorderClasses = [
    'flex items-center',
    'border rounded-input bg-background',
    error ? 'border-border-error' : 'border-border',
    'focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-0',
    disabled ? 'bg-background-secondary opacity-60 pointer-events-none' : '',
    sizeClasses.height,
    sizeClasses.padding,
  ]
    .filter(Boolean)
    .join(' ')

  const labelClasses = [
    'text-content-primary font-medium text-body',
    disabled ? 'opacity-50' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={['flex flex-col gap-[6px]', widthClass, className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}

      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          disabled={disabled}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={helperText || error ? descId : undefined}
          className={[
            'border rounded-input bg-background',
            'text-content-primary text-body',
            'placeholder:text-content-tertiary',
            'p-[15px] min-h-[120px] resize-y outline-none',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-0',
            error ? 'border-border-error' : 'border-border',
            disabled ? 'bg-background-secondary opacity-60 pointer-events-none' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <div className={wrapperBorderClasses}>
          <input
            id={id}
            name={name}
            type={isPassword ? (showPassword ? 'text' : 'password') : (rest as InputProps).type}
            disabled={disabled}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={helperText || error ? descId : undefined}
            className={baseInputClasses}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="ml-2 text-content-tertiary hover:text-content-primary transition-colors"
              tabIndex={-1}
            >
              <Icon icon={showPassword ? EyeOff : Eye} size="md" aria-hidden />
            </button>
          )}
        </div>
      )}

      {(error || helperText) && (
        <p id={descId} className={error ? 'text-error text-caption' : 'text-content-tertiary text-caption'}>
          {error ?? helperText}
        </p>
      )}
    </div>
  )
}
