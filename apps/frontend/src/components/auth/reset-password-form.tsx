import { useIntlayer } from 'react-intlayer'
import { useMutation } from '@tanstack/react-query'
import { cn } from '@boilerplate/design-system/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@boilerplate/design-system/components/ui/tooltip'
import { PasswordField } from '@boilerplate/design-system/components/ui/password_field'
import { PasswordStrength } from '@boilerplate/design-system/components/ui/password-strength'
import { Input } from '@boilerplate/design-system/components/ui/input'
import { Form } from '@boilerplate/design-system/components/ui/form'
import { Field, FieldDescription, FieldLabel } from '@boilerplate/design-system/components/ui/field'
import { Button } from '@boilerplate/design-system/components/ui/button'

import { resetPasswordFormSchema } from '@/lib/schemas/auth'
import { resetPasswordMutationOptions } from '@/lib/queries/auth'
import { useAppForm } from '@/hooks/form-hook'
import { LocalizedLink } from '@/components/common/localized-link'

interface ResetPasswordFormProps extends React.ComponentProps<'form'> {
  token: string
}

export function ResetPasswordForm({ token, className, ...props }: ResetPasswordFormProps) {
  const content = useIntlayer('auth')
  const resetPasswordMutation = useMutation(resetPasswordMutationOptions())
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
        params: { token },
        body: { password: data.value.password },
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
              <div className="flex items-center gap-2">
                <FieldLabel htmlFor="password">{content.fields.password}</FieldLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="flex h-4 w-4 items-center justify-center rounded-full border border-input bg-background text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                      aria-label="Help information"
                    >
                      ?
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="font-semibold mb-1">{content.passwordRules.title}</div>
                    <ul className="list-disc list-inside">
                      <li>{content.passwordRules.minLength}</li>
                      <li>{content.passwordRules.lowercase}</li>
                      <li>{content.passwordRules.uppercase}</li>
                      <li>{content.passwordRules.digit}</li>
                      <li>{content.passwordRules.special}</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </div>
              <PasswordField
                id="password"
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
              <FieldLabel htmlFor="confirmPassword">{content.fields.confirmPassword}</FieldLabel>
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
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
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
            <LocalizedLink to="/auth/login" className="underline underline-offset-4">
              {content.backToLogin}
            </LocalizedLink>
          </FieldDescription>
        </Field>
      </Form>
    </form.AppForm>
  )
}
