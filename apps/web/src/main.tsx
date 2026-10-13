import '@fontsource-variable/inter'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './styles/global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { queryClient, router } from './router'
import { cssVariablesResolver, theme } from './theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} cssVariablesResolver={cssVariablesResolver} defaultColorScheme="dark">
      <Notifications position="top-right" />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>,
)
