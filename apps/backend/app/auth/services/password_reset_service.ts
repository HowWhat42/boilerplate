import User from '#users/models/user'
import { randomBytes } from 'node:crypto'
import { DateTime } from 'luxon'
import ResetPasswordToken from '#users/models/reset_password_token'
import env from '#start/env'
import { Infer } from '@vinejs/vine/types'
import { resetPasswordValidator } from '#auth/validators/password_reset'
import mail from '@adonisjs/mail/services/main'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export class PasswordResetService {
  async generateToken(user: User, transaction?: TransactionClientContract) {
    const token = randomBytes(32).toString('hex')
    const expiresAt = DateTime.now().plus({ hours: 1 })

    await this.deleteTokens(user)

    const resetToken = await ResetPasswordToken.updateOrCreate(
      { userId: user.id },
      {
        token,
        expiresAt,
      },
      { client: transaction }
    )
    return { token: resetToken.token, expiresAt: resetToken.expiresAt }
  }

  async deleteTokens(user: User) {
    await ResetPasswordToken.query().where('userId', user.id).delete()
  }

  async getToken(token: string) {
    return await ResetPasswordToken.query()
      .where('token', token)
      .andWhere('expiresAt', '>', DateTime.now().toSQL())
      .first()
  }

  async forgotPassword(email: string, ip: string) {
    const user = await User.findBy('email', email)

    if (!user) {
      return {
        success: true,
        message: 'If an account with that email exists, we have sent a password reset link.',
      }
    }

    const { token } = await this.generateToken(user)

    const resetUrl = `${env.get('APP_URL')}/auth/reset-password?token=${token}`

    await mail.send((message) => {
      message
        .to(email)
        .subject('Reset your password')
        .htmlView('#resources/views/emails/reset_password', {
          fullName: user.fullName,
          resetUrl,
          resetFromIp: ip,
          baseUrl: env.get('APP_URL'),
        })
    })

    return {
      success: true,
      message: 'If an account with that email exists, we have sent a password reset link.',
    }
  }

  async resetPassword(token: ResetPasswordToken, payload: Infer<typeof resetPasswordValidator>) {
    const user = await User.findOrFail(token.userId)
    await user
      .merge({
        password: payload.password,
      })
      .save()

    await this.deleteTokens(user)

    return user
  }

  async resetPasswordWithoutToken(user: User, newPassword: string) {
    await user
      .merge({
        password: newPassword,
      })
      .save()

    await this.deleteTokens(user)

    return user
  }
}
