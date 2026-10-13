import { Button, Group, Stack } from '@mantine/core'
import { FormServerError } from '@/components/form/FormServerError'
import { FormTextField } from '@/components/form/FormTextField'
import type { ServerForm } from '@/hooks/useServerForm'
import type { UserFormValues } from './userSchema'

interface UserFormViewProps extends ServerForm<UserFormValues> {
  isEdit: boolean
  onCancel: () => void
}

export function UserFormView({ form, submit, serverError, isSubmitting, isEdit, onCancel }: UserFormViewProps) {
  return (
    <form onSubmit={submit} noValidate>
      <Stack>
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
        <Group justify="flex-end">
          <Button variant="default" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Salvar
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
