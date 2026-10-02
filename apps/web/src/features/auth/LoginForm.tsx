import { useLoginForm, type UseLoginFormOptions } from './useLoginForm'
import { LoginFormView } from './LoginFormView'

export function LoginForm(options: UseLoginFormOptions) {
  const loginForm = useLoginForm(options)
  return <LoginFormView {...loginForm} />
}
