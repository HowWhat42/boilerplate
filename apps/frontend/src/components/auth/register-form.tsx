import { cn } from '@boilerplate/design-system/lib/utils'
import { Button } from '@boilerplate/design-system/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSeparator,
} from '@boilerplate/design-system/components/ui/field'
import { Input } from '@boilerplate/design-system/components/ui/input'
import { Form } from '@boilerplate/design-system/components/ui/form'
import { useMutation } from '@tanstack/react-query'
import { PasswordStrength } from '@boilerplate/design-system/components/ui/password-strength'
import { useIntlayer } from 'react-intlayer'
import { PasswordField } from '@boilerplate/design-system/components/ui/password_field'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@boilerplate/design-system/components/ui/tooltip'
import { useAppForm } from '@/hooks/form-hook'
import { registerFormSchema } from '@/lib/schemas/auth'
import { registerMutationOptions } from '@/lib/queries/auth'
import { LocalizedLink } from '@/components/common/localized-link'

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const content = useIntlayer('auth')
  const registerMutation = useMutation(registerMutationOptions())
  const form = useAppForm({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onChange: registerFormSchema,
    },
    onSubmit: (data) => {
      registerMutation.mutateAsync({
        payload: {
          email: data.value.email,
          firstName: data.value.firstName,
          lastName: data.value.lastName,
          password: data.value.password,
          confirmPassword: data.value.confirmPassword,
        },
      })
    },
  })
  return (
    <form.AppForm>
      <Form className={cn('space-y-2', className)} {...props}>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">{content.createAccount}</h1>
          <p className="text-muted-foreground text-sm text-balance">
            {content.createAccountDescription}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <form.AppField name="firstName">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="firstName">
                  {content.fields.firstName}
                </FieldLabel>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  required
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.AppField>
          <form.AppField name="lastName">
            {(field) => (
              <Field>
                <FieldLabel htmlFor="lastName">
                  {content.fields.lastName}
                </FieldLabel>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  required
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.AppField>
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
              <div className="flex items-center gap-2">
                <FieldLabel htmlFor="password">
                  {content.fields.password}
                </FieldLabel>
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
                    <div className="font-semibold mb-1">
                      {content.passwordRules.title}
                    </div>
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
              <FieldLabel htmlFor="confirmPassword">
                {content.fields.confirmPassword}
              </FieldLabel>
              <PasswordField
                id="confirmPassword"
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
                {isSubmitting ? content.creatingAccount : content.createAccount}
              </Button>
            </Field>
          )}
        </form.Subscribe>
        <FieldSeparator />
        <Field>
          <FieldDescription className="text-center">
            {content.alreadyHaveAccount}
            <LocalizedLink
              to="/auth/login"
              className="underline underline-offset-4"
            >
              {content.signIn}
            </LocalizedLink>
          </FieldDescription>
        </Field>
      </Form>
    </form.AppForm>
  )
}
