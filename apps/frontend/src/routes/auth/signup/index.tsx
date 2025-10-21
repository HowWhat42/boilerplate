import { RegisterForm } from '@/components/auth/register-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/signup/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RegisterForm />
}
