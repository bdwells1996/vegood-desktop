'use client'

import { FormProvider } from 'react-hook-form'
import type { UseFormReturn, FieldValues } from 'react-hook-form'
import type { ReactNode } from 'react'

interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>
  onSubmit: (data: T) => void | Promise<void>
  children: ReactNode
  className?: string
}

export function Form<T extends FieldValues>({ form, onSubmit, children, className }: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className={className}>
        {children}
      </form>
    </FormProvider>
  )
}
