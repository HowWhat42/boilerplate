import { BasePolicy } from '@adonisjs/bouncer'
import User from '#users/models/user'

export default class AdminPolicy extends BasePolicy {
  async impersonate(user: User, targetUser: User) {
    return (
      (await user.hasPermission('validate_entities')) &&
      !(await targetUser.hasPermission('validate_entities'))
    )
  }

  async accessAdmin(user: User) {
    return await user.hasPermission('admin_access')
  }
}
