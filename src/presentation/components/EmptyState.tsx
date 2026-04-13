import { BarChart3 } from 'lucide-react'

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted p-8 text-muted-foreground">
      <BarChart3 className="h-10 w-10" />
      <h2 className="text-base font-medium text-foreground">Wählen Sie ein Gebiet</h2>
      <p className="text-sm text-center">
        Suchen Sie nach einem Bundesland, Wahlkreis oder dem Bundesgebiet, um die Wahlergebnisse zu sehen.
      </p>
    </div>
  )
}
