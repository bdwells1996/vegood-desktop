'use client'

import { useActionState } from 'react'
import type { ZodSchema } from 'zod'
import type { ReactNode } from 'react'
import { FormContext } from './FormContext'

type FormState = {
  errors: Record<string, string[] | undefined>
}

const initialState: FormState = { errors: {} }

interface FormProps {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>
  schema: ZodSchema
  children: ReactNode
  className?: string
}

export function Form({ action, schema, children, className }: FormProps) {
  const wrappedAction = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    const rawData: Record<string, unknown> = {}
    formData.forEach((value, key) => {
      rawData[key] = value
    })

    const result = schema.safeParse(rawData)
    if (!result.success) {
      return { errors: result.error.flatten().fieldErrors as Record<string, string[] | undefined> }
    }

    return action(prevState, formData)
  }

  const [state, dispatch] = useActionState(wrappedAction, initialState)

  return (
    <FormContext.Provider value={{ errors: state.errors, inForm: true }}>
      <form action={dispatch} noValidate className={className}>
        {children}
      </form>
    </FormContext.Provider>
  )
}
