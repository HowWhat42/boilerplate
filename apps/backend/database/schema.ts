import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export class EmailVerificationTokenSchema extends BaseModel {
  static $columns = ['id', 'userId', 'token', 'expiresAt', 'createdAt', 'updatedAt'] as const
  $columns = EmailVerificationTokenSchema.$columns
  @column({ isPrimary: true })
  declare id: uuid
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
  declare id: uuid
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

export class SubscriptionItemSchema extends BaseModel {
  static $columns = ['id', 'subscriptionId', 'stripeId', 'stripeProduct', 'stripePrice', 'quantity', 'createdAt', 'updatedAt'] as const
  $columns = SubscriptionItemSchema.$columns
  @column({ isPrimary: true })
  declare id: uuid
  @column()
  declare subscriptionId: string | null
  @column()
  declare stripeId: string
  @column()
  declare stripeProduct: string
  @column()
  declare stripePrice: string
  @column()
  declare quantity: number | null
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}

export class SubscriptionSchema extends BaseModel {
  static $columns = ['id', 'userId', 'type', 'stripeId', 'stripeStatus', 'stripePrice', 'quantity', 'trialEndsAt', 'endsAt', 'createdAt', 'updatedAt'] as const
  $columns = SubscriptionSchema.$columns
  @column({ isPrimary: true })
  declare id: uuid
  @column()
  declare userId: string | null
  @column()
  declare type: string
  @column()
  declare stripeId: string
  @column()
  declare stripeStatus: string
  @column()
  declare stripePrice: string | null
  @column()
  declare quantity: number | null
  @column.dateTime()
  declare trialEndsAt: DateTime | null
  @column.dateTime()
  declare endsAt: DateTime | null
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}

export class UserSchema extends BaseModel {
  static $columns = ['id', 'firstName', 'lastName', 'email', 'password', 'role', 'emailVerifiedAt', 'createdAt', 'updatedAt', 'stripeId', 'pmType', 'pmLastFour', 'trialEndsAt'] as const
  $columns = UserSchema.$columns
  @column({ isPrimary: true })
  declare id: uuid
  @column()
  declare firstName: string | null
  @column()
  declare lastName: string | null
  @column()
  declare email: string
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
  @column()
  declare stripeId: string | null
  @column()
  declare pmType: string | null
  @column()
  declare pmLastFour: string | null
  @column.dateTime()
  declare trialEndsAt: DateTime | null
}
