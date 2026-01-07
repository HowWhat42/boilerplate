/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'shopkeeper.webhook': {
    methods: ["POST"],
    pattern: '/stripe/webhook',
    tokens: [{"old":"/stripe/webhook","type":0,"val":"stripe","end":""},{"old":"/stripe/webhook","type":0,"val":"webhook","end":""}],
    types: placeholder as Registry['shopkeeper.webhook']['types'],
  },
  'event_stream': {
    methods: ["GET","HEAD"],
    pattern: '/__transmit/events',
    tokens: [{"old":"/__transmit/events","type":0,"val":"__transmit","end":""},{"old":"/__transmit/events","type":0,"val":"events","end":""}],
    types: placeholder as Registry['event_stream']['types'],
  },
  'subscribe': {
    methods: ["POST"],
    pattern: '/__transmit/subscribe',
    tokens: [{"old":"/__transmit/subscribe","type":0,"val":"__transmit","end":""},{"old":"/__transmit/subscribe","type":0,"val":"subscribe","end":""}],
    types: placeholder as Registry['subscribe']['types'],
  },
  'unsubscribe': {
    methods: ["POST"],
    pattern: '/__transmit/unsubscribe',
    tokens: [{"old":"/__transmit/unsubscribe","type":0,"val":"__transmit","end":""},{"old":"/__transmit/unsubscribe","type":0,"val":"unsubscribe","end":""}],
    types: placeholder as Registry['unsubscribe']['types'],
  },
  'core': {
    methods: ["GET","HEAD"],
    pattern: '/health',
    tokens: [{"old":"/health","type":0,"val":"health","end":""}],
    types: placeholder as Registry['core']['types'],
  },
  'admin.impersonate.start': {
    methods: ["POST"],
    pattern: '/admin/impersonate/:user_id/start',
    tokens: [{"old":"/admin/impersonate/:user_id/start","type":0,"val":"admin","end":""},{"old":"/admin/impersonate/:user_id/start","type":0,"val":"impersonate","end":""},{"old":"/admin/impersonate/:user_id/start","type":1,"val":"user_id","end":""},{"old":"/admin/impersonate/:user_id/start","type":0,"val":"start","end":""}],
    types: placeholder as Registry['admin.impersonate.start']['types'],
  },
  'admin.impersonate.stop': {
    methods: ["POST"],
    pattern: '/admin/impersonate/stop',
    tokens: [{"old":"/admin/impersonate/stop","type":0,"val":"admin","end":""},{"old":"/admin/impersonate/stop","type":0,"val":"impersonate","end":""},{"old":"/admin/impersonate/stop","type":0,"val":"stop","end":""}],
    types: placeholder as Registry['admin.impersonate.stop']['types'],
  },
  'admin.impersonate.status': {
    methods: ["GET"],
    pattern: '/admin/impersonate/status',
    tokens: [{"old":"/admin/impersonate/status","type":0,"val":"admin","end":""},{"old":"/admin/impersonate/status","type":0,"val":"impersonate","end":""},{"old":"/admin/impersonate/status","type":0,"val":"status","end":""}],
    types: placeholder as Registry['admin.impersonate.status']['types'],
  },
  'admin.users.index': {
    methods: ["GET"],
    pattern: '/admin/users',
    tokens: [{"old":"/admin/users","type":0,"val":"admin","end":""},{"old":"/admin/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['admin.users.index']['types'],
  },
  'auth.register': {
    methods: ["POST"],
    pattern: '/register',
    tokens: [{"old":"/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.me': {
    methods: ["GET"],
    pattern: '/me',
    tokens: [{"old":"/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['auth.me']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'auth.email.verify': {
    methods: ["POST"],
    pattern: '/auth/email/verify/:token',
    tokens: [{"old":"/auth/email/verify/:token","type":0,"val":"auth","end":""},{"old":"/auth/email/verify/:token","type":0,"val":"email","end":""},{"old":"/auth/email/verify/:token","type":0,"val":"verify","end":""},{"old":"/auth/email/verify/:token","type":1,"val":"token","end":""}],
    types: placeholder as Registry['auth.email.verify']['types'],
  },
  'auth.email.resend': {
    methods: ["POST"],
    pattern: '/auth/email/resend',
    tokens: [{"old":"/auth/email/resend","type":0,"val":"auth","end":""},{"old":"/auth/email/resend","type":0,"val":"email","end":""},{"old":"/auth/email/resend","type":0,"val":"resend","end":""}],
    types: placeholder as Registry['auth.email.resend']['types'],
  },
  'auth.password.forgot': {
    methods: ["POST"],
    pattern: '/auth/password/forgot',
    tokens: [{"old":"/auth/password/forgot","type":0,"val":"auth","end":""},{"old":"/auth/password/forgot","type":0,"val":"password","end":""},{"old":"/auth/password/forgot","type":0,"val":"forgot","end":""}],
    types: placeholder as Registry['auth.password.forgot']['types'],
  },
  'auth.password.reset': {
    methods: ["POST"],
    pattern: '/auth/password/reset/:token',
    tokens: [{"old":"/auth/password/reset/:token","type":0,"val":"auth","end":""},{"old":"/auth/password/reset/:token","type":0,"val":"password","end":""},{"old":"/auth/password/reset/:token","type":0,"val":"reset","end":""},{"old":"/auth/password/reset/:token","type":1,"val":"token","end":""}],
    types: placeholder as Registry['auth.password.reset']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
