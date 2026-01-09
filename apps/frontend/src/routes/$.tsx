import { createFileRoute, redirect } from '@tanstack/react-router'
import intlayerConfig from '../../intlayer.config'

export const Route = createFileRoute('/$')({
  beforeLoad: ({ location }) => {
    const defaultLocale =
      intlayerConfig.internationalization?.defaultLocale || 'en'
    const availableLocales = intlayerConfig.internationalization?.locales || []

    if (location.pathname === '/') {
      return
    }

    const pathSegments = location.pathname.split('/').filter(Boolean)
    const firstSegment = pathSegments[0] || ''

    const isLocalePrefix = availableLocales.some(
      (locale) => locale === firstSegment,
    )

    if (isLocalePrefix) {
      return
    }

    const newPath = `/${defaultLocale}${location.pathname}`

    const searchParams = new URLSearchParams(location.search)
    const search: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      search[key] = value
    })

    throw redirect({
      to: newPath as any,
      search: Object.keys(search).length > 0 ? (search as any) : undefined,
      hash: location.hash || undefined,
    })
  },
})
