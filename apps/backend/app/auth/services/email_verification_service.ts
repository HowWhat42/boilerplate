import User from '#users/models/user'
import { randomBytes } from 'node:crypto'
import { DateTime } from 'luxon'
import EmailVerificationToken from '#users/models/email_verification_token'
import env from '#start/env'
import mail from '@adonisjs/mail/services/main'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export class EmailVerificationService {
  async generateToken(user: User, transaction?: TransactionClientContract) {
    const token = randomBytes(32).toString('hex')
    const expiresAt = DateTime.now().plus({ days: 7 })

    await this.deleteTokens(user)

    const verificationToken = await EmailVerificationToken.updateOrCreate(
      { userId: user.id },
      {
        token,
        expiresAt,
      },
      { client: transaction }
    )
    return { token: verificationToken.token, expiresAt: verificationToken.expiresAt }
  }

  async deleteTokens(user: User) {
    await EmailVerificationToken.query().where('userId', user.id).delete()
  }

  async getToken(token: string) {
    return await EmailVerificationToken.query()
      .where('token', token)
      .andWhere('expiresAt', '>', DateTime.now().toSQL())
      .first()
  }

  async sendVerificationEmail(user: User) {
    const { token } = await this.generateToken(user)

    const verificationUrl = `${env.get('APP_URL')}/auth/verify-email?token=${token}`

    await mail.send((message) => {
      message
        .to(user.email)
        .subject('Verify your email address')
        .htmlView('#resources/views/emails/verify_email', {
          fullName: user.fullName,
          verificationUrl,
          baseUrl: env.get('APP_URL'),
        })
    })

    return {
      success: true,
      message: 'Verification email sent successfully.',
    }
  }

  async resendVerificationEmail(email: string) {
    const user = await User.findBy('email', email)

    if (!user) {
      return {
        success: true,
        message: 'If an account with that email exists, we have sent a verification email.',
      }
    }

    // Check if already verified
    if (user.emailVerifiedAt) {
      return {
        success: true,
        message: 'Email address is already verified.',
      }
    }

    const { token } = await this.generateToken(user)

    const verificationUrl = `${env.get('APP_URL')}/auth/verify-email?token=${token}`

    await mail.send((message) => {
      message
        .to(email)
        .subject('Verify your email address')
        .htmlView('#resources/views/emails/verify_email', {
          fullName: user.fullName,
          verificationUrl,
          baseUrl: env.get('APP_URL'),
        })
    })

    return {
      success: true,
      message: 'If an account with that email exists, we have sent a verification email.',
    }
  }

  async verifyEmail(token: EmailVerificationToken) {
    const user = await User.findOrFail(token.userId)

    // Check if already verified
    if (user.emailVerifiedAt) {
      return {
        success: true,
        message: 'Email address is already verified.',
        user,
      }
    }

    await user
      .merge({
        emailVerifiedAt: DateTime.now(),
      })
      .save()

    await this.deleteTokens(user)

    return {
      success: true,
      message: 'Email verified successfully.',
      user,
    }
  }
}
