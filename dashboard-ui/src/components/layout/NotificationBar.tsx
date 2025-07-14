import { useState } from "react"
import { AlertCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "info" | "warning" | "error"
  message: string
}

const defaultNotifications: Notification[] = [
  {
    id: "1",
    type: "info",
    message: "Analytics data is being updated every 5 seconds",
  },
]

export function NotificationBar() {
  const [notifications, setNotifications] = useState(defaultNotifications)

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  if (notifications.length === 0) return null

  return (
    <div className="border-b bg-card">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={cn(
            "flex items-center justify-between px-4 py-2",
            notification.type === "warning" && "bg-yellow-50/50",
            notification.type === "error" && "bg-red-50/50"
          )}
        >
          <div className="flex items-center space-x-2">
            <AlertCircle
              className={cn(
                "h-4 w-4",
                notification.type === "info" && "text-blue-500",
                notification.type === "warning" && "text-yellow-500",
                notification.type === "error" && "text-red-500"
              )}
            />
            <span className="text-sm">{notification.message}</span>
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="rounded-full p-1 hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
} 