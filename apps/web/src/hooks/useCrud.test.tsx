import type { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import { createCrudApi } from '@/api/createCrudApi'
import { createTestQueryClient } from '@/test/utils'
import { useCrudList, useCrudMutations } from './useCrud'

type Thing = { id: string; createdAt: string; updatedAt: null; active: boolean; name: string }

function setup() {
  const api = createCrudApi<Thing, { name: string }>('Thing')
  const things: Thing[] = [{ id: '1', createdAt: '', updatedAt: null, active: true, name: 'Primeiro' }]

  vi.spyOn(api, 'getPaged').mockImplementation(async () => ({
    pageSize: 20,
    pageNumber: 0,
    totalRows: things.length,
    result: [...things],
  }))
  vi.spyOn(api, 'create').mockImplementation(async (data) => {
    const created = { id: String(things.length + 1), createdAt: '', updatedAt: null, active: true, ...data }
    things.push(created)
    return created
  })

  const queryClient = createTestQueryClient()
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  return { api, wrapper }
}

describe('useCrud', () => {
  it('lista e recarrega a lista depois de criar', async () => {
    const { api, wrapper } = setup()

    const list = renderHook(() => useCrudList(api, { pageNumber: 0 }), { wrapper })
    const mutations = renderHook(() => useCrudMutations(api), { wrapper })

    await waitFor(() => expect(list.result.current.data?.totalRows).toBe(1))

    await act(() => mutations.result.current.create.mutateAsync({ name: 'Segundo' }))

    await waitFor(() => expect(list.result.current.data?.result.map((t) => t.name)).toEqual(['Primeiro', 'Segundo']))
    expect(api.getPaged).toHaveBeenCalledTimes(2)
  })
})
