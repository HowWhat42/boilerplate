import { getRouter } from '@/router'
import { queryClient, tuyau } from '@/lib/tuyau'
import { getCurrentUserQueryOptions } from './users'

export const getImpersonationStatusQueryOptions = () => {
  return tuyau.admin.impersonate.status.$get.queryOptions()
}

export const impersonateUserMutationOptions = tuyau.admin.impersonate({
  user_id: '',
}).start.$post.mutationOptions({
  onSuccess: async () => {
    void queryClient.invalidateQueries({
      queryKey: getCurrentUserQueryOptions().queryKey,
    })
    void queryClient.invalidateQueries({
      queryKey: getImpersonationStatusQueryOptions().queryKey,
    })
    void getRouter().invalidate()
  },
})

export const stopImpersonationMutationOptions =
  tuyau.admin.impersonate.stop.$post.mutationOptions({
    onSuccess: async () => {
      void queryClient.invalidateQueries({
        queryKey: getCurrentUserQueryOptions().queryKey,
      })
      void queryClient.invalidateQueries({
        queryKey: getImpersonationStatusQueryOptions().queryKey,
      })
      void getRouter().invalidate()
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
