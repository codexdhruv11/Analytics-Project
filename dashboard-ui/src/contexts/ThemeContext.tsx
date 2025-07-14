import React, { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "blue"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme
    return savedTheme || "light"
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark", "blue")
    root.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const value = {
    theme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
} 