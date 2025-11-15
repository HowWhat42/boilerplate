import { getCurrentUserQueryOptions } from './users'
import { getRouter } from '@/router'
import { queryClient, tuyau } from '@/lib/tuyau'

export const getImpersonationStatusQueryOptions = () => {
  return tuyau.admin.impersonate.status.$get.queryOptions()
}

export const impersonateUserMutationOptions = tuyau.admin.impersonate({
  user_id: '',
}).start.$post.mutationOptions({
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
  tuyau.admin.impersonate.stop.$post.mutationOptions({
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
  return tuyau.admin.users.$get.queryOptions({
    params
  })
}
