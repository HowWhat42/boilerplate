import { ResendVerificationForm } from '@/components/auth/resend-verification-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/resend-verification/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ResendVerificationForm />
}
