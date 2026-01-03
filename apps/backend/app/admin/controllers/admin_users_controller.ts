import type { HttpContext } from '@adonisjs/core/http'

import { inject } from '@adonisjs/core'
import { Get, Group, Middleware } from '@adonisjs-community/girouette'
import User from '#users/models/user'
import { middleware } from '#start/kernel'
import AdminPolicy from '#admin/policies/admin_policy'
import UserTransformer from '#users/transformers/user_transformer'

@inject()
@Group({ name: 'admin.users', prefix: '/admin/users' })
export default class AdminUsersController {
  @Get('/', 'index')
  @Middleware(middleware.auth())
  async index({ request, bouncer, serialize }: HttpContext) {
    await bouncer.with(AdminPolicy).authorize('accessAdmin')

    const page = request.input('page', 1)
    const limit = request.input('limit', 20)
    const search = request.input('search', '')

    const query = User.query()

    if (search) {
      query.where((builder) => {
        builder
          .whereILike('firstName', `%${search}%`)
          .orWhereILike('lastName', `%${search}%`)
          .orWhereILike('email', `%${search}%`)
      })
    }

    const users = await query.orderBy('createdAt', 'desc').paginate(page, limit)

    const data = users.all()
    const meta = users.getMeta()

    return await serialize(UserTransformer.paginate(data, meta))
  }
}
