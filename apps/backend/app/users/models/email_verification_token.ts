import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import { belongsTo } from '@adonisjs/lucid/orm'
import User from '#users/models/user'
import { EmailVerificationTokenSchema } from '#database/schema'

export default class EmailVerificationToken extends EmailVerificationTokenSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
