import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormTextField } from '@/components/form/FormTextField'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { withServerErrors } from '@/lib/formErrors'
import { createUserSchema, type UserFormValues } from './userSchema'

interface UserFormProps {
  defaultValues?: UserFormValues
  isEdit?: boolean
  onSubmit: (values: UserFormValues) => Promise<unknown>
  onCancel: () => void
}

const emptyValues: UserFormValues = { name: '', email: '', password: '' }

export function UserForm({ defaultValues = emptyValues, isEdit = false, onSubmit, onCancel }: UserFormProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(createUserSchema(isEdit)),
    defaultValues,
  })

  const submit = form.handleSubmit((values) => withServerErrors(form, () => onSubmit(values)))

  return (
    <form onSubmit={submit} noValidate>
      <FieldGroup>
        {form.formState.errors.root?.server && (
          <Alert variant="destructive">
            <AlertDescription>{form.formState.errors.root.server.message}</AlertDescription>
          </Alert>
        )}
        <FormTextField control={form.control} name="name" label="Nome" autoComplete="name" />
        <FormTextField control={form.control} name="email" label="E-mail" type="email" autoComplete="email" />
        <FormTextField
          control={form.control}
          name="password"
          label="Senha"
          type="password"
          autoComplete="new-password"
          description={isEdit ? 'Deixe em branco para manter a senha atual.' : undefined}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Salvar
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
