/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  eventStream: typeof routes['event_stream']
  subscribe: typeof routes['subscribe']
  unsubscribe: typeof routes['unsubscribe']
  core: typeof routes['core']
  adminImpersonation: {
    impersonateUser: typeof routes['admin_impersonation.impersonate_user']
    stopImpersonation: typeof routes['admin_impersonation.stop_impersonation']
    impersonationStatus: typeof routes['admin_impersonation.impersonation_status']
  }
  adminUsers: {
    index: typeof routes['admin_users.index']
  }
  auth: {
    register: typeof routes['auth.register']
    login: typeof routes['auth.login']
    me: typeof routes['auth.me']
    logout: typeof routes['auth.logout']
  }
  email: {
    verifyEmail: typeof routes['email.verify_email']
    resendVerificationEmail: typeof routes['email.resend_verification_email']
  }
  password: {
    forgotPassword: typeof routes['password.forgot_password']
    resetPassword: typeof routes['password.reset_password']
  }
}
