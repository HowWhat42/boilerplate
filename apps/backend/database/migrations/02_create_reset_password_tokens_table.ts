import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reset_password_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.string('token', 255).notNullable()
      table.timestamp('expires_at').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
