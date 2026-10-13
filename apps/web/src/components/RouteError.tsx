import { Alert, Button, Container, Group, Stack } from '@mantine/core'
import { Link, type ErrorComponentProps } from '@tanstack/react-router'
import { ApiError } from '@/api/client'

export function RouteError({ error, reset }: ErrorComponentProps) {
  const notFound = error instanceof ApiError && error.status === 404

  return (
    <Container size="sm" py="md">
      <Stack>
        <Alert color="red" variant="light" title={notFound ? 'Registro não encontrado' : 'Algo deu errado'}>
          {notFound ? 'O registro pode ter sido excluído.' : error instanceof Error ? error.message : String(error)}
        </Alert>
        <Group>
          <Button variant="default" component={Link} to="/">
            Voltar ao início
          </Button>
          {!notFound && <Button onClick={reset}>Tentar de novo</Button>}
        </Group>
      </Stack>
    </Container>
  )
}
