import { BarChart3 } from 'lucide-react'

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-gray-500">
      <BarChart3 className="h-10 w-10" />
      <h2 className="text-base font-medium text-gray-700">Wählen Sie ein Gebiet</h2>
      <p className="text-sm text-center">
        Suchen Sie nach einem Bundesland, Wahlkreis oder dem Bundesgebiet, um die Wahlergebnisse zu sehen.
      </p>
    </div>
  )
}
