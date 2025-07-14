import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { useTheme } from "@/contexts/ThemeContext"
import { getThemeColors } from "@/lib/utils"

interface TrafficChartProps {
  data: {
    source: string
    percentage: number
  }[]
}

export function TrafficChart({ data }: TrafficChartProps) {
  const { theme } = useTheme()
  const colors = getThemeColors(theme)

  const COLORS = [colors.primary, colors.accent, colors.secondary]

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill={colors.primary}
          dataKey="percentage"
          nameKey="source"
          label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
            if (typeof cx !== "number" || typeof cy !== "number" || typeof midAngle !== "number" || 
                typeof innerRadius !== "number" || typeof outerRadius !== "number" || typeof value !== "number") {
              return null
            }
            const RADIAN = Math.PI / 180
            const radius = 25 + outerRadius
            const x = cx + radius * Math.cos(-midAngle * RADIAN)
            const y = cy + radius * Math.sin(-midAngle * RADIAN)

            return (
              <text
                x={x}
                y={y}
                className="fill-current font-mono text-sm"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
              >
                {`${value.toFixed(1)}%`}
              </text>
            )
          }}
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              strokeWidth={0}
            />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              return (
                <div className="rounded-lg border bg-card p-2 shadow-sm">
                  <div className="font-mono text-sm">{data.source}</div>
                  <div className="font-mono text-lg font-medium">
                    {data.percentage.toFixed(1)}%
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
      </PieChart>
    </ResponsiveContainer>
  )
} 