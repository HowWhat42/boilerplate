import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'
import { Get, Group, Middleware, Post } from '@adonisjs-community/girouette'
import UserTransformer from '#users/transformers/user_transformer'
import User from '#users/models/user'
import { middleware } from '#start/kernel'
import AdminPolicy from '#admin/policies/admin_policy'

@inject()
@Group({ prefix: '/admin/impersonate' })
export default class AdminImpersonationController {
  @Post('/:user_id/start')
  @Middleware(middleware.auth())
  async impersonateUser({ params, session, auth, bouncer, serialize }: HttpContext) {
    const currentUser = auth.getUserOrFail()

    const { user_id: userId } = params
    const targetUser = await User.findOrFail(userId)

    await bouncer.with(AdminPolicy).authorize('impersonate', targetUser)

    session.put('originalAdminId', currentUser.id)
    session.put('isImpersonating', true)

    await auth.use('web').login(targetUser)

    return serialize({
      message: `Now impersonating ${targetUser.firstName} ${targetUser.lastName}`,
      impersonatedUser: UserTransformer.transform(targetUser),
      originalAdmin: UserTransformer.transform(currentUser),
    })
  }

  @Post('/stop')
  @Middleware(middleware.auth())
  async stopImpersonation({ session, response, auth, serialize }: HttpContext) {
    const originalAdminId = session.get('originalAdminId')
    const isImpersonating = session.get('isImpersonating')

    if (!originalAdminId || !isImpersonating) {
      return response.badRequest({ message: 'No active impersonation session' })
    }

    const originalAdmin = await User.findOrFail(originalAdminId)
    await auth.use('web').login(originalAdmin)

    session.forget('originalAdminId')
    session.forget('isImpersonating')

    return serialize({
      message: 'Impersonation stopped',
      user: UserTransformer.transform(originalAdmin),
    })
  }

  @Get('/status')
  @Middleware(middleware.auth())
  async impersonationStatus({ session, auth, serialize }: HttpContext) {
    const originalAdminId = session.get('originalAdminId')
    const isImpersonating = session.get('isImpersonating')

    if (!originalAdminId || !isImpersonating) {
      return {
        isImpersonating: false,
        currentUser: null,
        originalAdmin: null,
      }
    }

    const currentUser = auth.getUserOrFail()
    const originalAdmin = await User.findOrFail(originalAdminId)

    return serialize({
      isImpersonating: true,
      currentUser: UserTransformer.transform(currentUser),
      originalAdmin: UserTransformer.transform(originalAdmin),
    })
  }
}
