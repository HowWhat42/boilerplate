import { verifyEmailMutationOptions } from '@/lib/queries/auth'
import { Button } from '@boilerplate/design-system/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'
import { z } from 'zod'

const searchSchema = z.object({
  token: z.string(),
})

export const Route = createFileRoute('/auth/verify-email/')({
  component: RouteComponent,
  validateSearch: searchSchema,
})

function RouteComponent() {
  const { token } = Route.useSearch()
  const verifyEmailMutation = useMutation(verifyEmailMutationOptions(token))
  const router = useRouter()

  useEffect(() => {
    // Automatically verify on mount
    verifyEmailMutation.mutate({})
  }, [])

  return (
    <div className="space-y-6 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-1 text-center">
        {verifyEmailMutation.isPending && (
          <>
            <h1 className="text-2xl font-bold">Verifying your email...</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Please wait while we verify your email address
            </p>
          </>
        )}
        {verifyEmailMutation.isSuccess && (
          <>
            <h1 className="text-2xl font-bold">Email verified!</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Your email has been successfully verified. You can now log in to
              your account.
            </p>
          </>
        )}
        {verifyEmailMutation.isError && (
          <>
            <h1 className="text-2xl font-bold">Verification failed</h1>
            <p className="text-muted-foreground text-sm text-balance">
              The verification link is invalid or has expired. Please request a
              new verification email.
            </p>
          </>
        )}
      </div>

      {verifyEmailMutation.isSuccess && (
        <Button
          type="button"
          onClick={() => router.navigate({ to: '/auth/login' })}
        >
          Go to login
        </Button>
      )}

      {verifyEmailMutation.isError && (
        <Button
          type="button"
          onClick={() => router.navigate({ to: '/auth/resend-verification' })}
        >
          Request new verification email
        </Button>
      )}
    </div>
  )
}
