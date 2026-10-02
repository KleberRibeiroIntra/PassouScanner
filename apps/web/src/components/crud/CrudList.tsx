import type { BaseEntity } from '@/types/BaseEntity'
import { CrudListView, type CrudColumn } from './CrudListView'
import { useCrudListPage, type UseCrudListPageOptions } from './useCrudListPage'

export type { CrudColumn } from './CrudListView'
export type { CrudListState } from './useCrudListPage'

interface CrudListProps<TEntity extends BaseEntity, TRequest> extends UseCrudListPageOptions<TEntity, TRequest> {
  title: string
  columns: CrudColumn<TEntity>[]
  onNew: () => void
  onEdit: (item: TEntity) => void
}

export function CrudList<TEntity extends BaseEntity, TRequest>({
  title,
  columns,
  onNew,
  onEdit,
  ...options
}: CrudListProps<TEntity, TRequest>) {
  const listPage = useCrudListPage(options)

  return (
    <CrudListView
      {...listPage}
      title={title}
      columns={columns}
      describe={options.describe}
      onNew={onNew}
      onEdit={onEdit}
    />
  )
}
