import User from '#users/models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class AdminPolicy extends BasePolicy {
  /**
   * Check if the user can impersonate other users
   */
  async impersonate(user: User, targetUser: User): Promise<AuthorizerResponse> {
    // Check if user has impersonate-users permission
    const hasPermission = await user.can('impersonate-users')

    if (!hasPermission) {
      return false
    }

    // Prevent impersonating yourself
    if (user.id === targetUser.id) {
      return false
    }

    return true
  }

  /**
   * Check if the user can access admin features
   */
  async accessAdmin(user: User): Promise<AuthorizerResponse> {
    // Check if user has admin-access permission
    return await user.can('admin-access')
  }
}
