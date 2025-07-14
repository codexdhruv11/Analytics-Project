import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Home,
  LineChart,
  PieChart,
  Settings,
} from "lucide-react"

const navItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "sales", label: "Sales Analytics", icon: LineChart },
  { id: "regional", label: "Regional Data", icon: BarChart3 },
  { id: "devices", label: "Device Usage", icon: PieChart },
  { id: "settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <aside
      className={cn(
        "relative flex h-screen flex-col border-r bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center justify-between border-b px-4">
        {!collapsed && (
          <span className="font-display text-lg font-bold">Analytics</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 hover:bg-accent"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "flex w-full items-center rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                collapsed ? "justify-center" : "justify-start space-x-3"
              )}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>
    </aside>
  )
} 