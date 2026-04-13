import { AlertTriangle } from 'lucide-react'
import { Button } from './ui/button'

export const ErrorState = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted p-8 text-muted-foreground">
      <AlertTriangle className="h-10 w-10" />
      <h2 className="text-base font-medium text-foreground">Etwas ist schief gegangen</h2>
      <p className="text-sm text-center">
        Die Wahlergebnisse konnten nicht geladen werden. Bitte versuchen Sie es erneut.
      </p>
      <Button type="button" onClick={onRetry} className="mt-2">
        Erneut versuchen
      </Button>
    </div>
  )
}
