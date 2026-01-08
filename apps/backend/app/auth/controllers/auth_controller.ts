import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'
import { Get, Middleware, Post } from '@adonisjs-community/girouette'
import UserTransformer from '#users/transformers/user_transformer'
import User from '#users/models/user'
import { middleware } from '#start/kernel'
import { registerValidator } from '#auth/validators/register'
import { loginValidator } from '#auth/validators/login'
import { EmailVerificationService } from '#auth/services/email_verification_service'

@inject()
export default class AuthController {
  constructor(private emailVerificationService: EmailVerificationService) {}
  @Post('/register')
  async register({ request, response, serialize }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await User.create({
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      password: payload.password,
    })

    await this.emailVerificationService.sendVerificationEmail(user)

    return response.status(201).json({
      message: 'Registration successful. Please check your email to verify your account.',
      user: await serialize(UserTransformer.transform(user)),
    })
  }

  @Post('/login')
  async login({ auth, request, serialize }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return await serialize(UserTransformer.transform(user))
  }

  @Get('/me')
  @Middleware([middleware.auth()])
  async me({ auth, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    return await serialize(UserTransformer.transform(user))
  }

  @Post('/logout')
  @Middleware(middleware.auth())
  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    response.noContent()
  }
}
