import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export class EmailVerificationTokenSchema extends BaseModel {
  static $columns = ['id', 'userId', 'token', 'expiresAt', 'createdAt', 'updatedAt'] as const
  $columns = EmailVerificationTokenSchema.$columns
  @column({ isPrimary: true })
  declare id: string
  @column()
  declare userId: string | null
  @column()
  declare token: string
  @column.dateTime()
  declare expiresAt: DateTime
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}

export class ResetPasswordTokenSchema extends BaseModel {
  static $columns = ['id', 'userId', 'token', 'expiresAt', 'createdAt', 'updatedAt'] as const
  $columns = ResetPasswordTokenSchema.$columns
  @column({ isPrimary: true })
  declare id: string
  @column()
  declare userId: string | null
  @column()
  declare token: string
  @column.dateTime()
  declare expiresAt: DateTime
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}

export class UserSchema extends BaseModel {
  static $columns = [
    'id',
    'firstName',
    'lastName',
    'email',
    'address',
    'password',
    'role',
    'emailVerifiedAt',
    'createdAt',
    'updatedAt',
  ] as const
  $columns = UserSchema.$columns
  @column({ isPrimary: true })
  declare id: string
  @column()
  declare firstName: string | null
  @column()
  declare lastName: string | null
  @column()
  declare email: string
  @column()
  declare address: any | null
  @column({ serializeAs: null })
  declare password: string
  @column()
  declare role: string
  @column.dateTime()
  declare emailVerifiedAt: DateTime | null
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
