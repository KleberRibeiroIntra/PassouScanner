import type { ReactNode } from 'react'
import { Pencil, Plus, Search, Trash2 } from 'lucide-react'
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
import type { BaseEntity } from '@/types/BaseEntity'
import type { CrudListPage } from './useCrudListPage'

export interface CrudColumn<T> {
  header: string
  cell: (item: T) => ReactNode
  className?: string
}

interface CrudListViewProps<TEntity extends BaseEntity> extends CrudListPage<TEntity> {
  title: string
  columns: CrudColumn<TEntity>[]
  describe: (item: TEntity) => string
  onNew: () => void
  onEdit: (item: TEntity) => void
}

export function CrudListView<TEntity extends BaseEntity>({
  title,
  columns,
  describe,
  onNew,
  onEdit,
  items,
  totalRows,
  page,
  totalPages,
  isPending,
  isStale,
  errorMessage,
  searchEnabled,
  searchInput,
  setSearchInput,
  submitSearch,
  canGoPrevious,
  canGoNext,
  goToPrevious,
  goToNext,
  itemToDelete,
  requestDelete,
  cancelDelete,
  confirmDelete,
  isDeleting,
}: CrudListViewProps<TEntity>) {
  const colSpan = columns.length + 1

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
        {searchEnabled && (
          <form onSubmit={submitSearch} className="flex gap-2" role="search">
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

        {errorMessage ? (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        ) : (
          <Table className={isStale ? 'opacity-60' : undefined}>
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
                  <TableCell colSpan={colSpan} className="text-center text-muted-foreground">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={colSpan} className="text-center text-muted-foreground">
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
                        onClick={() => requestDelete(item)}
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
          <Button variant="outline" size="sm" disabled={!canGoPrevious} onClick={goToPrevious}>
            Anterior
          </Button>
          <span>
            Página {page + 1} de {totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={!canGoNext} onClick={goToNext}>
            Próxima
          </Button>
        </div>
      </CardFooter>

      <AlertDialog open={itemToDelete !== null} onOpenChange={(open) => !open && cancelDelete()}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir registro?</AlertDialogTitle>
            <AlertDialogDescription>{itemToDelete && `${describe(itemToDelete)} será excluído.`}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDelete} disabled={isDeleting}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
