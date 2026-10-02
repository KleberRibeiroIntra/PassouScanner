import { useUserForm, type UseUserFormOptions } from './useUserForm'
import { UserFormView } from './UserFormView'

interface UserFormProps extends UseUserFormOptions {
  onCancel: () => void
}

export function UserForm({ onCancel, ...options }: UserFormProps) {
  const userForm = useUserForm(options)
  return <UserFormView {...userForm} isEdit={options.isEdit ?? false} onCancel={onCancel} />
}
