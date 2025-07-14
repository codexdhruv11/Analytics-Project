import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return format(date, "MMM dd, yyyy")
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100)
}

export function getThemeColors(theme: string) {
  const themes = {
    light: {
      background: "#ffffff",
      text: "#1e293b",
      primary: "#0f172a",
      secondary: "#64748b",
      accent: "#3b82f6",
    },
    dark: {
      background: "#0f172a",
      text: "#f8fafc",
      primary: "#e2e8f0",
      secondary: "#94a3b8",
      accent: "#60a5fa",
    },
    blue: {
      background: "#f0f7ff",
      text: "#1e3a8a",
      primary: "#2563eb",
      secondary: "#60a5fa",
      accent: "#3b82f6",
    },
  }

  return themes[theme as keyof typeof themes] || themes.light
}

export function downloadCSV(data: any[], filename: string) {
  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(","),
    ...data.map(row => headers.map(header => JSON.stringify(row[header])).join(",")),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", `${filename}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
} 