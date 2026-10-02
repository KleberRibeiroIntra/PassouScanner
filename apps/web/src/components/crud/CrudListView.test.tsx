import type { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CrudListView } from './CrudListView'

type Thing = { id: string; createdAt: string; updatedAt: null; active: boolean; name: string }

const thing: Thing = { id: '1', createdAt: '', updatedAt: null, active: true, name: 'Óleo do motor' }

function renderView(overrides: Partial<ComponentProps<typeof CrudListView<Thing>>> = {}) {
  const props: ComponentProps<typeof CrudListView<Thing>> = {
    title: 'Peças',
    columns: [{ header: 'Nome', cell: (item) => item.name }],
    describe: (item) => item.name,
    onNew: vi.fn(),
    onEdit: vi.fn(),
    items: [thing],
    totalRows: 1,
    page: 0,
    totalPages: 1,
    isPending: false,
    isStale: false,
    errorMessage: undefined,
    searchEnabled: true,
    searchInput: '',
    setSearchInput: vi.fn(),
    submitSearch: vi.fn(),
    canGoPrevious: false,
    canGoNext: false,
    goToPrevious: vi.fn(),
    goToNext: vi.fn(),
    itemToDelete: null,
    requestDelete: vi.fn(),
    cancelDelete: vi.fn(),
    confirmDelete: vi.fn(),
    isDeleting: false,
    ...overrides,
  }
  render(<CrudListView {...props} />)
  return props
}

describe('CrudListView', () => {
  it('desenha só o que recebe, sem API nem cache', () => {
    renderView({ page: 1, totalPages: 3, canGoPrevious: true, canGoNext: true, totalRows: 41 })

    expect(screen.getByText('Óleo do motor')).toBeInTheDocument()
    expect(screen.getByText('41 registros')).toBeInTheDocument()
    expect(screen.getByText('Página 2 de 3')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeEnabled()
  })

  it('mostra o erro no lugar da tabela', () => {
    renderView({ errorMessage: 'Falha ao carregar.' })

    expect(screen.getByText('Falha ao carregar.')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('repassa as ações para quem controla a tela', async () => {
    const props = renderView({ canGoNext: true })

    await userEvent.click(screen.getByRole('button', { name: 'Excluir Óleo do motor' }))
    await userEvent.click(screen.getByRole('button', { name: 'Próxima' }))

    expect(props.requestDelete).toHaveBeenCalledWith(thing)
    expect(props.goToNext).toHaveBeenCalled()
  })
})
