
interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export const LoadingSpinner = ({ size = "md", className }: LoadingSpinnerProps) => {
  const sizeMap: Record<string, string> = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-10 w-10",
  }

  const classes = `animate-spin rounded-full border-4 border-[#D1D5DB] border-t-[#00B6B1] ${sizeMap[size]} ${className || ""}`

  return <div className={classes} />
}
