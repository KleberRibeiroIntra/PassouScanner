import type { CrudColumn } from '@/components/crud/CrudList'
import type { User } from '@/types/User'

export const userColumns: CrudColumn<User>[] = [
  { header: 'Nome', cell: (user) => user.name },
  { header: 'E-mail', cell: (user) => user.email },
  {
    header: 'Criado em',
    cell: (user) => new Date(user.createdAt).toLocaleDateString('pt-BR'),
    className: 'w-32',
  },
]
