import { DollarSign, ShoppingCart, Users } from "lucide-react"
import { KpiCard } from "./KpiCard"
import { ChartCard } from "./ChartCard"
import { SalesChart } from "../charts/SalesChart"
import { RegionalChart } from "../charts/RegionalChart"
import { DeviceChart } from "../charts/DeviceChart"
import { TrafficChart } from "../charts/TrafficChart"
import { AnalyticsData } from "@/lib/api"

interface DashboardGridProps {
  items: string[]
  data: AnalyticsData | undefined
  isLoading: boolean
  theme: string
  dateRange: [Date, Date]
  searchTerm: string
}

export function DashboardGrid({
  items,
  data,
  isLoading,
}: DashboardGridProps) {
  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-[350px] animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    )
  }

  const renderItem = (id: string) => {
    switch (id) {
      case "sales":
        return (
          <KpiCard
            id={id}
            title="Total Sales"
            value={data.kpis.totalSales}
            previousValue={data.kpis.totalSales * 0.8}
            prefix="$"
            format="currency"
            icon={<DollarSign className="h-4 w-4" />}
          />
        )
      case "orders":
        return (
          <KpiCard
            id={id}
            title="Total Orders"
            value={data.kpis.customerCount}
            previousValue={data.kpis.customerCount * 0.9}
            format="number"
            icon={<ShoppingCart className="h-4 w-4" />}
          />
        )
      case "customers":
        return (
          <KpiCard
            id={id}
            title="Total Customers"
            value={data.kpis.customerCount}
            previousValue={data.kpis.customerCount * 0.85}
            format="number"
            icon={<Users className="h-4 w-4" />}
          />
        )
      case "conversion":
        return (
          <KpiCard
            id={id}
            title="Conversion Rate"
            value={data.kpis.conversionRate}
            previousValue={data.kpis.conversionRate * 0.95}
            format="percentage"
          />
        )
      case "salesChart":
        return (
          <ChartCard id={id} title="Sales Trend" className="col-span-2">
            <SalesChart data={data.salesTrend} />
          </ChartCard>
        )
      case "regionalChart":
        return (
          <ChartCard id={id} title="Regional Performance" className="col-span-2">
            <RegionalChart data={data.regionalData} />
          </ChartCard>
        )
      case "deviceChart":
        return (
          <ChartCard id={id} title="Device Usage">
            <DeviceChart data={data.deviceUsage} />
          </ChartCard>
        )
      case "trafficChart":
        return (
          <ChartCard id={id} title="Traffic Sources">
            <TrafficChart data={data.trafficSources} />
          </ChartCard>
        )
      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((id) => (
        <div key={id} className={id.includes("Chart") ? "col-span-2" : ""}>
          {renderItem(id)}
        </div>
      ))}
    </div>
  )
} 