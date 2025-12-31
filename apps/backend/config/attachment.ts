import { InferConverters } from '@jrmc/adonis-attachment/types/config'
// import sharp from 'sharp'
import { defineConfig } from '@jrmc/adonis-attachment'

/**
 * Documentation: https://adonis-attachment.jrmc.dev/guide/essentials/configuration
 */

const attachmentConfig = defineConfig({
  converters: {
    thumbnail: {
      converter: () => import('@jrmc/adonis-attachment/converters/image_converter'),
      options: {
        resize: 300,
      },
    },
  },
})

export default attachmentConfig

declare module '@jrmc/adonis-attachment' {
  interface AttachmentVariants extends InferConverters<typeof attachmentConfig> {}
}
