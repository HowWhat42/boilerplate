import { Acl } from '@holoyan/adonisjs-permissions'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'production']

  async run() {
    const rolesWithPermissions = {
      super_admin: ['admin_access'],
    }

    for (const [role, permissions] of Object.entries(rolesWithPermissions)) {
      await this.createRoleWithPermissions(role, permissions)
    }
  }

  async createRoleWithPermissions(roleSlug: string, permissions: string[]) {
    const role = await Acl.role().create({ slug: roleSlug })
    for (const permission of permissions) {
      await Acl.role(role).assign(permission)
    }
    return role
  }
}
