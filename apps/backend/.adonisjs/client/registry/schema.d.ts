/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractQuery, ExtractQueryForGet } from '@tuyau/core/types'
import type { InferInput } from '@vinejs/vine/types'

export interface Registry {
  'shopkeeper.webhook': {
    methods: ["POST"]
    pattern: '/stripe/webhook'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'event_stream': {
    methods: ["GET","HEAD"]
    pattern: '/__transmit/events'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'subscribe': {
    methods: ["POST"]
    pattern: '/__transmit/subscribe'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'unsubscribe': {
    methods: ["POST"]
    pattern: '/__transmit/unsubscribe'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'core': {
    methods: ["GET","HEAD"]
    pattern: '/health'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: Awaited<ReturnType<import('#core/controllers/health_checks_controller').default['handle']>>
    }
  }
  'admin.impersonate.start': {
    methods: ["POST"]
    pattern: '/admin/impersonate/:user_id/start'
    types: {
      body: {}
      paramsTuple: [string]
      params: { user_id: string }
      query: {}
      response: Awaited<ReturnType<import('#app/admin/controllers/admin_impersonation_controller').default['impersonateUser']>>
    }
  }
  'admin.impersonate.stop': {
    methods: ["POST"]
    pattern: '/admin/impersonate/stop'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: Awaited<ReturnType<import('#app/admin/controllers/admin_impersonation_controller').default['stopImpersonation']>>
    }
  }
  'admin.impersonate.status': {
    methods: ["GET"]
    pattern: '/admin/impersonate/status'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: Awaited<ReturnType<import('#app/admin/controllers/admin_impersonation_controller').default['impersonationStatus']>>
    }
  }
  'admin.users.index': {
    methods: ["GET"]
    pattern: '/admin/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: Awaited<ReturnType<import('#app/admin/controllers/admin_users_controller').default['index']>>
    }
  }
  'auth.register': {
    methods: ["POST"]
    pattern: '/register'
    types: {
      body: ExtractBody<InferInput<(typeof import('#auth/validators/register').registerValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#auth/validators/register').registerValidator)>>
      response: Awaited<ReturnType<import('#app/auth/controllers/auth_controller').default['register']>>
    }
  }
  'auth.login': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#auth/validators/login').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#auth/validators/login').loginValidator)>>
      response: Awaited<ReturnType<import('#app/auth/controllers/auth_controller').default['login']>>
    }
  }
  'auth.me': {
    methods: ["GET"]
    pattern: '/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: Awaited<ReturnType<import('#app/auth/controllers/auth_controller').default['me']>>
    }
  }
  'auth.logout': {
    methods: ["POST"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: Awaited<ReturnType<import('#app/auth/controllers/auth_controller').default['logout']>>
    }
  }
  'auth.email.verify': {
    methods: ["POST"]
    pattern: '/auth/email/verify/:token'
    types: {
      body: {}
      paramsTuple: [string]
      params: { token: string }
      query: {}
      response: Awaited<ReturnType<import('#app/auth/controllers/email_controller').default['verifyEmail']>>
    }
  }
  'auth.email.resend': {
    methods: ["POST"]
    pattern: '/auth/email/resend'
    types: {
      body: ExtractBody<InferInput<(typeof import('#auth/validators/email_verification').resendVerificationEmailValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#auth/validators/email_verification').resendVerificationEmailValidator)>>
      response: Awaited<ReturnType<import('#app/auth/controllers/email_controller').default['resendVerificationEmail']>>
    }
  }
  'auth.password.forgot': {
    methods: ["POST"]
    pattern: '/auth/password/forgot'
    types: {
      body: ExtractBody<InferInput<(typeof import('#auth/validators/password_reset').forgotPasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#auth/validators/password_reset').forgotPasswordValidator)>>
      response: Awaited<ReturnType<import('#app/auth/controllers/password_controller').default['forgotPassword']>>
    }
  }
  'auth.password.reset': {
    methods: ["POST"]
    pattern: '/auth/password/reset/:token'
    types: {
      body: ExtractBody<InferInput<(typeof import('#auth/validators/password_reset').resetPasswordValidator)>>
      paramsTuple: [string]
      params: { token: string }
      query: ExtractQuery<InferInput<(typeof import('#auth/validators/password_reset').resetPasswordValidator)>>
      response: Awaited<ReturnType<import('#app/auth/controllers/password_controller').default['resetPassword']>>
    }
  }
}
