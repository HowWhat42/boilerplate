import { intlayer, intlayerProxy } from 'vite-intlayer'
import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { devtools } from '@tanstack/devtools-vite'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  plugins: [
    devtools(),
    nitro(),
    tailwindcss(),
    tanstackStart({ spa: { enabled: true } }),
    viteReact(),
    intlayer(),
    intlayerProxy(),
  ],

  resolve: {
    alias: {
      '@': `${import.meta.dirname}/src`,
    },
  },
})

export default config
