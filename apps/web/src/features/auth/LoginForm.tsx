import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormTextField } from '@/components/form/FormTextField'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { withServerErrors } from '@/lib/formErrors'
import { loginSchema, type LoginFormValues } from './loginSchema'

export function LoginForm({ onSubmit }: { onSubmit: (values: LoginFormValues) => Promise<unknown> }) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
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
        <FormTextField control={form.control} name="email" label="E-mail" type="email" autoComplete="email" />
        <FormTextField control={form.control} name="password" label="Senha" type="password" autoComplete="current-password" />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Entrar
        </Button>
      </FieldGroup>
    </form>
  )
}
