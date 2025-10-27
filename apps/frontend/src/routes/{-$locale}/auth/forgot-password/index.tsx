import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/auth/forgot-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ForgotPasswordForm />
}
