import { AnalyticsData } from "@/lib/api"
import { downloadCSV } from "@/lib/utils"

export function useCsvExport() {
  const exportData = (data: AnalyticsData, type: "sales" | "regional" | "device" | "traffic") => {
    switch (type) {
      case "sales":
        downloadCSV(
          data.salesTrend.map((item) => ({
            Date: item.date,
            Sales: item.value,
          })),
          "sales-trend"
        )
        break
      case "regional":
        downloadCSV(
          data.regionalData.map((item) => ({
            Region: item.region,
            Sales: item.sales,
            Orders: item.orders,
          })),
          "regional-performance"
        )
        break
      case "device":
        downloadCSV(
          data.deviceUsage.map((item) => ({
            Device: item.device,
            Percentage: item.percentage,
          })),
          "device-usage"
        )
        break
      case "traffic":
        downloadCSV(
          data.trafficSources.map((item) => ({
            Source: item.source,
            Percentage: item.percentage,
          })),
          "traffic-sources"
        )
        break
    }
  }

  return { exportData }
} 