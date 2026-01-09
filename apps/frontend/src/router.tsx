import type { QueryClient } from '@tanstack/react-query'

import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { createRouter } from '@tanstack/react-router'

import type { AuthData } from './hooks/use-auth'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { queryClient } from './lib/tuyau'
import { getCurrentUserQueryOptions } from './lib/queries/users'
import * as TanstackQuery from './integrations/tanstack-query/root-provider'
import { NotFound } from './components/common/not-found'
import { DefaultCatchBoundary } from './components/common/default-catch-boundary'

export type RouterContext = {
  auth: AuthData
  queryClient: QueryClient
}

// Create a minimal auth context for router initialization
// This provides ensureData without requiring React hooks
const createAuthContext = (): AuthData => {
  return {
    user: undefined!,
    ensureData: async () => {
      try {
        return await queryClient.ensureQueryData(getCurrentUserQueryOptions())
      } catch {
        return undefined
      }
    },
    signIn: () => {
      throw new Error('signIn should be called from useAuth hook in a component')
    },
    signOut: () => {
      throw new Error('signOut should be called from useAuth hook in a component')
    },
  }
}

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    context: {
      auth: createAuthContext(),
      queryClient,
    },
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    Wrap: (props: { children: React.ReactNode }) => {
      return (
        <TanstackQuery.Provider queryClient={queryClient}>{props.children}</TanstackQuery.Provider>
      )
    },
  })

  setupRouterSsrQueryIntegration({ router, queryClient })

  return router
}
