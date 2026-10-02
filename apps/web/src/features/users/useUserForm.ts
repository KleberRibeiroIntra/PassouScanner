import { useServerForm } from '@/hooks/useServerForm'
import { createUserSchema, type UserFormValues } from './userSchema'

export interface UseUserFormOptions {
  defaultValues?: UserFormValues
  isEdit?: boolean
  onSubmit: (values: UserFormValues) => Promise<unknown>
}

const emptyValues: UserFormValues = { name: '', email: '', password: '' }

export function useUserForm({ defaultValues = emptyValues, isEdit = false, onSubmit }: UseUserFormOptions) {
  return useServerForm({
    schema: createUserSchema(isEdit),
    defaultValues,
    onSubmit,
  })
}
