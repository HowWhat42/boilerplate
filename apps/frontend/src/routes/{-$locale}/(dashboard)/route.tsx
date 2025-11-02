import { createFileRoute, Outlet } from '@tanstack/react-router'
import { IntlayerProvider, useLocale } from 'react-intlayer'

import { useI18nHTMLAttributes } from '@/hooks/useI18nHTMLAttributes'
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
  useI18nHTMLAttributes()
  const { defaultLocale } = useLocale()
  const { locale } = Route.useParams()

  return (
    <IntlayerProvider locale={locale ?? defaultLocale}>
      <Outlet />
    </IntlayerProvider>
  )
}
