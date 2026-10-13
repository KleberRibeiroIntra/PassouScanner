import { Card, Center, Title } from '@mantine/core'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import { authApi } from '@/api/authApi'
import { tokenStorage } from '@/api/tokenStorage'
import { LoginForm } from '@/features/auth/LoginForm'

const loginSearchSchema = z.object({
  redirect: z
    .string()
    .refine((value) => value.startsWith('/') && !value.startsWith('//'))
    .optional()
    .catch(undefined),
})

export const LoginPage = () => {
  const { redirect: redirectTo } = Route.useSearch()
  const navigate = useNavigate()

  return (
    <Center component="main" mih="100svh" bg="var(--app-bg)" p="md">
      <Card w="100%" maw={380}>
        <Title order={3} mb="md">
          Passou o Scanner?
        </Title>
        <LoginForm
          onSubmit={async (values) => {
            await authApi.login(values)
            await navigate({ href: redirectTo ?? '/' })
          }}
        />
      </Card>
    </Center>
  )
}

export const Route = createFileRoute('/login')({
  validateSearch: loginSearchSchema,
  beforeLoad: ({ search }) => {
    if (tokenStorage.get()) throw redirect({ href: search.redirect ?? '/' })
  },
  component: LoginPage,
})