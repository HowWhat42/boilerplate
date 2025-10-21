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
import { resendVerificationFormSchema } from '@/lib/schemas/auth'
import { useMutation } from '@tanstack/react-query'
import { resendVerificationMutationOptions } from '@/lib/queries/auth'

export function ResendVerificationForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const resendVerificationMutation = useMutation(resendVerificationMutationOptions())
  const form = useAppForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onChange: resendVerificationFormSchema,
    },
    onSubmit: (data) => {
      resendVerificationMutation.mutateAsync({
        payload: { email: data.value.email },
      })
    },
  })
  return (
    <form.AppForm>
      <Form className={cn('space-y-6', className)} {...props}>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Resend verification email</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email address and we'll send you a new verification link
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
                {isSubmitting ? 'Sending...' : 'Send verification email'}
              </Button>
            </Field>
          )}
        </form.Subscribe>
        <Field>
          <FieldDescription className="text-center">
            Already verified?{' '}
            <Link to="/auth/login" className="underline underline-offset-4">
              Back to login
            </Link>
          </FieldDescription>
        </Field>
      </Form>
    </form.AppForm>
  )
}
