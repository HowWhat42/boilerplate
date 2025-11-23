import { TooltipProvider } from '@boilerplate/design-system/components/ui/tooltip'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { IntlayerProvider, useLocale } from 'react-intlayer'

export const Route = createFileRoute('/$locale')({
  component: LayoutComponent,
})

function LayoutComponent() {
  const { defaultLocale } = useLocale()
  const { locale } = Route.useParams()

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <TooltipProvider>
        <Outlet />
      </TooltipProvider>
    </IntlayerProvider>
  )
}
