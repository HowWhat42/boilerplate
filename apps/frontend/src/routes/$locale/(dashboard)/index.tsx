import { createFileRoute } from '@tanstack/react-router'
import data from '../../data.json'
import { SectionCards } from '@/components/home/section-cards'
import { ChartAreaInteractive } from '@/components/home/chart-area-interactive'
import { DataTable } from '@/components/home/data-table'

export const Route = createFileRoute('/$locale/(dashboard)/')({
  component: App,
})

function App() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </div>
  )
}
