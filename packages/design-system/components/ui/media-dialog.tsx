import * as React from 'react'
import { useState } from 'react'

import { Dialog, DialogContent, DialogTrigger } from './dialog'
import { cn } from '../../lib/utils'

export interface Media {
  url: string
  name?: string
  type?: string
}

interface MediaDialogProps {
  children: React.ReactNode
  modal?: boolean
  src: string
  alt?: string
  className?: string
}

const MediaDialog = ({ children, modal, src, alt = 'Image', className }: MediaDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  if (!src) {
    return <>{children}</>
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={modal}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!max-w-[100vw] w-full !h-[100vh] border-0 p-0 m-0 flex items-center justify-center">
        <img
          src={src}
          alt={alt}
          className={cn(
            'max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl',
            className,
          )}
        />
      </DialogContent>
    </Dialog>
  )
}

export { MediaDialog }
