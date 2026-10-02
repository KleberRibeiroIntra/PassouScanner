import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().trim().min(1, 'Informe o nome.').max(200, 'Use no máximo 200 caracteres.'),
  email: z.email('Informe um e-mail válido.').max(320, 'Use no máximo 320 caracteres.'),
  password: z.string(),
})

export function createUserSchema(isEdit: boolean) {
  return userSchema.refine((values) => isEdit || values.password.length > 0, {
    message: 'Informe a senha.',
    path: ['password'],
  })
}

export type UserFormValues = z.infer<typeof userSchema>
