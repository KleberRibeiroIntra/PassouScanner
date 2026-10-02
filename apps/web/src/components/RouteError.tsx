import { Link, type ErrorComponentProps } from '@tanstack/react-router'
import { ApiError } from '@/api/client'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

export function RouteError({ error, reset }: ErrorComponentProps) {
  const notFound = error instanceof ApiError && error.status === 404

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4 p-4">
      <Alert variant="destructive">
        <AlertTitle>{notFound ? 'Registro não encontrado' : 'Algo deu errado'}</AlertTitle>
        <AlertDescription>
          {notFound ? 'O registro pode ter sido excluído.' : error instanceof Error ? error.message : String(error)}
        </AlertDescription>
      </Alert>
      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link to="/">Voltar ao início</Link>
        </Button>
        {!notFound && <Button onClick={reset}>Tentar de novo</Button>}
      </div>
    </div>
  )
}
