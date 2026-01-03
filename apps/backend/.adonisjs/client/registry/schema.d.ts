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
  'admin.impersonate.start': {
    methods: ["POST"]
    pattern: '/admin/impersonate/:user_id/start'
    types: {
      body: {}
      paramsTuple: [string]
      params: { user_id: string }
      query: {}
      response: unknown
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
      response: unknown
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
      response: unknown
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
      response: unknown
    }
  }
  'auth.register': {
    methods: ["POST"]
    pattern: '/register'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'auth.login': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
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
      response: unknown
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
      response: unknown
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
      response: unknown
    }
  }
  'auth.email.resend': {
    methods: ["POST"]
    pattern: '/auth/email/resend'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'auth.password.forgot': {
    methods: ["POST"]
    pattern: '/auth/password/forgot'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
    }
  }
  'auth.password.reset': {
    methods: ["POST"]
    pattern: '/auth/password/reset/:token'
    types: {
      body: {}
      paramsTuple: [string]
      params: { token: string }
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
}
