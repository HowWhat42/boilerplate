import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/(dashboard)/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <Outlet />
      </div>
    </div>
  )
}
