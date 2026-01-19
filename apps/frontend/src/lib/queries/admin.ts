import { getRouter } from '@/router'
import { queryClient, tuyau } from '@/lib/tuyau'

import { getCurrentUserQueryOptions } from './users'

export const getImpersonationStatusQueryOptions = () => {
  return tuyau.adminImpersonation.impersonationStatus.queryOptions({})
}

export const impersonateUserMutationOptions =
  tuyau.adminImpersonation.impersonateUser.mutationOptions({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getCurrentUserQueryOptions().queryKey,
      })
      await queryClient.invalidateQueries({
        queryKey: getImpersonationStatusQueryOptions().queryKey,
      })
      await getRouter().invalidate()
    },
  })

export const stopImpersonationMutationOptions =
  tuyau.adminImpersonation.stopImpersonation.mutationOptions({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getCurrentUserQueryOptions().queryKey,
      })
      await queryClient.invalidateQueries({
        queryKey: getImpersonationStatusQueryOptions().queryKey,
      })
      await getRouter().invalidate()
    },
  })

export const getUsersListQueryOptions = (params: {
  page?: number
  limit?: number
  search?: string
}) => {
  return tuyau.adminUsers.index.queryOptions({
    params,
  })
}
