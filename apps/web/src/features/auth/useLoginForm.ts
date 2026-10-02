import { useServerForm } from '@/hooks/useServerForm'
import { loginSchema, type LoginFormValues } from './loginSchema'

export interface UseLoginFormOptions {
  onSubmit: (values: LoginFormValues) => Promise<unknown>
}

export function useLoginForm({ onSubmit }: UseLoginFormOptions) {
  return useServerForm({
    schema: loginSchema,
    defaultValues: { email: '', password: '' },
    onSubmit,
  })
}
