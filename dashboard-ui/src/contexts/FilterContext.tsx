import React, { createContext, useContext, useState } from "react"
import { startOfMonth, endOfMonth } from "date-fns"

interface FilterContextType {
  dateRange: [Date, Date]
  setDateRange: (range: [Date, Date]) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [dateRange, setDateRange] = useState<[Date, Date]>(() => {
    const today = new Date()
    return [startOfMonth(today), endOfMonth(today)]
  })

  const [searchTerm, setSearchTerm] = useState("")

  const value = {
    dateRange,
    setDateRange,
    searchTerm,
    setSearchTerm,
  }

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export function useFilter() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider")
  }
  return context
} 