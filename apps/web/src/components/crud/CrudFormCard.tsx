import type { ReactNode } from 'react'
import { Card, Title } from '@mantine/core'

export function CrudFormCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card maw={560} mx="auto" w="100%">
      <Title order={3} mb="md">
        {title}
      </Title>
      {children}
    </Card>
  )
}
