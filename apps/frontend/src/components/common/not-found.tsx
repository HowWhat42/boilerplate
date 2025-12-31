import { useIntlayer } from 'react-intlayer'
import { ArrowLeft, TriangleAlertIcon } from 'lucide-react'
import { Button } from '@boilerplate/design-system/components/ui/button'

export function NotFound({ children }: { children?: any }) {
  const content = useIntlayer('common')

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <div className="p-4 rounded-full bg-red-100">
          <TriangleAlertIcon className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold">{content.notFound.errorLoading}</h3>
        <p className="text-muted-foreground">{children}</p>
        <Button onClick={() => window.location.reload()} variant="outline" className="mt-2">
          {content.notFound.retry}
        </Button>
        <Button
          onClick={() => window.history.go(-1)}
          variant="ghost"
          className="text-muted-foreground mt-2 hover:text-gray-600 hover:bg-transparent"
        >
          <ArrowLeft />
          {content.notFound.goBack}
        </Button>
      </div>
    </div>
  )
}
