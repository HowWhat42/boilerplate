import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'shopkeeper.webhook': { paramsTuple?: []; params?: {} }
    event_stream: { paramsTuple?: []; params?: {} }
    subscribe: { paramsTuple?: []; params?: {} }
    unsubscribe: { paramsTuple?: []; params?: {} }
    core: { paramsTuple?: []; params?: {} }
    'admin impersonation.impersonateUser': {
      paramsTuple: [ParamValue]
      params: { user_id: ParamValue }
    }
    'admin impersonation.stopImpersonation': { paramsTuple?: []; params?: {} }
    'admin impersonation.impersonationStatus': { paramsTuple?: []; params?: {} }
    'admin users.index': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'email.verifyEmail': { paramsTuple: [ParamValue]; params: { token: ParamValue } }
    'email.resendVerificationEmail': { paramsTuple?: []; params?: {} }
    'password.forgotPassword': { paramsTuple?: []; params?: {} }
    'password.resetPassword': { paramsTuple: [ParamValue]; params: { token: ParamValue } }
  }
  POST: {
    'shopkeeper.webhook': { paramsTuple?: []; params?: {} }
    subscribe: { paramsTuple?: []; params?: {} }
    unsubscribe: { paramsTuple?: []; params?: {} }
    'admin impersonation.impersonateUser': {
      paramsTuple: [ParamValue]
      params: { user_id: ParamValue }
    }
    'admin impersonation.stopImpersonation': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'email.verifyEmail': { paramsTuple: [ParamValue]; params: { token: ParamValue } }
    'email.resendVerificationEmail': { paramsTuple?: []; params?: {} }
    'password.forgotPassword': { paramsTuple?: []; params?: {} }
    'password.resetPassword': { paramsTuple: [ParamValue]; params: { token: ParamValue } }
  }
  GET: {
    event_stream: { paramsTuple?: []; params?: {} }
    core: { paramsTuple?: []; params?: {} }
    'admin impersonation.impersonationStatus': { paramsTuple?: []; params?: {} }
    'admin users.index': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    event_stream: { paramsTuple?: []; params?: {} }
    core: { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}
