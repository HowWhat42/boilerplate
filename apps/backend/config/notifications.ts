import type { InferChannels } from '@facteurjs/adonisjs/types'

import { defineConfig, channels } from '@facteurjs/adonisjs'

const config = defineConfig({
  channels: {
    transmit: channels.transmit(),
  },

  preferences: {
    global: {
      channels: {
        transmit: true,
      },
    },
  },
})

export default config

declare module '@facteurjs/adonisjs/types' {
  interface NotificationChannels extends InferChannels<typeof config> {}
}
