import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'shopkeeper.webhook': { paramsTuple?: []; params?: {} }
    'event_stream': { paramsTuple?: []; params?: {} }
    'subscribe': { paramsTuple?: []; params?: {} }
    'unsubscribe': { paramsTuple?: []; params?: {} }
    'core': { paramsTuple?: []; params?: {} }
    'admin.impersonate.start': { paramsTuple: [ParamValue]; params: {'user_id': ParamValue} }
    'admin.impersonate.stop': { paramsTuple?: []; params?: {} }
    'admin.impersonate.status': { paramsTuple?: []; params?: {} }
    'admin.users.index': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'auth.email.verify': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'auth.email.resend': { paramsTuple?: []; params?: {} }
    'auth.password.forgot': { paramsTuple?: []; params?: {} }
    'auth.password.reset': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
  }
  POST: {
    'shopkeeper.webhook': { paramsTuple?: []; params?: {} }
    'subscribe': { paramsTuple?: []; params?: {} }
    'unsubscribe': { paramsTuple?: []; params?: {} }
    'admin.impersonate.start': { paramsTuple: [ParamValue]; params: {'user_id': ParamValue} }
    'admin.impersonate.stop': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'auth.email.verify': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'auth.email.resend': { paramsTuple?: []; params?: {} }
    'auth.password.forgot': { paramsTuple?: []; params?: {} }
    'auth.password.reset': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
  }
  GET: {
    'event_stream': { paramsTuple?: []; params?: {} }
    'core': { paramsTuple?: []; params?: {} }
    'admin.impersonate.status': { paramsTuple?: []; params?: {} }
    'admin.users.index': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'event_stream': { paramsTuple?: []; params?: {} }
    'core': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}