import { createFileRoute } from '@tanstack/react-router'
import { UsersList } from '@/components/admin/users-list'

export const Route = createFileRoute('/{-$locale}/admin/')({
  component: AdminPage,
})

function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage users and impersonate accounts
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <UsersList />
      </div>
    </div>
  )
}
