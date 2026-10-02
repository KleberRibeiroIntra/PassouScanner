import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AppShellViewProps {
  userName?: string
  logout: () => void
  children: ReactNode
}

const navLinkClass =
  'text-sm text-muted-foreground hover:text-foreground data-[status=active]:font-medium data-[status=active]:text-foreground'

export function AppShellView({ userName, logout, children }: AppShellViewProps) {
  return (
    <div className="min-h-svh bg-muted/40">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4">
          <Link to="/" className="font-semibold">
            Passou o Scanner
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
            {userName && <span className="text-sm text-muted-foreground">{userName}</span>}
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut /> Sair
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl p-4">{children}</main>
    </div>
  )
}
