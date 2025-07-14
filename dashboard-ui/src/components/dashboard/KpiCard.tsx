import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import CountUp from "react-countup"
import { ArrowDown, ArrowUp, GripHorizontal } from "lucide-react"
import { cn, formatCurrency, formatNumber, formatPercentage } from "@/lib/utils"

interface KpiCardProps {
  id: string
  title: string
  value: number
  previousValue: number
  prefix?: string
  format?: "number" | "currency" | "percentage"
  icon?: React.ReactNode
}

export function KpiCard({
  id,
  title,
  value,
  previousValue,
  prefix,
  format = "number",
  icon,
}: KpiCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const formatValue = (value: number) => {
    switch (format) {
      case "currency":
        return formatCurrency(value)
      case "percentage":
        return formatPercentage(value)
      default:
        return formatNumber(value)
    }
  }

  const percentageChange = ((value - previousValue) / previousValue) * 100
  const isPositive = percentageChange > 0

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute right-2 top-2 cursor-grab opacity-0 transition-opacity group-hover:opacity-100"
      >
        <GripHorizontal className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="flex items-center space-x-2">
        {icon && <div className="text-muted-foreground">{icon}</div>}
        <h3 className="font-display text-sm font-medium text-muted-foreground">
          {title}
        </h3>
      </div>

      <div className="mt-3">
        <div className="font-mono text-2xl font-medium">
          {prefix}
          <CountUp
            end={value}
            formattingFn={formatValue}
            preserveValue
            duration={1}
          />
        </div>
        <div className="mt-1 flex items-center space-x-2">
          <div
            className={cn(
              "flex items-center space-x-1 text-sm",
              isPositive ? "text-green-500" : "text-red-500"
            )}
          >
            {isPositive ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            <span>
              {Math.abs(percentageChange).toFixed(1)}%
            </span>
          </div>
          <span className="text-sm text-muted-foreground">vs last period</span>
        </div>
      </div>
    </div>
  )
} 