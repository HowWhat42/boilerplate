/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  shopkeeper: {
    webhook: (typeof routes)['shopkeeper.webhook']
  }
  eventStream: (typeof routes)['event_stream']
  subscribe: (typeof routes)['subscribe']
  unsubscribe: (typeof routes)['unsubscribe']
  core: (typeof routes)['core']
  admin
  impersonation: {
    impersonateUser: (typeof routes)['admin impersonation.impersonateUser']
    stopImpersonation: (typeof routes)['admin impersonation.stopImpersonation']
    impersonationStatus: (typeof routes)['admin impersonation.impersonationStatus']
  }
  admin
  users: {
    index: (typeof routes)['admin users.index']
  }
  auth: {
    register: (typeof routes)['auth.register']
    login: (typeof routes)['auth.login']
    me: (typeof routes)['auth.me']
    logout: (typeof routes)['auth.logout']
  }
  email: {
    verifyEmail: (typeof routes)['email.verifyEmail']
    resendVerificationEmail: (typeof routes)['email.resendVerificationEmail']
  }
  password: {
    forgotPassword: (typeof routes)['password.forgotPassword']
    resetPassword: (typeof routes)['password.resetPassword']
  }
}
