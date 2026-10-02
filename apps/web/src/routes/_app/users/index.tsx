import { createFileRoute } from '@tanstack/react-router'
import { userApi } from '@/api/userApi'
import { CrudList } from '@/components/crud/CrudList'
import { userColumns } from '@/features/users/userColumns'
import { crudListSearchSchema } from '@/lib/crudSearch'

export const Route = createFileRoute('/_app/users/')({
  validateSearch: crudListSearchSchema,
  component: UsersPage,
})

function UsersPage() {
  const { page, search } = Route.useSearch()
  const navigate = Route.useNavigate()

  return (
    <CrudList
      title="Usuários"
      api={userApi}
      columns={userColumns}
      searchField="name"
      orderBy={[{ name: 'name', order: 'asc' }]}
      page={page}
      search={search}
      describe={(user) => user.name}
      onStateChange={(state) => navigate({ search: state })}
      onNew={() => navigate({ to: '/users/new' })}
      onEdit={(user) => navigate({ to: '/users/$userId', params: { userId: user.id } })}
    />
  )
}
