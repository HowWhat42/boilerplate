import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'event_stream': { paramsTuple?: []; params?: {} }
    'subscribe': { paramsTuple?: []; params?: {} }
    'unsubscribe': { paramsTuple?: []; params?: {} }
    'core': { paramsTuple?: []; params?: {} }
    'admin_impersonation.impersonate_user': { paramsTuple: [ParamValue]; params: {'user_id': ParamValue} }
    'admin_impersonation.stop_impersonation': { paramsTuple?: []; params?: {} }
    'admin_impersonation.impersonation_status': { paramsTuple?: []; params?: {} }
    'admin_users.index': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'email.verify_email': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'email.resend_verification_email': { paramsTuple?: []; params?: {} }
    'password.forgot_password': { paramsTuple?: []; params?: {} }
    'password.reset_password': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
  }
  GET: {
    'event_stream': { paramsTuple?: []; params?: {} }
    'core': { paramsTuple?: []; params?: {} }
    'admin_impersonation.impersonation_status': { paramsTuple?: []; params?: {} }
    'admin_users.index': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'event_stream': { paramsTuple?: []; params?: {} }
    'core': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'subscribe': { paramsTuple?: []; params?: {} }
    'unsubscribe': { paramsTuple?: []; params?: {} }
    'admin_impersonation.impersonate_user': { paramsTuple: [ParamValue]; params: {'user_id': ParamValue} }
    'admin_impersonation.stop_impersonation': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'email.verify_email': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
    'email.resend_verification_email': { paramsTuple?: []; params?: {} }
    'password.forgot_password': { paramsTuple?: []; params?: {} }
    'password.reset_password': { paramsTuple: [ParamValue]; params: {'token': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}