
import { LoadingSpinner } from "./LoadingSpinner"

interface LoadingOverlayProps {
  fullScreen?: boolean
  message?: string
  className?: string
}

export function LoadingOverlay({ fullScreen = false, message = "Cargando...", className }: LoadingOverlayProps) {
  const positionClasses = fullScreen ? "fixed inset-0" : "absolute inset-0"
  const combinedClasses = `${positionClasses} z-50 flex flex-col items-center justify-center bg-white/80 ${className || ""}`

  return (
    <div className={combinedClasses}>
      <LoadingSpinner size="xl" />
      {message && (
        <p className="mt-6 text-lg font-medium text-[#1C1C4D]">{message}</p>
      )}
    </div>
  )
}
