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
import { resetPasswordFormSchema } from '@/lib/schemas/auth'
import { useMutation } from '@tanstack/react-query'
import { resetPasswordMutationOptions } from '@/lib/queries/auth'
import { PasswordStrength } from '@boilerplate/design-system/components/ui/password-strength'
import { LocalizedLink } from '@/components/localized-link'
import { useIntlayer } from 'react-intlayer'

interface ResetPasswordFormProps extends React.ComponentProps<'form'> {
  token: string
}

export function ResetPasswordForm({
  token,
  className,
  ...props
}: ResetPasswordFormProps) {
  const content = useIntlayer('auth')
  const resetPasswordMutation = useMutation(resetPasswordMutationOptions(token))
  const form = useAppForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    validators: {
      onChange: resetPasswordFormSchema,
    },
    onSubmit: (data) => {
      resetPasswordMutation.mutateAsync({
        payload: { password: data.value.password },
      })
    },
  })
  return (
    <form.AppForm>
      <Form className={cn('space-y-6', className)} {...props}>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">{content.resetPasswordTitle}</h1>
          <p className="text-muted-foreground text-sm text-balance">
            {content.resetPasswordDescription}
          </p>
        </div>
        <form.AppField name="password">
          {(field) => (
            <Field>
              <FieldLabel htmlFor="password">
                {content.fields.newPassword}
              </FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••••"
                required
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldDescription>
                <PasswordStrength password={field.state.value} />
              </FieldDescription>
            </Field>
          )}
        </form.AppField>
        <form.AppField name="confirmPassword">
          {(field) => (
            <Field>
              <FieldLabel htmlFor="confirmPassword">
                {content.fields.confirmPassword}
              </FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••••••"
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
                {isSubmitting ? content.resetting : content.resetPasswordButton}
              </Button>
            </Field>
          )}
        </form.Subscribe>
        <Field>
          <FieldDescription className="text-center">
            {content.rememberPassword}
            <LocalizedLink
              to="/auth/login"
              className="underline underline-offset-4"
            >
              {content.backToLogin}
            </LocalizedLink>
          </FieldDescription>
        </Field>
      </Form>
    </form.AppForm>
  )
}
