import { createFileRoute, redirect } from '@tanstack/react-router'
import intlayerConfig from '../../intlayer.config'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const defaultLocale =
      intlayerConfig.internationalization?.defaultLocale || 'en'

    throw redirect({
      to: '/$locale',
      params: { locale: defaultLocale },
    })
  },
})
