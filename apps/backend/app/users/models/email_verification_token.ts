import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import User from '#users/models/user'
import { withUUID } from '#common/mixins/with_uuid'

export default class EmailVerificationToken extends compose(BaseModel, withUUID()) {
  @column()
  declare userId: string

  @column()
  declare token: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare createdAt: DateTime

  @column.dateTime()
  declare expiresAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
