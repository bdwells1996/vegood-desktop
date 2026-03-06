"use client"

import { createContext, useContext } from 'react'

export interface FormContextValue {
  errors: Record<string, string[] | undefined>
  inForm: boolean
}

export const FormContext = createContext<FormContextValue>({
  errors: {},
  inForm: false,
})

export function useFormErrors(): FormContextValue {
  return useContext(FormContext)
}
