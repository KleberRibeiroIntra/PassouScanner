import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { tokenStorage } from '@/api/tokenStorage'
import { AppShellView } from '@/features/layout/AppShellView'
import { useAppShell } from '@/features/layout/useAppShell'

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ location }) => {
    if (!tokenStorage.get()) throw redirect({ to: '/login', search: { redirect: location.href } })
  },
  component: AppLayout,
})

function AppLayout() {
  const appShell = useAppShell()

  return (
    <AppShellView {...appShell}>
      <Outlet />
    </AppShellView>
  )
}
