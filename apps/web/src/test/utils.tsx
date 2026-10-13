import type { ReactNode } from 'react'
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render as testingLibraryRender } from '@testing-library/react'
import { cssVariablesResolver, theme } from '@/theme'

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

export function TestProviders({ children, queryClient }: { children: ReactNode; queryClient?: QueryClient }) {
  const content = (
    <MantineProvider theme={theme} cssVariablesResolver={cssVariablesResolver} defaultColorScheme="dark" env="test">
      {children}
    </MantineProvider>
  )

  return queryClient ? <QueryClientProvider client={queryClient}>{content}</QueryClientProvider> : content
}

export function render(ui: ReactNode) {
  return testingLibraryRender(<TestProviders>{ui}</TestProviders>)
}

export function renderWithQuery(ui: ReactNode, queryClient = createTestQueryClient()) {
  return {
    queryClient,
    ...testingLibraryRender(<TestProviders queryClient={queryClient}>{ui}</TestProviders>),
  }
}

export function jsonResponse(body: unknown, status = 200) {
  return new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
