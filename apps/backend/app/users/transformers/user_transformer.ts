import { BaseTransformer } from '@adonisjs/core/transformers'
import User from '#users/models/user'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return this.pick(this.resource, ['id', 'firstName', 'lastName', 'email', 'role', 'fullName', 'address'])
  }
}