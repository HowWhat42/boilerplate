import { BaseModelDto } from '@adocasts.com/dto/base'
import User from '#users/models/user'
import { Address } from '#common/types/address'

export default class UserDto extends BaseModelDto {
  declare id: string
  declare email: string
  declare firstName: string
  declare lastName: string
  declare createdAt: string
  declare updatedAt: string
  declare address: Address
  declare fullName: string

  constructor(user: User) {
    super()

    if (!user) return
    this.id = user.id.toString()
    this.email = user.email
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.createdAt = user.createdAt.toISO()!
    this.updatedAt = user.updatedAt.toISO()!
    this.address = user.address
    this.fullName = `${this.firstName} ${this.lastName}`
  }
}
