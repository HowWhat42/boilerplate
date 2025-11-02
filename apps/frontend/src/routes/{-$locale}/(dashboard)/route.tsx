import { createFileRoute, Outlet } from '@tanstack/react-router'
import { localizedNavigate } from '@/lib/localized-navigate'
import { TooltipProvider } from '@boilerplate/design-system/components/ui/tooltip'
import {
  SidebarInset,
  SidebarProvider,
} from '@boilerplate/design-system/components/ui/sidebar'
import { AppSidebar } from '@/components/common/app-sidebar'
import { SiteHeader } from '@/components/common/site-header'

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
  return (
    <TooltipProvider>
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
    </TooltipProvider>
  )
}
