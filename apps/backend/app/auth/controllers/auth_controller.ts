import type { HttpContext } from '@adonisjs/core/http'

import { Get, Group, Middleware, Post } from '@adonisjs-community/girouette'
import { loginValidator } from '#auth/validators/login'
import { registerValidator } from '#auth/validators/register'
import User from '#users/models/user'
import { middleware } from '#start/kernel'
import { inject } from '@adonisjs/core'
import UserDto from '#users/dtos/user'
import { EmailVerificationService } from '#auth/services/email_verification_service'

@inject()
@Group({ name: 'auth' })
export default class AuthController {
  constructor(private emailVerificationService: EmailVerificationService) {}
  @Post('/register', 'register')
  async register({ request, response }: HttpContext) {
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
      user: new UserDto(user),
    })
  }

  @Post('/login', 'login')
  async login({ auth, request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return new UserDto(user)
  }

  @Get('/me', 'me')
  @Middleware([middleware.auth()])
  async me({ auth }: HttpContext) {
    const user = auth.getUserOrFail()

    return new UserDto(user)
  }

  @Post('/logout', 'logout')
  @Middleware(middleware.auth())
  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()

    response.noContent()
  }
}
