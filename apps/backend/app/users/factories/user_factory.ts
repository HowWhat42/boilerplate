import { DateTime } from 'luxon'
import Factory from '@adonisjs/lucid/factories'
import User from '#users/models/user'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: '123',
    emailVerifiedAt: faker.helpers.maybe(() => DateTime.fromJSDate(faker.date.past()), {
      probability: 0.5,
    }),
  }
}).build()
