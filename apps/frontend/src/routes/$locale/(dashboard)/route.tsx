import { Outlet, createFileRoute } from '@tanstack/react-router'
import {
  SidebarInset,
  SidebarProvider,
} from '@boilerplate/design-system/components/ui/sidebar'
import { FacteurProvider } from '@facteurjs/react'
import { localizedNavigate } from '@/lib/localized-navigate'
import { AppSidebar } from '@/components/common/app-sidebar'
import { SiteHeader } from '@/components/common/site-header'
import { useAuth } from '@/hooks/use-auth'

export const Route = createFileRoute('/$locale/(dashboard)')({
  beforeLoad: async ({ context }) => {
    const data = await context.auth.ensureData()

    if (!data) {
      throw localizedNavigate({
        to: '/auth/login',
      })
    }
  },
  component: LayoutComponent,
})

function LayoutComponent() {
  const { user } = useAuth()
  return (
    <FacteurProvider
      apiUrl={import.meta.env.VITE_API_URL || 'http://localhost:3333'}
      notifiableId={user?.id}
    >
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col bg-background">
            <div className='@container/main flex flex-1 flex-col gap-2"'>
              <Outlet />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </FacteurProvider>
  )
}
