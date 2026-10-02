import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ApiError } from '@/api/client'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('valida e-mail e senha antes de enviar', async () => {
    const onSubmit = vi.fn()
    render(<LoginForm onSubmit={onSubmit} />)

    await userEvent.type(screen.getByLabelText('E-mail'), 'nao-e-email')
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(await screen.findByText('Informe um e-mail válido.')).toBeInTheDocument()
    expect(screen.getByText('Informe a senha.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('mostra a mensagem quando o login é recusado', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new ApiError(401, 'E-mail ou senha inválidos.'))
    render(<LoginForm onSubmit={onSubmit} />)

    await userEvent.type(screen.getByLabelText('E-mail'), 'k@x.com')
    await userEvent.type(screen.getByLabelText('Senha'), 'errada')
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(await screen.findByText('E-mail ou senha inválidos.')).toBeInTheDocument()
    expect(onSubmit).toHaveBeenCalledWith({ email: 'k@x.com', password: 'errada' })
  })
})
