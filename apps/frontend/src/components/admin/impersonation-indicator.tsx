import { useIntlayer } from 'react-intlayer'
import { LogOutIcon } from 'lucide-react'
import { Button } from '@boilerplate/design-system/components/ui/button'

import { useImpersonation } from '@/hooks/use-impersonation'

export function ImpersonationIndicator() {
  const content = useIntlayer('admin')
  const { isImpersonating, currentUser, originalAdmin, stopImpersonation, isLoading } =
    useImpersonation()

  if (!isImpersonating || !currentUser || !originalAdmin) {
    return null
  }

  return (
    <div className="flex items-center gap-3 bg-secondary rounded-md p-2 h-8">
      <div className="text-sm">
        <span className="text-muted-foreground">{content.loggedInAs}</span>
        <span className="font-medium">
          {currentUser.firstName} {currentUser.lastName}
        </span>
      </div>
      <Button
        size="sm"
        className="h-6"
        variant="outline"
        onClick={() => stopImpersonation()}
        disabled={isLoading}
      >
        <LogOutIcon className="size-4" />
        {content.returnTo({ name: originalAdmin.firstName })}
      </Button>
    </div>
  )
}
