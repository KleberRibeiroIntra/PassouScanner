import { createFileRoute } from '@tanstack/react-router'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/_app/')({
  component: HomePage,
})

function HomePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Bem-vindo ao PassouScanner</CardTitle>
        <CardDescription>Controle das peças trocadas e de quanto cada uma durou.</CardDescription>
      </CardHeader>
    </Card>
  )
}
