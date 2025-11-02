import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#users/models/user'

export default class extends BaseSeeder {
  static environment = ['development', 'production']

  async run() {
    const existingUser = await User.findBy('email', 'admin@repo.com')
    if (existingUser) {
      return
    }
    const user = await User.create({
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@repo.com',
      password: '123',
    })
    await user.assignRole('super_admin')
  }
}
