import { Card, Text, Title } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/')({
  component: HomePage,
})

function HomePage() {
  return (
    <Card>
      <Title order={3}>Bem-vindo ao Passou o Scanner</Title>
      <Text c="dimmed" size="sm" mt={4}>
        Controle das peças trocadas e de quanto cada uma durou.
      </Text>
    </Card>
  )
}
