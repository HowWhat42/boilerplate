import { useIntlayer } from 'react-intlayer'
import { createFileRoute } from '@tanstack/react-router'

import { UsersList } from '@/components/admin/users-list'

export const Route = createFileRoute('/$locale/(dashboard)/admin/')({
  component: AdminPage,
})

function AdminPage() {
  const content = useIntlayer('admin')

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{content.adminDashboard}</h1>
        <p className="text-muted-foreground">{content.adminDashboardDescription}</p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">{content.users}</h2>
        <UsersList />
      </div>
    </div>
  )
}
