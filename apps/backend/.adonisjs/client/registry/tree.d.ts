/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  shopkeeper: {
    webhook: typeof routes['shopkeeper.webhook']
  }
  eventStream: typeof routes['event_stream']
  subscribe: typeof routes['subscribe']
  unsubscribe: typeof routes['unsubscribe']
  core: typeof routes['core']
  admin: {
    impersonate: {
      start: typeof routes['admin.impersonate.start']
      stop: typeof routes['admin.impersonate.stop']
      status: typeof routes['admin.impersonate.status']
    }
    users: {
      index: typeof routes['admin.users.index']
    }
  }
  auth: {
    register: typeof routes['auth.register']
    login: typeof routes['auth.login']
    me: typeof routes['auth.me']
    logout: typeof routes['auth.logout']
    email: {
      verify: typeof routes['auth.email.verify']
      resend: typeof routes['auth.email.resend']
    }
    password: {
      forgot: typeof routes['auth.password.forgot']
      reset: typeof routes['auth.password.reset']
    }
  }
}
