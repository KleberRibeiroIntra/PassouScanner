import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CrudApi } from '@/api/createCrudApi'
import type { BaseEntity } from '@/types/BaseEntity'
import type { DynamicQuery } from '@/types/DynamicQuery'

export function useCrudList<TEntity extends BaseEntity, TRequest>(api: CrudApi<TEntity, TRequest>, query: DynamicQuery) {
  return useQuery(api.listQuery(query))
}

export function useCrudMutations<TEntity extends BaseEntity, TRequest>(api: CrudApi<TEntity, TRequest>) {
  const queryClient = useQueryClient()
  const invalidate = () => queryClient.invalidateQueries({ queryKey: [api.resource] })

  const create = useMutation({
    mutationFn: (data: TRequest) => api.create(data),
    onSuccess: invalidate,
  })

  const update = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TRequest }) => api.update(id, data),
    onSuccess: invalidate,
  })

  const remove = useMutation({
    mutationFn: (id: string) => api.remove(id),
    onSuccess: invalidate,
  })

  return { create, update, remove }
}
