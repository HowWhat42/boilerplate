import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { TooltipProvider } from '@boilerplate/design-system/components/ui/tooltip'
import { Toaster } from '@boilerplate/design-system/components/ui/sonner'

import type { RouterContext } from '../router'

import appCss from '../styles.css?url'

import '@boilerplate/design-system/styles/globals.css'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <TooltipProvider>
          <Outlet />
        </TooltipProvider>
        <Toaster expand position="top-center" />
        {!import.meta.env.PROD && (
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              TanStackQueryDevtools,
            ]}
          />
        )}
        <Scripts />
      </body>
    </html>
  )
}
