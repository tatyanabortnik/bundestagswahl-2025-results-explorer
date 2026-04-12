import { AlertTriangle } from 'lucide-react'

export const ErrorState = ({ onRetry }: { onRetry: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-gray-500">
      <AlertTriangle className="h-10 w-10" />
      <h2 className="text-base font-medium text-gray-700">Etwas ist schief gegangen</h2>
      <p className="text-sm text-center">
        Die Wahlergebnisse konnten nicht geladen werden. Bitte versuchen Sie es erneut.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-2 px-4 py-2 rounded-md bg-gray-700 text-white text-sm hover:bg-gray-600 transition-colors"
      >
        Erneut versuchen
      </button>
    </div>
  )
}
