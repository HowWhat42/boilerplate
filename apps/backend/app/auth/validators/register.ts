import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    email: vine.string().email().toLowerCase().trim(),
    firstName: vine.string().trim().minLength(1),
    lastName: vine.string().trim().minLength(1),
    password: vine
      .string()
      .minLength(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-@$!%*?&])[A-Za-z\d-@$!%*?&]/)
      .confirmed({ confirmationField: 'confirmPassword' }),
    confirmPassword: vine.string().minLength(1),
  })
)
