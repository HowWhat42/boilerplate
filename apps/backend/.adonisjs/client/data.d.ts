import type { InferSharedProps } from '@adonisjs/inertia/types'
/// <reference path="./manifest.d.ts" />
import type { InferData, InferVariants } from '@adonisjs/core/types/transformers'
import type InertiaMiddleware from '#middleware/inertia_middleware'

export namespace Data {
  export type SharedProps = InferSharedProps<InertiaMiddleware>
}
