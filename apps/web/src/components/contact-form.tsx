'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

import {
  submitContact,
  type ContactFormState,
} from '@/app/actions/contact'

const initialContactFormState: ContactFormState = {
  status: 'idle',
  message: '',
  errors: {},
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-foreground px-4 py-2 font-medium text-background text-sm transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? 'Sending...' : 'Send message'}
    </button>
  )
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null

  return (
    <p className="mt-1 text-red-700 text-sm" role="alert">
      {errors[0]}
    </p>
  )
}

export function ContactForm() {
  const [state, formAction] = useActionState(
    submitContact,
    initialContactFormState,
  )

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="font-medium text-sm" htmlFor="name">
          Name
        </label>
        <input
          aria-describedby={state.errors.name ? 'name-error' : undefined}
          aria-invalid={Boolean(state.errors.name)}
          className="mt-2 block w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          id="name"
          name="name"
          type="text"
        />
        <div id="name-error">
          <FieldError errors={state.errors.name} />
        </div>
      </div>

      <div>
        <label className="font-medium text-sm" htmlFor="email">
          Email
        </label>
        <input
          aria-describedby={state.errors.email ? 'email-error' : undefined}
          aria-invalid={Boolean(state.errors.email)}
          className="mt-2 block w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          id="email"
          name="email"
          type="email"
        />
        <div id="email-error">
          <FieldError errors={state.errors.email} />
        </div>
      </div>

      <div>
        <label className="font-medium text-sm" htmlFor="message">
          Message
        </label>
        <textarea
          aria-describedby={state.errors.message ? 'message-error' : undefined}
          aria-invalid={Boolean(state.errors.message)}
          className="mt-2 block min-h-32 w-full resize-y rounded-md border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          id="message"
          name="message"
        />
        <div id="message-error">
          <FieldError errors={state.errors.message} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p
          className={
            state.status === 'success'
              ? 'text-green-700 text-sm'
              : 'text-muted-foreground text-sm'
          }
          role={state.status === 'idle' ? undefined : 'status'}
        >
          {state.message}
        </p>
        <SubmitButton />
      </div>
    </form>
  )
}