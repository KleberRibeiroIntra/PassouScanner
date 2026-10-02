import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, Outlet, createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { authApi } from '@/api/authApi'
import { tokenStorage } from '@/api/tokenStorage'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ location }) => {
    if (!tokenStorage.get()) throw redirect({ to: '/login', search: { redirect: location.href } })
  },
  component: AppLayout,
})

const navLinkClass = 'text-sm text-muted-foreground hover:text-foreground data-[status=active]:font-medium data-[status=active]:text-foreground'

function AppLayout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data: me } = useQuery({ queryKey: ['auth', 'me'], queryFn: authApi.me })

  const logout = async () => {
    authApi.logout()
    queryClient.clear()
    await navigate({ to: '/login' })
  }

  return (
    <div className="min-h-svh bg-muted/40">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4">
          <Link to="/" className="font-semibold">
            PassouScanner
          </Link>
          <nav className="flex gap-4">
            <Link to="/" activeOptions={{ exact: true }} className={navLinkClass}>
              Início
            </Link>
            <Link to="/users" className={navLinkClass}>
              Usuários
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            {me && <span className="text-sm text-muted-foreground">{me.name}</span>}
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut /> Sair
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl p-4">
        <Outlet />
      </main>
    </div>
  )
}
