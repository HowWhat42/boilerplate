import { tuyau } from '@/lib/tuyau'

export const getCurrentUserQueryOptions = () => {
  return tuyau.auth.me.queryOptions()
}
