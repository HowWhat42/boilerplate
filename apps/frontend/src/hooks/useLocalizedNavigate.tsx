import { useLocale } from 'react-intlayer'
import { useNavigate } from '@tanstack/react-router'
import type { FileRouteTypes } from '@/routeTree.gen'
import { LOCALE_ROUTE } from '@/components/common/localized-link'

export const useLocalizedNavigate = () => {
  const navigate = useNavigate()

  const { locale } = useLocale()

  type StripLocalePrefix<T extends string> = T extends
    | `/${typeof LOCALE_ROUTE}`
    | `/${typeof LOCALE_ROUTE}/`
    ? '/'
    : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
      ? `/${Rest}`
      : never

  type LocalizedTo = StripLocalePrefix<FileRouteTypes['to']>

  interface LocalizedNavigate {
    (to: LocalizedTo): ReturnType<typeof navigate>
    (
      opts: { to: LocalizedTo } & Record<string, unknown>,
    ): ReturnType<typeof navigate>
  }

  const localizedNavigate: LocalizedNavigate = (args: any) => {
    if (typeof args === 'string') {
      return navigate({ to: `/${LOCALE_ROUTE}${args}`, params: { locale } })
    }

    const { to, ...rest } = args

    const localedTo = `/${LOCALE_ROUTE}${to}` as any

    return navigate({ to: localedTo, params: { locale, ...rest } })
  }

  return localizedNavigate
}
