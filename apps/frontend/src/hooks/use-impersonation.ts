import { useMutation, useQuery } from '@tanstack/react-query'
import { InferResponseType } from '@tuyau/react-query'
import { tuyau } from '@/lib/tuyau'
import {
  getImpersonationStatusQueryOptions,
  impersonateUserMutationOptions,
  stopImpersonationMutationOptions,
} from '@/lib/queries/admin'
import { LocalizedTo, localizedNavigate } from '@/lib/localized-navigate'

export type ImpersonationStatus = InferResponseType<
  typeof tuyau.admin.impersonate.status.$get
>

type ImpersonationData = {
  isImpersonating: boolean
  currentUser: ImpersonationStatus['currentUser'] | null
  originalAdmin: ImpersonationStatus['originalAdmin'] | null
  isLoading: boolean
  impersonate: (userId: string, redirectTo?: LocalizedTo) => Promise<void>
  stopImpersonation: () => Promise<void>
}

export function useImpersonation(): ImpersonationData {
  const statusQuery = useQuery(getImpersonationStatusQueryOptions())
  const startMutation = useMutation(impersonateUserMutationOptions)
  const stopMutation = useMutation(stopImpersonationMutationOptions)

  const data = statusQuery.data || {
    isImpersonating: false,
    currentUser: null,
    originalAdmin: null,
  }

  return {
    isImpersonating: data.isImpersonating,
    currentUser: data.currentUser,
    originalAdmin: data.originalAdmin,
    isLoading: statusQuery.isLoading || stopMutation.isPending,
    impersonate: async (userId: string, redirectTo?: LocalizedTo) => {
      startMutation.mutate(
        {
          params: { user_id: userId },
        },
        {
          onSuccess: () => {
            if (redirectTo) {
              void localizedNavigate({ to: redirectTo })
            }
          },
        }
      )
    },
    stopImpersonation: async () => {
      await stopMutation.mutateAsync({})
    },
  }
}
