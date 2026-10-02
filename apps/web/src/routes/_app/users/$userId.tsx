import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import { userApi } from '@/api/userApi'
import { CrudFormCard } from '@/components/crud/CrudFormCard'
import { UserForm } from '@/features/users/UserForm'
import { useCrudMutations } from '@/hooks/useCrud'

export const Route = createFileRoute('/_app/users/$userId')({
  loader: ({ context: { queryClient }, params }) => queryClient.ensureQueryData(userApi.detailQuery(params.userId)),
  component: EditUserPage,
})

function EditUserPage() {
  const { userId } = Route.useParams()
  const navigate = Route.useNavigate()
  const { data: user } = useSuspenseQuery(userApi.detailQuery(userId))
  const { update } = useCrudMutations(userApi)

  return (
    <CrudFormCard title="Editar usuário">
      <UserForm
        isEdit
        defaultValues={{ name: user.name, email: user.email, password: '' }}
        onCancel={() => navigate({ to: '/users' })}
        onSubmit={async (values) => {
          const updated = await update.mutateAsync({ id: userId, data: values })
          toast.success(`${updated.name} atualizado.`)
          await navigate({ to: '/users' })
        }}
      />
    </CrudFormCard>
  )
}
