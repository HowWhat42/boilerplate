import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, computed } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { withTimestamps } from '#common/mixins/with_timestamps'
import { withUUID } from '#common/mixins/with_uuid'
import type { Address } from '#common/types/address'
import { DateTime } from 'luxon'
import { MorphMap } from '@holoyan/morph-map-js'
import { hasPermissions } from '@holoyan/adonisjs-permissions'
import type { AclModelInterface } from '@holoyan/adonisjs-permissions/types'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

@MorphMap('users')
export default class User
  extends compose(BaseModel, AuthFinder, withUUID(), withTimestamps(), hasPermissions())
  implements AclModelInterface
{
  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

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
