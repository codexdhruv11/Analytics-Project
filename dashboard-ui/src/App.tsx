import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"
import { useState } from "react"
import { useAnalytics } from "./lib/api"
import { useTheme } from "./contexts/ThemeContext"
import { useFilter } from "./contexts/FilterContext"
import { Sidebar } from "./components/layout/Sidebar"
import { TopBar } from "./components/layout/TopBar"
import { NotificationBar } from "./components/layout/NotificationBar"
import { DashboardGrid } from "./components/dashboard/DashboardGrid"

function App() {
  const { theme } = useTheme()
  const { dateRange, searchTerm } = useFilter()
  const { data, isLoading, error } = useAnalytics()
  const [items, setItems] = useState<string[]>([
    "sales",
    "orders",
    "customers",
    "conversion",
    "salesChart",
    "regionalChart",
    "deviceChart",
    "trafficChart",
  ])

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string)
        const newIndex = items.indexOf(over.id as string)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-destructive">Error loading analytics data</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <TopBar />
        <NotificationBar />
        <main className="flex-1 overflow-auto p-6">
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items}>
              <DashboardGrid
                items={items}
                data={data}
                isLoading={isLoading}
                theme={theme}
                dateRange={dateRange}
                searchTerm={searchTerm}
              />
            </SortableContext>
          </DndContext>
        </main>
      </div>
    </div>
  )
}

export default App
