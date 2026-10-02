import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import type { CrudApi } from '@/api/createCrudApi'
import { useCrudList, useCrudMutations } from '@/hooks/useCrud'
import type { BaseEntity } from '@/types/BaseEntity'
import { FilterCondition, type DynamicQuery, type PropertySort } from '@/types/DynamicQuery'

export interface CrudListState {
  page?: number
  search?: string
}

export interface UseCrudListPageOptions<TEntity extends BaseEntity, TRequest> extends CrudListState {
  api: CrudApi<TEntity, TRequest>
  searchField?: keyof TEntity & string
  orderBy?: PropertySort[]
  pageSize?: number
  describe: (item: TEntity) => string
  onStateChange: (state: CrudListState) => void
}

export function useCrudListPage<TEntity extends BaseEntity, TRequest>({
  api,
  searchField,
  orderBy,
  pageSize = 20,
  page = 0,
  search = '',
  describe,
  onStateChange,
}: UseCrudListPageOptions<TEntity, TRequest>) {
  const [searchInput, setSearchInput] = useState(search)
  const [itemToDelete, setItemToDelete] = useState<TEntity | null>(null)

  const query: DynamicQuery = {
    pageNumber: page,
    pageSize,
    orderBy,
    filter: searchField && search ? [{ name: searchField, condition: FilterCondition.Contains, value: search }] : undefined,
  }

  const { data, isPending, isError, error, isPlaceholderData } = useCrudList(api, query)
  const { remove } = useCrudMutations(api)

  const items = data?.result ?? []
  const totalRows = data?.totalRows ?? 0
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize))
  const currentSearch = search || undefined

  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    onStateChange({ page: undefined, search: searchInput.trim() || undefined })
  }

  const confirmDelete = async () => {
    if (!itemToDelete) return
    try {
      await remove.mutateAsync(itemToDelete.id)
      toast.success(`${describe(itemToDelete)} excluído.`)
      if (items.length === 1 && page > 0) onStateChange({ page: page - 1 || undefined, search: currentSearch })
    } catch {
      toast.error(`Não foi possível excluir ${describe(itemToDelete)}.`)
    } finally {
      setItemToDelete(null)
    }
  }

  return {
    items,
    totalRows,
    page,
    totalPages,
    isPending,
    isStale: isPlaceholderData,
    errorMessage: isError ? error.message : undefined,
    searchEnabled: searchField !== undefined,
    searchInput,
    setSearchInput,
    submitSearch,
    canGoPrevious: page > 0,
    canGoNext: page + 1 < totalPages,
    goToPrevious: () => onStateChange({ page: page - 1 || undefined, search: currentSearch }),
    goToNext: () => onStateChange({ page: page + 1, search: currentSearch }),
    itemToDelete,
    requestDelete: setItemToDelete,
    cancelDelete: () => setItemToDelete(null),
    confirmDelete,
    isDeleting: remove.isPending,
  }
}

export type CrudListPage<TEntity extends BaseEntity> = ReturnType<typeof useCrudListPage<TEntity, unknown>>
