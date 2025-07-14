import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { format, parseISO } from "date-fns"
import { useTheme } from "@/contexts/ThemeContext"
import { getThemeColors } from "@/lib/utils"

interface SalesChartProps {
  data: {
    date: string
    value: number
  }[]
}

export function SalesChart({ data }: SalesChartProps) {
  const { theme } = useTheme()
  const colors = getThemeColors(theme)

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.accent} stopOpacity={0.1} />
            <stop offset="95%" stopColor={colors.accent} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tickFormatter={(date) => format(parseISO(date), "MMM d")}
          stroke={colors.text}
          fontSize={12}
          tickLine={false}
          axisLine={false}
          dy={10}
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
        <CartesianGrid
          stroke={colors.secondary}
          strokeDasharray="3 3"
          vertical={false}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length && typeof label === "string") {
              const value = payload.find((p) => p.dataKey === "value")?.value
              return (
                <div className="rounded-lg border bg-card p-2 shadow-sm">
                  <div className="font-mono text-sm">
                    {format(parseISO(label), "MMM d, yyyy")}
                  </div>
                  <div className="font-mono text-lg font-medium">
                    {typeof value === "number" &&
                      new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(value)}
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={colors.accent}
          strokeWidth={2}
          fill="url(#salesGradient)"
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
} 