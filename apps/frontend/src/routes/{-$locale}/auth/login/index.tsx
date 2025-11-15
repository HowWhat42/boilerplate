import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/components/auth/login-form'

export const Route = createFileRoute('/{-$locale}/auth/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginForm />
}
