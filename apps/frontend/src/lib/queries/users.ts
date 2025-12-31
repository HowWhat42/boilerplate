import { tuyau } from '@/lib/tuyau'

export const getCurrentUserQueryOptions = () => {
  return tuyau.me.$get.queryOptions()
}
