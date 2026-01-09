import viteTsConfigPaths from 'vite-tsconfig-paths'
import { intlayer, intlayerProxy } from 'vite-intlayer'
import { defineConfig } from 'vite'
import path from 'path'
import viteReact from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'

export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json', '../../packages/design-system/tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    intlayer(),
    intlayerProxy(),
  ],
  resolve: {
    alias: {
      '@boilerplate/design-system': path.resolve(__dirname, '../../packages/design-system'),
    },
  },
})
