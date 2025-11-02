import { createFileRoute, Outlet } from '@tanstack/react-router'
import { localizedNavigate } from '@/lib/localized-navigate'

export const Route = createFileRoute('/{-$locale}/(dashboard)')({
  beforeLoad: async ({ context }) => {
    const data = await context.auth.ensureData()

    if (!data) {
      throw localizedNavigate({
        to: '/auth/login',
      })
    }
  },
  ssr: false,
  component: LayoutComponent,
})

function LayoutComponent() {
  return <Outlet />
}
