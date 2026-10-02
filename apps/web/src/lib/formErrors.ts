import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { ApiError } from '@/api/client'

export async function withServerErrors<T extends FieldValues>(form: UseFormReturn<T>, action: () => Promise<unknown>) {
  try {
    await action()
  } catch (error) {
    if (!(error instanceof ApiError)) {
      form.setError('root.server', { message: 'Erro inesperado. Tente novamente.' })
      return
    }

    const entries = Object.entries(error.errors)
    if (entries.length === 0) {
      form.setError('root.server', { message: error.message })
      return
    }

    const values = form.getValues()
    for (const [key, messages] of entries) {
      const field = key.charAt(0).toLowerCase() + key.slice(1)
      if (field in values) form.setError(field as Path<T>, { message: messages[0] })
      else form.setError('root.server', { message: messages[0] })
    }
  }
}
