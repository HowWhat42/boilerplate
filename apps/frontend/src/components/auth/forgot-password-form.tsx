import { cn } from '@boilerplate/design-system/lib/utils'
import { Button } from '@boilerplate/design-system/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldLabel,
} from '@boilerplate/design-system/components/ui/field'
import { Input } from '@boilerplate/design-system/components/ui/input'
import { useAppForm } from '@/hooks/form-hook'
import { Form } from '@boilerplate/design-system/components/ui/form'
import { Link } from '@tanstack/react-router'
import { forgotPasswordFormSchema } from '@/lib/schemas/auth'
import { useMutation } from '@tanstack/react-query'
import { forgotPasswordMutationOptions } from '@/lib/queries/auth'

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const forgotPasswordMutation = useMutation(forgotPasswordMutationOptions())
  const form = useAppForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onChange: forgotPasswordFormSchema,
    },
    onSubmit: (data) => {
      forgotPasswordMutation.mutateAsync({
        payload: { email: data.value.email },
      })
    },
  })
  return (
    <form.AppForm>
      <Form className={cn('space-y-6', className)} {...props}>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Forgot your password?</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email address and if it exists, we'll send you a link to
            reset your password, otherwise{' '}
            <Link to="/auth/login" className="underline underline-offset-4">
              create an account
            </Link>
          </p>
        </div>
        <form.AppField name="email">
          {(field) => (
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        </form.AppField>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Field>
              <Button type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send reset link'}
              </Button>
            </Field>
          )}
        </form.Subscribe>
        <Field>
          <FieldDescription className="text-center">
            Remember your password?{' '}
            <Link to="/auth/login" className="underline underline-offset-4">
              Back to login
            </Link>
          </FieldDescription>
        </Field>
      </Form>
    </form.AppForm>
  )
}
