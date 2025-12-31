import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'

import { ResetPasswordForm } from '@/components/auth/reset-password-form'

const searchSchema = z.object({
  token: z.string(),
})

export const Route = createFileRoute('/$locale/auth/reset-password/')({
  component: RouteComponent,
  validateSearch: searchSchema,
})

function RouteComponent() {
  const { token } = Route.useSearch()

  return <ResetPasswordForm token={token} />
}
