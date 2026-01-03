export const controllers = {
  admin: {
    AdminImpersonation: () => import('#app/admin/controllers/admin_impersonation_controller'),
    AdminUsers: () => import('#app/admin/controllers/admin_users_controller'),
  },
  auth: {
    Auth: () => import('#app/auth/controllers/auth_controller'),
    Email: () => import('#app/auth/controllers/email_controller'),
    Password: () => import('#app/auth/controllers/password_controller'),
  },
  core: {
    HealthChecks: () => import('#app/core/controllers/health_checks_controller'),
  },
}
