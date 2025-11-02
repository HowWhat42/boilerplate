import { createFileRoute } from '@tanstack/react-router'
import {
  SidebarInset,
  SidebarProvider,
} from '@boilerplate/design-system/components/ui/sidebar'
import { AppSidebar } from '@/components/common/app-sidebar'
import { SiteHeader } from '@/components/common/site-header'
import { SectionCards } from '@/components/home/section-cards'
import { ChartAreaInteractive } from '@/components/home/chart-area-interactive'
import { DataTable } from '@/components/home/data-table'
import data from '../data.json'
import { queryClient } from '@/lib/tuyau'
import { getCurrentUserQueryOptions } from '@/lib/queries/users'
import { localizedNavigate } from '@/lib/localized-navigate'

export const Route = createFileRoute('/{-$locale}/')({
  beforeLoad: async () => {
    try {
      await queryClient.ensureQueryData(getCurrentUserQueryOptions())
    } catch {
      throw localizedNavigate({
        to: '/auth/login',
      })
    }
  },
  component: App,
})

function App() {
  return (
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
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
