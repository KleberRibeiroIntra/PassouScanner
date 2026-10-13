import { Button, Stack } from '@mantine/core'
import { FormServerError } from '@/components/form/FormServerError'
import { FormTextField } from '@/components/form/FormTextField'
import type { ServerForm } from '@/hooks/useServerForm'
import type { LoginFormValues } from './loginSchema'

export function LoginFormView({ form, submit, serverError, isSubmitting }: ServerForm<LoginFormValues>) {
  return (
    <form onSubmit={submit} noValidate>
      <Stack>
        <FormServerError message={serverError} />
        <FormTextField control={form.control} name="email" label="E-mail" type="email" autoComplete="email" />
        <FormTextField control={form.control} name="password" label="Senha" type="password" autoComplete="current-password" />
        <Button type="submit" loading={isSubmitting}>
          Entrar
        </Button>
      </Stack>
    </form>
  )
}
