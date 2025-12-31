import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'
import { Group, Post } from '@adonisjs-community/girouette'
import { forgotPasswordValidator, resetPasswordValidator } from '#auth/validators/password_reset'
import { PasswordResetService } from '#auth/services/password_reset_service'

@inject()
@Group({ name: 'auth.password', prefix: '/auth/password' })
export default class PasswordController {
  constructor(private passwordResetService: PasswordResetService) {}

  @Post('/forgot', 'forgot')
  async forgotPassword({ request, response }: HttpContext) {
    const { email } = await request.validateUsing(forgotPasswordValidator)

    const result = await this.passwordResetService.forgotPassword(email, request.ip())

    return response.ok(result)
  }

  @Post('/reset/:token', 'reset')
  async resetPassword({ request, response, params, auth }: HttpContext) {
    const { token } = params
    const payload = await request.validateUsing(resetPasswordValidator)
    const resetToken = await this.passwordResetService.getToken(token)

    if (!resetToken) {
      return response.status(400).json({ message: 'Invalid or expired token' })
    }

    const result = await this.passwordResetService.resetPassword(resetToken, payload)
    await auth.use('web').login(result)

    return response.status(200).json(result)
  }
}
