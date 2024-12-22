"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip, Legend } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Sample Chart Data and Config remain the same
const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function AreaChartInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")
  const uniqueId = React.useId()

  // Filter data based on selected time range
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[250px] w-full"
      >
        <AreaChart data={filteredData}>
          <defs>
            <linearGradient id={`fillDesktop-${uniqueId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id={`fillMobile-${uniqueId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            }}
            tick={{ fill: "hsl(var(--foreground))" }}
          />
          <Tooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
                indicator="dot"
              />
            }
          />
          <Area
            dataKey="mobile"
            type="natural"
            fill={`url(#fillMobile-${uniqueId})`}
            stroke="hsl(var(--chart-2))"
            stackId="a"
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill={`url(#fillDesktop-${uniqueId})`}
            stroke="hsl(var(--chart-1))"
            stackId="a"
          />
          <Legend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}