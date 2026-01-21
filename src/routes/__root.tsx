// React
import { useEffect, useLayoutEffect, useMemo } from 'react'

// TanStack
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  useMatches,
  Link,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'

// Styles
import '@/styles.css'

// Components
import Header from '@/components/Header'
import { NotFound } from '@/components/common/NotFound'
import TanStackQueryDevtools from '@/integrations/tanstack-query/devtools'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    console.log(`🔍 [__root] beforeLoad 실행 (SSR: ${import.meta.env.SSR})`)
    return {}
  },

  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Router Params Test' },
    ],
  }),

  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <HeadContent />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        {process.env.NODE_ENV !== 'production' && (
          <TanStackDevtools
            config={{ position: 'bottom-left' }}
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
