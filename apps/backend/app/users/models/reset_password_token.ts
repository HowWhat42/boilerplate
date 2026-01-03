import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import { belongsTo } from '@adonisjs/lucid/orm'
import User from '#users/models/user'
import { ResetPasswordTokenSchema } from '#database/schema'

export default class ResetPasswordToken extends ResetPasswordTokenSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
