import type { ReactNode } from "react"

type StatCardProps = {
  title: string | ReactNode
  icon?: ReactNode
  iconColor?: string
  children: ReactNode
  className?: string
}

const StatCard = ({ title, icon, iconColor = "#6B7280", children, className = "" }: StatCardProps) => {
  const titleContent =
    typeof title === "string"
      ? title.split(" ").map((word, index) => (
          <div
            key={index}
            style={{ color: iconColor }}
            className="truncate font-medium text-xs md:text-sm whitespace-normal"
          >
            {word}
          </div>
        ))
      : title
  if (!icon) {
    return (
      <div className={`bg-white rounded-lg shadow-sm p-4 md:p-6 ${className}`}>
        <div className="mb-4">
          <div className="text-sm md:text-base font-medium text-gray-800">
            {typeof title === "string" ? title : title}
          </div>
        </div>
        <div>{children}</div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 md:p-6 ${className}`}>
      <div className="flex flex-col md:grid md:grid-cols-7 md:gap-4 md:items-start">
        <div
          style={{ borderColor: iconColor }}
          className="w-full md:w-auto border-2 rounded-lg p-2 md:p-3 mb-4 md:mb-0 flex-shrink-0"
        >
          <div className="flex items-center justify-center md:justify-start">
            <div style={{ color: iconColor }} className="w-4 h-4 md:w-5 md:h-5 mr-1 flex-shrink-0">
              {icon}
            </div>
            <div className="text-center md:text-left overflow-hidden">{titleContent}</div>
          </div>
        </div>
        <div className="md:col-span-6 md:grid md:grid-cols-6 md:gap-4">{children}</div>
      </div>
    </div>
  )
}

export default StatCard
