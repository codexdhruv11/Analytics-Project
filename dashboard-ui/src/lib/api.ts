import { useQuery } from "@tanstack/react-query"

export interface AnalyticsData {
  kpis: {
    totalSales: number
    averageOrderValue: number
    conversionRate: number
    customerCount: number
  }
  salesTrend: {
    date: string
    value: number
  }[]
  regionalData: {
    region: string
    sales: number
    orders: number
  }[]
  deviceUsage: {
    device: string
    percentage: number
  }[]
  trafficSources: {
    source: string
    percentage: number
  }[]
}

async function fetchAnalytics(): Promise<AnalyticsData> {
  const response = await fetch("/api/data")
  if (!response.ok) {
    throw new Error("Failed to fetch analytics data")
  }
  return response.json()
}

export function useAnalytics() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
    refetchInterval: 5000, // Refetch every 5 seconds
    staleTime: 4000, // Consider data stale after 4 seconds
  })
}

export function useFilteredAnalytics(dateRange: [Date, Date], searchTerm: string) {
  return useQuery({
    queryKey: ["analytics", dateRange, searchTerm],
    queryFn: fetchAnalytics,
    select: (data) => {
      const [startDate, endDate] = dateRange
      return {
        ...data,
        salesTrend: data.salesTrend.filter((item) => {
          const date = new Date(item.date)
          return date >= startDate && date <= endDate
        }),
        regionalData: data.regionalData.filter((item) =>
          item.region.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }
    },
    refetchInterval: 5000,
    staleTime: 4000,
  })
} 