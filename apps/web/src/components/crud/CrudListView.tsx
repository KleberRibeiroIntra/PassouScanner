import type { ReactNode } from 'react'
import { ActionIcon, Alert, Button, Card, Group, Modal, Stack, Table, Text, TextInput, Title } from '@mantine/core'
import { Pencil, Plus, Search, Trash2 } from 'lucide-react'
import type { BaseEntity } from '@/types/BaseEntity'
import type { CrudListPage } from './useCrudListPage'

export interface CrudColumn<T> {
  header: string
  cell: (item: T) => ReactNode
  width?: number | string
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
      <Group justify="space-between" mb="md">
        <Title order={3}>{title}</Title>
        <Button leftSection={<Plus size={16} />} onClick={onNew}>
          Novo
        </Button>
      </Group>

      <Stack>
        {searchEnabled && (
          <form onSubmit={submitSearch} role="search">
            <Group gap="xs">
              <TextInput
                flex={1}
                value={searchInput}
                onChange={(event) => setSearchInput(event.currentTarget.value)}
                placeholder="Buscar..."
                aria-label="Buscar"
              />
              <Button type="submit" variant="default" leftSection={<Search size={16} />}>
                Buscar
              </Button>
            </Group>
          </form>
        )}

        {errorMessage ? (
          <Alert color="red" variant="light">
            {errorMessage}
          </Alert>
        ) : (
          <Table striped highlightOnHover opacity={isStale ? 0.6 : 1}>
            <Table.Thead>
              <Table.Tr>
                {columns.map((column) => (
                  <Table.Th key={column.header} w={column.width}>
                    {column.header}
                  </Table.Th>
                ))}
                <Table.Th w={96} ta="right">
                  Ações
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {isPending ? (
                <Table.Tr>
                  <Table.Td colSpan={colSpan} ta="center" c="dimmed">
                    Carregando...
                  </Table.Td>
                </Table.Tr>
              ) : items.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={colSpan} ta="center" c="dimmed">
                    Nenhum registro encontrado.
                  </Table.Td>
                </Table.Tr>
              ) : (
                items.map((item) => (
                  <Table.Tr key={item.id}>
                    {columns.map((column) => (
                      <Table.Td key={column.header}>{column.cell(item)}</Table.Td>
                    ))}
                    <Table.Td>
                      <Group gap={4} justify="flex-end" wrap="nowrap">
                        <ActionIcon variant="subtle" color="gray" aria-label={`Editar ${describe(item)}`} onClick={() => onEdit(item)}>
                          <Pencil size={16} />
                        </ActionIcon>
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          aria-label={`Excluir ${describe(item)}`}
                          onClick={() => requestDelete(item)}
                        >
                          <Trash2 size={16} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        )}
      </Stack>

      <Group justify="space-between" mt="md">
        <Text size="sm" c="dimmed">
          {totalRows} {totalRows === 1 ? 'registro' : 'registros'}
        </Text>
        <Group gap="xs">
          <Button variant="default" size="xs" disabled={!canGoPrevious} onClick={goToPrevious}>
            Anterior
          </Button>
          <Text size="sm" c="dimmed">
            Página {page + 1} de {totalPages}
          </Text>
          <Button variant="default" size="xs" disabled={!canGoNext} onClick={goToNext}>
            Próxima
          </Button>
        </Group>
      </Group>

      <Modal opened={itemToDelete !== null} onClose={cancelDelete} title="Excluir registro?" centered>
        <Text size="sm">{itemToDelete && `${describe(itemToDelete)} será excluído.`}</Text>
        <Group justify="flex-end" mt="lg">
          <Button variant="default" onClick={cancelDelete}>
            Cancelar
          </Button>
          <Button color="red" onClick={confirmDelete} loading={isDeleting}>
            Excluir
          </Button>
        </Group>
      </Modal>
    </Card>
  )
}
