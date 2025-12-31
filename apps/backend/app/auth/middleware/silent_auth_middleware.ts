import type { NextFn } from '@adonisjs/core/types/http'
import type { HttpContext } from '@adonisjs/core/http'

import { Monocle } from '@monocle-app/agent'

export default class SilentAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    await ctx.auth.check()
    if (ctx.auth.user) {
      const user = ctx.auth.user

      Monocle.setUser({
        id: user.id,
        email: user.email,
      })
    }

    return next()
  }
}
