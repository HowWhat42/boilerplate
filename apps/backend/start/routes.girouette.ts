/*
|--------------------------------------------------------------------------
| Girouette routes loader file
|--------------------------------------------------------------------------
|
| DO NOT MODIFY THIS FILE AS IT WILL BE OVERRIDDEN DURING THE BUILD PROCESS
|
| It automatically register your resolvers present in `./app`.
| You can disable this behavior by removing the `indexControllers` from your `adonisrc.ts`.
|
*/

import app from '@adonisjs/core/services/app'
import girouette from '@adonisjs-community/girouette/services/main'

await girouette.controllers([
  () => import('#app/admin/controllers/admin_impersonation_controller'),
  () => import('#app/admin/controllers/admin_users_controller'),
  () => import('#app/auth/controllers/auth_controller'),
  () => import('#app/auth/controllers/email_controller'),
  () => import('#app/auth/controllers/password_controller'),
  () => import('#app/core/controllers/health_checks_controller'),
])

girouette.hmr(app.makePath('./app'))
