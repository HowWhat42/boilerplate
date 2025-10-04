import env from '#start/env'
import { defineConfig, transports } from '@adonisjs/mail'

const mailConfig = defineConfig({
  default: 'resend',

  from: {
    name: 'Boilerplate',
    address: 'noreply@boilerplate.com',
  },

  /**
   * The mailers object can be used to configure multiple mailers
   * each using a different transport or same transport with different
   * options.
   */
  mailers: {
    smtp: transports.smtp({
      host: env.get('SMTP_HOST'),
      port: env.get('SMTP_PORT'),
    }),
    resend: transports.resend({
      key: env.get('RESEND_API_KEY'),
      baseUrl: 'https://api.resend.com',
    }),
  },
})

export default mailConfig

declare module '@adonisjs/mail/types' {
  export interface MailersList extends InferMailers<typeof mailConfig> {}
}
