import type { Address } from '#common/types/address'

import { DateTime } from 'luxon'
import { Billable } from '@foadonis/shopkeeper/mixins'
import { column, computed } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { UserSchema } from '#database/schema'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export default class User extends compose(UserSchema, AuthFinder, Billable) {
  @column({
    prepare: (value: Address) => JSON.stringify(value),
  })
  declare address: Address

  @computed()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  getModelId(): string {
    return this.id
  }
}
