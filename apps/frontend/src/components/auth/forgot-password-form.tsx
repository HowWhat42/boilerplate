import { useIntlayer } from 'react-intlayer'
import { useMutation } from '@tanstack/react-query'
import { cn } from '@boilerplate/design-system/lib/utils'
import { Input } from '@boilerplate/design-system/components/ui/input'
import { Form } from '@boilerplate/design-system/components/ui/form'
import { Field, FieldDescription, FieldLabel } from '@boilerplate/design-system/components/ui/field'
import { Button } from '@boilerplate/design-system/components/ui/button'

import { forgotPasswordFormSchema } from '@/lib/schemas/auth'
import { forgotPasswordMutationOptions } from '@/lib/queries/auth'
import { useAppForm } from '@/hooks/form-hook'
import { LocalizedLink } from '@/components/common/localized-link'

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<'form'>) {
  const content = useIntlayer('auth')
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
          <h1 className="text-2xl font-bold">{content.forgotPasswordTitle}</h1>
          <p className="text-muted-foreground text-sm text-balance">
            {content.forgotPasswordDescription}
            <LocalizedLink to="/auth/login" className="underline underline-offset-4">
              {content.createAnAccount}
            </LocalizedLink>
          </p>
        </div>
        <form.AppField name="email">
          {(field) => (
            <Field>
              <FieldLabel htmlFor="email">{content.fields.email}</FieldLabel>
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
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <Field>
              <Button type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? content.sending : content.sendResetLink}
              </Button>
            </Field>
          )}
        </form.Subscribe>
        <Field>
          <FieldDescription className="text-center">
            {content.rememberPassword}
            <LocalizedLink to="/auth/login" className="underline underline-offset-4">
              {content.backToLogin}
            </LocalizedLink>
          </FieldDescription>
        </Field>
      </Form>
    </form.AppForm>
  )
}
