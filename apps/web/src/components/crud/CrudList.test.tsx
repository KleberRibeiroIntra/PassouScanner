import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createCrudApi } from '@/api/createCrudApi'
import { renderWithQuery } from '@/test/utils'
import { FilterCondition } from '@/types/DynamicQuery'
import { CrudList, type CrudColumn } from './CrudList'

type Thing = { id: string; createdAt: string; updatedAt: null; active: boolean; name: string }

const columns: CrudColumn<Thing>[] = [{ header: 'Nome', cell: (thing) => thing.name }]

function setup(props: { page?: number; search?: string } = {}) {
  const api = createCrudApi<Thing, { name: string }>('Thing')
  let things: Thing[] = [
    { id: '1', createdAt: '', updatedAt: null, active: true, name: 'Óleo do motor' },
    { id: '2', createdAt: '', updatedAt: null, active: true, name: 'Pastilha de freio' },
  ]

  const getPaged = vi.spyOn(api, 'getPaged').mockImplementation(async () => ({
    pageSize: 20,
    pageNumber: 0,
    totalRows: things.length,
    result: [...things],
  }))
  const remove = vi.spyOn(api, 'remove').mockImplementation(async (id) => {
    things = things.filter((thing) => thing.id !== id)
  })

  const onStateChange = vi.fn()
  const onEdit = vi.fn()

  renderWithQuery(
    <CrudList
      title="Peças"
      api={api}
      columns={columns}
      searchField="name"
      describe={(thing) => thing.name}
      onStateChange={onStateChange}
      onNew={() => {}}
      onEdit={onEdit}
      {...props}
    />,
  )

  return { getPaged, remove, onStateChange, onEdit }
}

describe('CrudList', () => {
  it('lista os registros e o total', async () => {
    setup()

    expect(await screen.findByText('Óleo do motor')).toBeInTheDocument()
    expect(screen.getByText('Pastilha de freio')).toBeInTheDocument()
    expect(screen.getByText('2 registros')).toBeInTheDocument()
  })

  it('monta o filtro Contains a partir da busca', async () => {
    const { getPaged } = setup({ search: 'freio' })

    await screen.findByText('Óleo do motor')

    expect(getPaged).toHaveBeenCalledWith(
      expect.objectContaining({ filter: [{ name: 'name', condition: FilterCondition.Contains, value: 'freio' }] }),
    )
  })

  it('envia a busca digitada e volta para a primeira página', async () => {
    const { onStateChange } = setup({ page: 3 })

    await userEvent.type(screen.getByRole('textbox', { name: 'Buscar' }), ' óleo ')
    await userEvent.click(screen.getByRole('button', { name: 'Buscar' }))

    expect(onStateChange).toHaveBeenCalledWith({ page: undefined, search: 'óleo' })
  })

  it('chama a edição com o registro da linha', async () => {
    const { onEdit } = setup()

    await userEvent.click(await screen.findByRole('button', { name: 'Editar Óleo do motor' }))

    expect(onEdit).toHaveBeenCalledWith(expect.objectContaining({ id: '1' }))
  })

  it('exclui depois de confirmar e atualiza a lista', async () => {
    const { remove } = setup()

    await userEvent.click(await screen.findByRole('button', { name: 'Excluir Pastilha de freio' }))
    const dialog = await screen.findByRole('alertdialog')
    expect(remove).not.toHaveBeenCalled()

    await userEvent.click(within(dialog).getByRole('button', { name: 'Excluir' }))

    expect(remove).toHaveBeenCalledWith('2')
    await waitFor(() => expect(screen.queryByText('Pastilha de freio')).not.toBeInTheDocument())
    expect(screen.getByText('1 registro')).toBeInTheDocument()
  })
})
