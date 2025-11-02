import { cn } from '@boilerplate/design-system/lib/utils'
import { Button } from '@boilerplate/design-system/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSeparator,
} from '@boilerplate/design-system/components/ui/field'
import { Input } from '@boilerplate/design-system/components/ui/input'
import { PasswordField } from '@boilerplate/design-system/components/ui/password_field'
import { useAppForm } from '@/hooks/form-hook'
import { Form } from '@boilerplate/design-system/components/ui/form'
import { loginFormSchema } from '@/lib/schemas/auth'
import { useAuth } from '@/hooks/use-auth'
import { LocalizedLink } from '@/components/common/localized-link'
import { useIntlayer } from 'react-intlayer'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const content = useIntlayer('auth')
  const { signIn } = useAuth()
  const form = useAppForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: loginFormSchema,
    },
    onSubmit: (data) => {
      signIn(data.value)
    },
  })
  return (
    <form.AppForm>
      <Form className={cn('space-y-6', className)} {...props}>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">{content.loginTitle}</h1>
          <p className="text-muted-foreground text-sm text-balance">
            {content.loginDescription}
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
        <form.AppField name="password">
          {(field) => (
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">
                  {content.fields.password}
                </FieldLabel>
                <LocalizedLink
                  to="/auth/forgot-password"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  {content.forgotPasswordTitle}
                </LocalizedLink>
              </div>
              <PasswordField
                id="password"
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
                {isSubmitting ? content.loggingIn : content.login}
              </Button>
            </Field>
          )}
        </form.Subscribe>
        <FieldSeparator />
        <Field>
          <FieldDescription className="text-center">
            {content.dontHaveAccount}
            <LocalizedLink
              to="/auth/signup"
              className="underline underline-offset-4"
            >
              {content.register}
            </LocalizedLink>
          </FieldDescription>
        </Field>
      </Form>
    </form.AppForm>
  )
}
