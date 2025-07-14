import { useState, useEffect } from "react"
import { DragEndEvent } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"

export function useDragAndDrop(initialItems: string[]) {
  const [items, setItems] = useState(initialItems)

  useEffect(() => {
    const savedItems = localStorage.getItem("dashboardItems")
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    }
  }, [])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string)
        const newIndex = items.indexOf(over.id as string)
        const newItems = arrayMove(items, oldIndex, newIndex)
        localStorage.setItem("dashboardItems", JSON.stringify(newItems))
        return newItems
      })
    }
  }

  return {
    items,
    setItems,
    handleDragEnd,
  }
} 