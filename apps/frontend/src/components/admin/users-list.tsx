import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUsersListQueryOptions } from '@/lib/queries/admin'
import { useImpersonation } from '@/hooks/use-impersonation'
import { Button } from '@boilerplate/design-system/components/ui/button'
import { Input } from '@boilerplate/design-system/components/ui/input'
import { UserIcon } from 'lucide-react'
import Loader from '@/components/loader'

export function UsersList() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const { impersonate } = useImpersonation()

  const { data, isLoading } = useQuery(
    getUsersListQueryOptions({ page, limit: 20, search }),
  )

  const handleImpersonate = (userId: string) => {
    void impersonate(userId, '/')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Search users by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className="max-w-md"
        />
      </div>

      {isLoading ? (
        <Loader text="Loading users..." />
      ) : (
        <>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-medium">Name</th>
                  <th className="p-3 text-left font-medium">Email</th>
                  <th className="p-3 text-left font-medium">Created</th>
                  <th className="p-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((user) => (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="p-3">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleImpersonate(user.id)}
                      >
                        <UserIcon className="size-4" />
                        Impersonate
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data?.meta && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {data.meta.total} users
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={data.meta.currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={data.meta.currentPage === data.meta.lastPage}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
