import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ApiError } from '@/api/client'
import { UserForm } from './UserForm'

describe('UserForm', () => {
  it('valida os campos obrigatórios no cadastro', async () => {
    const onSubmit = vi.fn()
    render(<UserForm onSubmit={onSubmit} onCancel={() => {}} />)

    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(await screen.findByText('Informe o nome.')).toBeInTheDocument()
    expect(screen.getByText('Informe um e-mail válido.')).toBeInTheDocument()
    expect(screen.getByText('Informe a senha.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('na edição a senha é opcional', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    render(
      <UserForm isEdit defaultValues={{ name: 'Kleber', email: 'k@x.com', password: '' }} onSubmit={onSubmit} onCancel={() => {}} />,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(onSubmit).toHaveBeenCalledWith({ name: 'Kleber', email: 'k@x.com', password: '' })
  })

  it('mostra no campo o erro de validação que veio da API', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new ApiError(400, 'Erro', { Email: ['Já existe um usuário com este e-mail.'] }))
    render(<UserForm onSubmit={onSubmit} onCancel={() => {}} />)

    await userEvent.type(screen.getByLabelText('Nome'), 'Kleber')
    await userEvent.type(screen.getByLabelText('E-mail'), 'k@x.com')
    await userEvent.type(screen.getByLabelText('Senha'), '123')
    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(await screen.findByText('Já existe um usuário com este e-mail.')).toBeInTheDocument()
    expect(screen.getByLabelText('E-mail')).toHaveAttribute('aria-invalid', 'true')
  })
})
