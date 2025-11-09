import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import * as Sentry from '@sentry/node'

export default class SilentAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    await ctx.auth.check()
    if (ctx.auth.user) {
      const user = ctx.auth.user
      Sentry.setUser({
        id: user.id,
        email: user.email,
      })
    }

    return next()
  }
}
