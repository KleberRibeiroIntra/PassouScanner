import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { authApi } from '@/api/authApi'

export function useAppShell() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data: me } = useQuery({ queryKey: ['auth', 'me'], queryFn: authApi.me })

  const logout = async () => {
    authApi.logout()
    queryClient.clear()
    await navigate({ to: '/login' })
  }

  return { userName: me?.name, logout }
}
