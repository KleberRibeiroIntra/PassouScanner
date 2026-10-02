import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import type { BaseEntity } from '@/types/BaseEntity'
import type { DynamicQuery, DynamicQueryResult } from '@/types/DynamicQuery'
import { request } from './client'

export function createCrudApi<TEntity extends BaseEntity, TRequest>(resource: string) {
  const api = {
    resource,
    getPaged: (query: DynamicQuery = {}) =>
      request<DynamicQueryResult<TEntity>>('GET', `/${resource}/paged`, undefined, {
        pageNumber: query.pageNumber,
        pageSize: query.pageSize,
        operator: query.operator,
        filterString: query.filter?.length ? JSON.stringify(query.filter) : undefined,
        orderByString: query.orderBy?.length ? JSON.stringify(query.orderBy) : undefined,
      }),
    getById: (id: string) => request<TEntity>('GET', `/${resource}/${id}`),
    create: (data: TRequest) => request<TEntity>('POST', `/${resource}`, data),
    update: (id: string, data: TRequest) => request<TEntity>('PUT', `/${resource}/${id}`, data),
    remove: (id: string) => request<void>('DELETE', `/${resource}/${id}`),
    listQuery: (query: DynamicQuery = {}) =>
      queryOptions({
        queryKey: [resource, 'list', query],
        queryFn: () => api.getPaged(query),
        placeholderData: keepPreviousData,
      }),
    detailQuery: (id: string) =>
      queryOptions({
        queryKey: [resource, 'detail', id],
        queryFn: () => api.getById(id),
      }),
  }

  return api
}

export type CrudApi<TEntity extends BaseEntity, TRequest> = ReturnType<typeof createCrudApi<TEntity, TRequest>>
