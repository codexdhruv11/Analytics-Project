import React from "react"
import ReactDOM from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "./App"
import { ThemeProvider } from "./contexts/ThemeContext"
import { FilterProvider } from "./contexts/FilterContext"
import "./index.css"

// Import fonts
import "@fontsource/ibm-plex-sans/400.css"
import "@fontsource/ibm-plex-sans/500.css"
import "@fontsource/ibm-plex-sans/600.css"
import "@fontsource/ibm-plex-mono/400.css"
import "@fontsource/ibm-plex-mono/500.css"
import "@fontsource/space-grotesk/500.css"
import "@fontsource/space-grotesk/700.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
