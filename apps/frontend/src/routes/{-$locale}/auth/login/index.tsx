import { LoginForm } from '@/components/auth/login-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/auth/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <LoginForm />
}
