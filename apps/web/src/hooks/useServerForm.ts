import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type DefaultValues, type FieldValues } from 'react-hook-form'
import type { z } from 'zod'
import { withServerErrors } from '@/lib/formErrors'

interface UseServerFormOptions<T extends FieldValues> {
  schema: z.ZodType<T, T>
  defaultValues: DefaultValues<T>
  onSubmit: (values: T) => Promise<unknown>
}

export function useServerForm<T extends FieldValues>({ schema, defaultValues, onSubmit }: UseServerFormOptions<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const submit = form.handleSubmit((values) => withServerErrors(form, () => onSubmit(values)))

  return {
    form,
    submit,
    serverError: form.formState.errors.root?.server?.message,
    isSubmitting: form.formState.isSubmitting,
  }
}

export type ServerForm<T extends FieldValues> = ReturnType<typeof useServerForm<T>>
