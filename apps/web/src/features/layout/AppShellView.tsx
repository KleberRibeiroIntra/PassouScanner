import type { ReactNode } from 'react'
import { ActionIcon, AppShell, Button, Container, Group, Text } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { LogOut, Moon, Sun } from 'lucide-react'
import classes from './AppShellView.module.css'

interface AppShellViewProps {
  userName?: string
  logout: () => void
  colorScheme: 'light' | 'dark'
  toggleColorScheme: () => void
  children: ReactNode
}

export function AppShellView({ userName, logout, colorScheme, toggleColorScheme, children }: AppShellViewProps) {
  const isDark = colorScheme === 'dark'

  return (
    <AppShell header={{ height: 56 }} padding="md">
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group h="100%" gap="lg">
            <Link to="/" className={classes.brand}>
              Passou o Scanner
            </Link>
            <Group component="nav" gap="md">
              <Link to="/" activeOptions={{ exact: true }} className={classes.navLink}>
                Início
              </Link>
              <Link to="/users" className={classes.navLink}>
                Usuários
              </Link>
            </Group>
            <Group ml="auto" gap="sm">
              {userName && (
                <Text size="sm" c="dimmed">
                  {userName}
                </Text>
              )}
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={toggleColorScheme}
                aria-label={isDark ? 'Usar tema claro' : 'Usar tema escuro'}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </ActionIcon>
              <Button variant="subtle" color="gray" size="xs" leftSection={<LogOut size={14} />} onClick={logout}>
                Sair
              </Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>
      <AppShell.Main>
        <Container size="lg">{children}</Container>
      </AppShell.Main>
    </AppShell>
  )
}
