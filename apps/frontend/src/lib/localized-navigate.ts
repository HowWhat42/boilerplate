import { getRouter } from '@/router'
import { LOCALE_ROUTE } from '@/components/common/localized-link'
import type { FileRouteTypes } from '@/routeTree.gen'

/**
 * Strip locale prefix from route paths for type safety
 */
type StripLocalePrefix<T extends string> = T extends
  | `/${typeof LOCALE_ROUTE}`
  | `/${typeof LOCALE_ROUTE}/`
  ? '/'
  : T extends `/${typeof LOCALE_ROUTE}/${infer Rest}`
    ? `/${Rest}`
    : never

export type LocalizedTo = StripLocalePrefix<FileRouteTypes['to']>

interface LocalizedNavigateOptions {
  to: LocalizedTo
  params?: Record<string, unknown>
  search?: Record<string, unknown>
  hash?: string
}

/**
 * Get the current locale from the router state
 * Falls back to 'en' if locale cannot be determined
 */
function getCurrentLocale(): string {
  const router = getRouter()
  const currentRoute = router.state.location
  
  // Extract locale from pathname (format: /{locale}/...)
  const pathParts = currentRoute.pathname.split('/')
  const locale = pathParts[1] || 'en'
  
  return locale
}

/**
 * Navigate to a localized route outside of React components
 * This function automatically prepends the current locale to the route
 * 
 * @example
 * localizedNavigate({ to: '/auth/login' })
 * Navigates to: /en/auth/login (if current locale is 'en')
 */
export function localizedNavigate(options: LocalizedNavigateOptions) {
  const router = getRouter()
  const locale = getCurrentLocale()
  
  const { to, params = {}, ...rest } = options
  
  const localizedTo = `/${LOCALE_ROUTE}${to}` as FileRouteTypes['to']
  
  return router.navigate({
    to: localizedTo,
    params: { locale, ...params } as any,
    ...rest,
  })
}

