import type { Address } from '#common/types/address'

import { DateTime } from 'luxon'
import { Billable } from '@foadonis/shopkeeper/mixins'
import { BaseModel } from '@adonisjs/lucid/orm'
import { column, computed } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { UserSchema } from '#database/schema'
import { withUUID } from '#common/mixins/with_uuid'
import { withTimestamps } from '#common/mixins/with_timestamps'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export default class User extends compose(
  BaseModel,
  AuthFinder,
  Billable,
  withUUID(),
  withTimestamps(),
) {
  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: Role

  @column({
    prepare: (value: Address) => JSON.stringify(value),
  })
  declare address: Address

  @column.dateTime()
  declare emailVerifiedAt: DateTime | null

  @computed()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  getModelId(): string {
    return this.id
  }
}
