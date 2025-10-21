import env from '#start/env'
import { defineConfig, transports, Message as MailMessage } from '@adonisjs/mail'
import { render } from '@react-email/render'

const mailConfig = defineConfig({
  default: 'smtp',

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

MailMessage.templateEngine = {
  async render(templatePath: string, _: any, data: any) {
    const emailModule = await import(templatePath)
    const EmailComponent = emailModule.default

    return await render(EmailComponent(data))
  },
}

export default mailConfig

declare module '@adonisjs/mail/types' {
  export interface MailersList extends InferMailers<typeof mailConfig> {}
}
