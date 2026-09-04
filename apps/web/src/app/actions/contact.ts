'use server'

import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters.'),
  email: z.string().trim().email('Enter a valid email address.'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters.')
    .max(1000, 'Message must be 1000 characters or fewer.'),
})

export type ContactFormState =
  | {
      status: 'idle'
      message: ''
      errors: Partial<Record<'name' | 'email' | 'message', string[]>>
    }
  | {
      status: 'error'
      message: string
      errors: Partial<Record<'name' | 'email' | 'message', string[]>>
    }
  | {
      status: 'success'
      message: string
      errors: Record<string, never>
    }

export const initialContactFormState: ContactFormState = {
  status: 'idle',
  message: '',
  errors: {},
}

export async function submitContact(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const result = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!result.success) {
    return {
      status: 'error',
      message: 'Please correct the highlighted fields.',
      errors: result.error.flatten().fieldErrors,
    }
  }

  return {
    status: 'success',
    message: `Thanks, ${result.data.name}. Your message has been received.`,
    errors: {},
  }
}