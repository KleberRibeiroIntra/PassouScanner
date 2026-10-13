import { createFileRoute } from '@tanstack/react-router'
import { userApi } from '@/api/userApi'
import { CrudFormCard } from '@/components/crud/CrudFormCard'
import { UserForm } from '@/features/users/UserForm'
import { useCrudMutations } from '@/hooks/useCrud'
import { notify } from '@/lib/notify'

export const Route = createFileRoute('/_app/users/new')({
  component: NewUserPage,
})

function NewUserPage() {
  const navigate = Route.useNavigate()
  const { create } = useCrudMutations(userApi)

  return (
    <CrudFormCard title="Novo usuário">
      <UserForm
        onCancel={() => navigate({ to: '/users' })}
        onSubmit={async (values) => {
          const user = await create.mutateAsync(values)
          notify.success(`${user.name} cadastrado.`)
          await navigate({ to: '/users' })
        }}
      />
    </CrudFormCard>
  )
}
