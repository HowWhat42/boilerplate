import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'
import { Group, Post } from '@adonisjs-community/girouette'
import { resendVerificationEmailValidator } from '#auth/validators/email_verification'
import { EmailVerificationService } from '#auth/services/email_verification_service'

@inject()
@Group({ name: 'auth.email', prefix: '/auth/email' })
export default class EmailController {
  constructor(private emailVerificationService: EmailVerificationService) {}

  @Post('/verify/:token', 'verify')
  async verifyEmail({ response, params }: HttpContext) {
    const { token } = params
    const verificationToken = await this.emailVerificationService.getToken(token)

    if (!verificationToken) {
      return response.status(400).json({ message: 'Invalid or expired verification token' })
    }

    const result = await this.emailVerificationService.verifyEmail(verificationToken)

    return response.status(200).json(result)
  }

  @Post('/resend', 'resend')
  async resendVerificationEmail({ request, response }: HttpContext) {
    const { email } = await request.validateUsing(resendVerificationEmailValidator)

    const result = await this.emailVerificationService.resendVerificationEmail(email)

    return response.ok(result)
  }
}
