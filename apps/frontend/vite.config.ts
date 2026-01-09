import viteTsConfigPaths from 'vite-tsconfig-paths'
import { intlayer, intlayerProxy } from 'vite-intlayer'
import { defineConfig, PluginOption } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import { wrapVinxiConfigWithSentry } from '@sentry/tanstackstart-react'
import { cloudflare } from '@cloudflare/vite-plugin'

const config = defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }) as PluginOption,
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    intlayer(),
    intlayerProxy(),
  ],
})

export default wrapVinxiConfigWithSentry(config, {
  org: process.env.VITE_SENTRY_ORG,
  project: process.env.VITE_SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // Only print logs for uploading source maps in CI
  // Set to `true` to suppress logs
  silent: !process.env.CI,
})
