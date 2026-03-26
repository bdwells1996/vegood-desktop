'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfileAction } from '@/actions/auth'
import { profileSchema, type ProfileInput } from '@/schemas/auth'
import { Form } from '@/components/Form'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Avatar } from '@/components/Avatar'

interface ProfileFormProps {
  firstName: string
  lastName: string
  email: string
}

export function ProfileForm({ firstName, lastName, email }: ProfileFormProps) {
  const [displayedProfile, setDisplayedProfile] = useState({ firstName, lastName, email })
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: { firstName, lastName, email },
  })

  const { isDirty, isSubmitting } = form.formState

  async function onSubmit(data: ProfileInput) {
    setServerError(null)
    const result = await updateProfileAction(data)
    if (result.fieldError) {
      form.setError(result.fieldError.field as keyof ProfileInput, {
        message: result.fieldError.message,
      })
      return
    }
    if (result.error) {
      setServerError(result.error)
      return
    }
    if (result.success) {
      form.reset(data)
      setDisplayedProfile(data)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Avatar firstName={displayedProfile.firstName} lastName={displayedProfile.lastName} size="lg" />
        <div>
          <p className="font-semibold text-content-primary">{displayedProfile.firstName} {displayedProfile.lastName}</p>
          <p className="text-content-tertiary text-body">{displayedProfile.email}</p>
        </div>
      </div>

      <Form form={form} onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input name="firstName" label="First name" placeholder="Jane" fullWidth />
          <Input name="lastName" label="Last name" placeholder="Smith" fullWidth />
        </div>
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          fullWidth
        />
        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            disabled={!isDirty || isSubmitting}
          >
            Save changes
          </Button>
          {serverError && (
            <p className="text-sm text-red-600">{serverError}</p>
          )}
        </div>
      </Form>
    </div>
  )
}
