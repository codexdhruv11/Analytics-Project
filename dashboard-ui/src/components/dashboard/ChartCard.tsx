import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Expand, GripHorizontal, Minimize } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChartCardProps {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}

export function ChartCard({ id, title, children, className }: ChartCardProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative rounded-lg border bg-card shadow-sm transition-all hover:shadow-md",
        isFullscreen &&
          "fixed inset-4 z-50 m-4 h-[calc(100vh-2rem)] overflow-auto",
        !isFullscreen && className
      )}
    >
      <div className="flex items-center justify-between border-b p-4">
        <h3 className="font-display text-lg font-medium">{title}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleFullscreen}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Expand className="h-4 w-4" />
            )}
          </button>
          {!isFullscreen && (
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab rounded-lg p-1.5 text-muted-foreground opacity-0 hover:bg-accent hover:text-accent-foreground group-hover:opacity-100"
            >
              <GripHorizontal className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
} 