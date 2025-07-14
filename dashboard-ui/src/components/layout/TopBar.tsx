import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Calendar, Download, Moon, Search, Sun } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { useFilter } from "@/contexts/FilterContext"
import { cn } from "@/lib/utils"

export function TopBar() {
  const { theme, setTheme } = useTheme()
  const { searchTerm, setSearchTerm } = useFilter()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex h-14 items-center justify-between border-b bg-card px-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="font-mono text-sm text-muted-foreground">
            {format(time, "HH:mm:ss")}
          </span>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search regions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 rounded-md border bg-background pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={cn(
            "rounded-lg p-2 hover:bg-accent",
            theme === "dark" ? "text-accent-foreground" : "text-muted-foreground"
          )}
        >
          {theme === "dark" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>
        <button
          onClick={() => {
            // TODO: Implement CSV export
          }}
          className="flex items-center space-x-1 rounded-lg p-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>
    </div>
  )
} 