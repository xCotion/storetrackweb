"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"



interface ChartDataItem {
  date: string;
  desktop: number;
  mobile: number;
}
const chartData: ChartDataItem[] = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  // ... (rest of your chart data)
  { date: "2024-06-30", desktop: 446, mobile: 400 },
];

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

export function AreaChartComponent() {
  const uniqueId = React.useId()

  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id={`fillDesktop-${uniqueId}`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-desktop)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-desktop)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id={`fillMobile-${uniqueId}`} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-mobile)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-mobile)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
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
          />
          <ChartTooltip
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
            stroke="var(--color-mobile)"
            stackId="a"
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill={`url(#fillDesktop-${uniqueId})`}
            stroke="var(--color-desktop)"
            stackId="a"
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}