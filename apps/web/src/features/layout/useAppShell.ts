import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { authApi } from '@/api/authApi'

export function useAppShell() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data: me } = useQuery({ queryKey: ['auth', 'me'], queryFn: authApi.me })
  const { setColorScheme } = useMantineColorScheme()
  const colorScheme = useComputedColorScheme('dark')

  const logout = async () => {
    authApi.logout()
    queryClient.clear()
    await navigate({ to: '/login' })
  }

  return {
    userName: me?.name,
    logout,
    colorScheme,
    toggleColorScheme: () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark'),
  }
}
