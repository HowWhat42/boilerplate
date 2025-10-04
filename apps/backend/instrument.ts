import * as Sentry from '@sentry/node'
import env from '#start/env'

Sentry.init({
  dsn: env.get('SENTRY_DSN'),
  integrations: [Sentry.knexIntegration()],
  tracesSampleRate: 1.0, // You might want to reduce this value in production
})
