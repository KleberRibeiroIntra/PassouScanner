import { FormServerError } from '@/components/form/FormServerError'
import { FormTextField } from '@/components/form/FormTextField'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import type { ServerForm } from '@/hooks/useServerForm'
import type { UserFormValues } from './userSchema'

interface UserFormViewProps extends ServerForm<UserFormValues> {
  isEdit: boolean
  onCancel: () => void
}

export function UserFormView({ form, submit, serverError, isSubmitting, isEdit, onCancel }: UserFormViewProps) {
  return (
    <form onSubmit={submit} noValidate>
      <FieldGroup>
        <FormServerError message={serverError} />
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
          <Button type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}
