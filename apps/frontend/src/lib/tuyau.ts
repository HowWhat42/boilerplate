/// <reference path="../../../backend/config/auth.ts" />

import { toast } from 'sonner'
import { createTuyauReactQueryClient } from '@tuyau/react-query'
import { TuyauHTTPError, createTuyau } from '@tuyau/core/client'
import { QueryClient } from '@tanstack/react-query'
import { registry } from '@boilerplate/backend/registry'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'offlineFirst',
      staleTime: 1000 * 60 * 5,
      retry: false,
    },
    mutations: {
      onError: (error) => {
        if (error instanceof TuyauHTTPError) {
          toast.error('An error occurred', {
            description: error.message,
          })
        } else {
          toast.error('An error occurred')
        }
      },
    },
  },
})

export const client = createTuyau({
  registry,
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3333',
  headers: { Accept: 'application/json' },
  credentials: 'include',
})

export const tuyau = createTuyauReactQueryClient({ client, queryClient })
