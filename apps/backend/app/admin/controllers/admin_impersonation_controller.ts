import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'
import { Get, Group, Middleware, Post } from '@adonisjs-community/girouette'
import User from '#users/models/user'
import { middleware } from '#start/kernel'
import AdminPolicy from '#admin/policies/admin_policy'
import UserTransformer from '#users/transformers/user_transformer'

@inject()
@Group({ name: 'admin.impersonate', prefix: '/admin/impersonate' })
export default class AdminImpersonationController {
  @Post('/:user_id/start', 'start')
  @Middleware(middleware.auth())
  async impersonateUser({ params, session, response, auth, bouncer, serialize }: HttpContext) {
    const currentUser = auth.getUserOrFail()

    const { user_id: userId } = params
    const targetUser = await User.findOrFail(userId)

    await bouncer.with(AdminPolicy).authorize('impersonate', targetUser)

    session.put('originalAdminId', currentUser.id)
    session.put('isImpersonating', true)

    await auth.use('web').login(targetUser)

    return response.ok({
      message: `Now impersonating ${targetUser.firstName} ${targetUser.lastName}`,
      impersonatedUser: await serialize(UserTransformer.transform(targetUser)),
      originalAdmin: await serialize(UserTransformer.transform(currentUser)),
    })
  }

  @Post('/stop', 'stop')
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

    return response.ok({
      message: 'Impersonation stopped',
      user: await serialize(UserTransformer.transform(originalAdmin)),
    })
  }

  @Get('/status', 'status')
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

    return {
      isImpersonating: true,
      currentUser: await serialize(UserTransformer.transform(currentUser)),
      originalAdmin: await serialize(UserTransformer.transform(originalAdmin)),
    }
  }
}
