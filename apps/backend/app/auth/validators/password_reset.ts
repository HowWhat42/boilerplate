import vine from '@vinejs/vine'

export const forgotPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
  })
)

export const resetPasswordValidator = vine.compile(
  vine.object({
    password: vine
      .string()
      .minLength(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-@$!%*?&])[A-Za-z\d-@$!%*?&]/)
      .confirmed({ confirmationField: 'confirmPassword' }),
  })
)

export const resetPasswordWithoutTokenValidator = vine.compile(
  vine.object({
    currentPassword: vine.string().minLength(1),
    newPassword: vine
      .string()
      .minLength(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-@$!%*?&])[A-Za-z\d-@$!%*?&]/)
      .confirmed({ confirmationField: 'confirmPassword' }),
  })
)
