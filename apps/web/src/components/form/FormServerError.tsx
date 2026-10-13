import { Alert } from '@mantine/core'

export function FormServerError({ message }: { message?: string }) {
  if (!message) return null

  return (
    <Alert color="red" variant="light">
      {message}
    </Alert>
  )
}
