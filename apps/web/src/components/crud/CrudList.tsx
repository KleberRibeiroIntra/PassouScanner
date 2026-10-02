import { useState, type FormEvent, type ReactNode } from 'react'
import { Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import type { CrudApi } from '@/api/createCrudApi'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCrudList, useCrudMutations } from '@/hooks/useCrud'
import type { BaseEntity } from '@/types/BaseEntity'
import { FilterCondition, type DynamicQuery, type PropertySort } from '@/types/DynamicQuery'

export interface CrudColumn<T> {
  header: string
  cell: (item: T) => ReactNode
  className?: string
}

export interface CrudListState {
  page?: number
  search?: string
}

interface CrudListProps<TEntity extends BaseEntity, TRequest> extends CrudListState {
  title: string
  api: CrudApi<TEntity, TRequest>
  columns: CrudColumn<TEntity>[]
  searchField?: keyof TEntity & string
  orderBy?: PropertySort[]
  pageSize?: number
  describe: (item: TEntity) => string
  onStateChange: (state: CrudListState) => void
  onNew: () => void
  onEdit: (item: TEntity) => void
}

export function CrudList<TEntity extends BaseEntity, TRequest>({
  title,
  api,
  columns,
  searchField,
  orderBy,
  pageSize = 20,
  page = 0,
  search = '',
  describe,
  onStateChange,
  onNew,
  onEdit,
}: CrudListProps<TEntity, TRequest>) {
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

  const handleSearch = (event: FormEvent) => {
    event.preventDefault()
    onStateChange({ page: undefined, search: searchInput.trim() || undefined })
  }

  const handleDelete = async () => {
    if (!itemToDelete) return
    try {
      await remove.mutateAsync(itemToDelete.id)
      toast.success(`${describe(itemToDelete)} excluído.`)
      if (items.length === 1 && page > 0) onStateChange({ page: page - 1, search: search || undefined })
    } catch {
      toast.error(`Não foi possível excluir ${describe(itemToDelete)}.`)
    } finally {
      setItemToDelete(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardAction>
          <Button onClick={onNew}>
            <Plus /> Novo
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {searchField && (
          <form onSubmit={handleSearch} className="flex gap-2" role="search">
            <Input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Buscar..."
              aria-label="Buscar"
            />
            <Button type="submit" variant="outline">
              <Search /> Buscar
            </Button>
          </form>
        )}

        {isError ? (
          <Alert variant="destructive">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ) : (
          <Table className={isPlaceholderData ? 'opacity-60' : undefined}>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.header} className={column.className}>
                    {column.header}
                  </TableHead>
                ))}
                <TableHead className="w-24 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center text-muted-foreground">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center text-muted-foreground">
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id}>
                    {columns.map((column) => (
                      <TableCell key={column.header} className={column.className}>
                        {column.cell(item)}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon-sm" aria-label={`Editar ${describe(item)}`} onClick={() => onEdit(item)}>
                        <Pencil />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Excluir ${describe(item)}`}
                        onClick={() => setItemToDelete(item)}
                      >
                        <Trash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <CardFooter className="justify-between text-sm text-muted-foreground">
        <span>
          {totalRows} {totalRows === 1 ? 'registro' : 'registros'}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => onStateChange({ page: page - 1 || undefined, search: search || undefined })}
          >
            Anterior
          </Button>
          <span>
            Página {page + 1} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page + 1 >= totalPages}
            onClick={() => onStateChange({ page: page + 1, search: search || undefined })}
          >
            Próxima
          </Button>
        </div>
      </CardFooter>

      <AlertDialog open={itemToDelete !== null} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir registro?</AlertDialogTitle>
            <AlertDialogDescription>
              {itemToDelete && `${describe(itemToDelete)} será excluído.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDelete} disabled={remove.isPending}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
