import { verifyEmailMutationOptions } from '@/lib/queries/auth'
import { Button } from '@boilerplate/design-system/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'
import { z } from 'zod'
import { useIntlayer } from 'react-intlayer'

const searchSchema = z.object({
  token: z.string(),
})

export const Route = createFileRoute('/{-$locale}/auth/verify-email/')({
  component: RouteComponent,
  validateSearch: searchSchema,
})

function RouteComponent() {
  const { token } = Route.useSearch()
  const content = useIntlayer('auth')
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
            <h1 className="text-2xl font-bold">{content.verifyingEmail}</h1>
            <p className="text-muted-foreground text-sm text-balance">
              {content.verifyingEmailDescription}
            </p>
          </>
        )}
        {verifyEmailMutation.isSuccess && (
          <>
            <h1 className="text-2xl font-bold">{content.emailVerified}</h1>
            <p className="text-muted-foreground text-sm text-balance">
              {content.emailVerifiedDescription}
            </p>
          </>
        )}
        {verifyEmailMutation.isError && (
          <>
            <h1 className="text-2xl font-bold">{content.verificationFailed}</h1>
            <p className="text-muted-foreground text-sm text-balance">
              {content.verificationFailedDescription}
            </p>
          </>
        )}
      </div>

      {verifyEmailMutation.isSuccess && (
        <Button
          type="button"
          onClick={() => router.navigate({ to: '/auth/login' })}
        >
          {content.goToLogin}
        </Button>
      )}

      {verifyEmailMutation.isError && (
        <Button
          type="button"
          onClick={() => router.navigate({ to: '/auth/resend-verification' })}
        >
          {content.requestNewVerificationEmail}
        </Button>
      )}
    </div>
  )
}
