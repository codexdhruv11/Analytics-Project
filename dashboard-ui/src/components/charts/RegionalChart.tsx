import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useTheme } from "@/contexts/ThemeContext"
import { getThemeColors } from "@/lib/utils"

interface RegionalChartProps {
  data: {
    region: string
    sales: number
    orders: number
  }[]
}

export function RegionalChart({ data }: RegionalChartProps) {
  const { theme } = useTheme()
  const colors = getThemeColors(theme)

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid
          stroke={colors.secondary}
          strokeDasharray="3 3"
          vertical={false}
        />
        <XAxis
          dataKey="region"
          stroke={colors.text}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          interval={0}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis
          stroke={colors.text}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>
            new Intl.NumberFormat("en-US", {
              notation: "compact",
              compactDisplay: "short",
            }).format(value)
          }
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const sales = payload.find((p) => p.dataKey === "sales")?.value
              const orders = payload.find((p) => p.dataKey === "orders")?.value
              return (
                <div className="rounded-lg border bg-card p-2 shadow-sm">
                  <div className="font-mono text-sm">{label}</div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: colors.primary }}
                      />
                      <span className="font-mono text-sm">
                        Sales:{" "}
                        {typeof sales === "number" &&
                          new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(sales)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: colors.accent }}
                      />
                      <span className="font-mono text-sm">
                        Orders: {typeof orders === "number" && orders}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend
          formatter={(value) => (
            <span className="font-mono text-sm">{value}</span>
          )}
        />
        <Bar
          dataKey="sales"
          name="Sales"
          fill={colors.primary}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="orders"
          name="Orders"
          fill={colors.accent}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
} 