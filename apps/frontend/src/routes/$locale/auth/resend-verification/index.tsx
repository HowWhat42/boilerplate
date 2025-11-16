import { createFileRoute } from '@tanstack/react-router'
import { ResendVerificationForm } from '@/components/auth/resend-verification-form'

export const Route = createFileRoute('/$locale/auth/resend-verification/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ResendVerificationForm />
}
