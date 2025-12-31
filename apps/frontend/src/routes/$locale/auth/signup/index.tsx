import { createFileRoute } from '@tanstack/react-router'

import { RegisterForm } from '@/components/auth/register-form'

export const Route = createFileRoute('/$locale/auth/signup/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RegisterForm />
}
