import type { z } from 'zod'
import type { InferResponseType } from '@tuyau/react-query'

import { toast } from 'sonner'
import { useMutation, useQuery } from '@tanstack/react-query'

import type { tuyau } from '@/lib/tuyau'
import type { loginFormSchema } from '@/lib/schemas/auth'
import type { LocalizedTo } from '@/lib/localized-navigate'

import { queryClient } from '@/lib/tuyau'
import { getCurrentUserQueryOptions } from '@/lib/queries/users'
import { loginMutationOptions, logoutMutationOptions } from '@/lib/queries/auth'
import { localizedNavigate } from '@/lib/localized-navigate'

export type User = InferResponseType<typeof tuyau.me.$get>

type AuthUtils = {
  signIn: (data: z.infer<typeof loginFormSchema>, redirectTo?: LocalizedTo) => void
  signOut: () => void
  ensureData: () => Promise<User | undefined>
}

type AuthData = {
  user?: User
} & AuthUtils

function useAuth(): AuthData {
  const userQuery = useQuery(getCurrentUserQueryOptions())
  const loginMutation = useMutation(loginMutationOptions)
  const signOutMutation = useMutation(logoutMutationOptions)

  const utils: AuthUtils = {
    signIn: (data: z.infer<typeof loginFormSchema>, redirectTo?: LocalizedTo) => {
      void loginMutation.mutateAsync(
        {
          payload: { email: data.email, password: data.password },
        },
        {
          onSuccess: () => {
            toast.success('Connexion réussie')
            void localizedNavigate({ to: redirectTo || '/' })
          },
        },
      )
    },
    signOut: () => {
      void signOutMutation.mutateAsync({})
    },
    ensureData: async () => {
      try {
        return await queryClient.ensureQueryData(getCurrentUserQueryOptions())
      } catch {
        return undefined
      }
    },
  }

  return {
    ...utils,
    user: userQuery.data,
  }
}

export { useAuth }
export type { AuthData }
