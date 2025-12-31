import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#users/factories/user_factory'
import User from '#users/models/user'

test.group('Auth', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('should register a new user', async ({ client, assert }) => {
    const payload = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    }

    const response = await client.post('/register').json(payload)
    console.log(response.body())

    response.assertStatus(201)
    assert.exists(response.body().user)
    assert.equal(response.body().user.email, payload.email)
    assert.equal(response.body().user.firstName, payload.firstName)
    assert.equal(response.body().user.lastName, payload.lastName)

    const user = await User.findBy('email', payload.email)
    assert.isNotNull(user)
  })

  test('should not register with existing email', async ({ client }) => {
    const existingUser = await UserFactory.merge({ email: 'existing@example.com' }).create()

    const payload = {
      email: existingUser.email.toLowerCase(),
      firstName: 'John',
      lastName: 'Doe',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    }

    const response = await client.post('/register').json(payload)

    // Database unique constraint returns 500 (not handled as validation error)
    response.assertStatus(500)
  })

  test('should login with valid credentials', async ({ client, assert }) => {
    const password = 'Password123!'
    const user = await UserFactory.merge({ email: 'login@example.com', password }).create()

    const response = await client.post('/login').json({
      email: user.email.toLowerCase(),
      password,
    })

    response.assertStatus(200)
    assert.equal(response.body().email, user.email)
    assert.equal(response.body().firstName, user.firstName)
    assert.equal(response.body().lastName, user.lastName)
  })

  test('should not login with invalid password', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.post('/login').json({
      email: user.email,
      password: 'WrongPassword123!',
    })

    response.assertStatus(400)
  })

  test('should not login with non-existent email', async ({ client }) => {
    const response = await client.post('/login').json({
      email: 'nonexistent@example.com',
      password: 'Password123!',
    })

    response.assertStatus(400)
  })

  test('should get current user when authenticated', async ({ client, assert }) => {
    const user = await UserFactory.create()

    const response = await client.get('/me').loginAs(user)

    response.assertStatus(200)
    assert.equal(response.body().email, user.email)
    assert.equal(response.body().firstName, user.firstName)
    assert.equal(response.body().lastName, user.lastName)
  })

  test('should not get current user when unauthenticated', async ({ client }) => {
    const response = await client.get('/me')

    response.assertStatus(401)
  })

  test('should logout when authenticated', async ({ client }) => {
    const user = await UserFactory.create()

    const response = await client.post('/logout').loginAs(user)

    response.assertStatus(204)
  })

  test('should not logout when unauthenticated', async ({ client }) => {
    const response = await client.post('/logout')

    response.assertStatus(401)
  })
})

