import { BasePolicy } from '@adonisjs/bouncer'
import User, { Role } from '#users/models/user'

export default class AdminPolicy extends BasePolicy {
  async impersonate(user: User, targetUser: User) {
    return user.role === Role.ADMIN && targetUser.role === Role.USER
  }

  async accessAdmin(user: User) {
    return user.role === Role.ADMIN
  }
}
