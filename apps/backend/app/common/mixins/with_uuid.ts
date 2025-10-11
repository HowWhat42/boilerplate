import { type BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import type { NormalizeConstructor } from '@adonisjs/core/types/helpers'

type ModelWithUUIDRow = {
  id: string
}

type ModelWithUUIDClass<
  Model extends NormalizeConstructor<typeof BaseModel> = NormalizeConstructor<typeof BaseModel>,
> = Model & {
  new (...args: any[]): ModelWithUUIDRow
}

export function withUUID() {
  return <T extends NormalizeConstructor<typeof BaseModel>>(
    superclass: T
  ): ModelWithUUIDClass<T> => {
    class ModelWithUUID extends superclass {
      public static selfAssignPrimaryKey = true

      @column({ isPrimary: true })
      declare id: string

      @beforeCreate()
      public static beforeCreate(model: ModelWithUUID) {
        model.id = randomUUID()
      }
    }

    return ModelWithUUID as unknown as ModelWithUUIDClass<T>
  }
}
