"use client"

import * as React from "react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const radarData = [
  { subject: "January", A: 186, B: 80 },
  { subject: "February", A: 305, B: 200 },
  { subject: "March", A: 237, B: 120 },
  { subject: "April", A: 73, B: 190 },
  { subject: "May", A: 209, B: 130 },
  { subject: "June", A: 214, B: 140 },
]

const radarChartConfig = {
  A: {
    label: "Metric A",
    color: "hsl(var(--chart-1))",
  },
  B: {
    label: "Metric B",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function RadarChartComponent() {
  return (
    <ChartContainer config={radarChartConfig} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <Radar
            name="Metric A"
            dataKey="A"
            stroke="hsl(var(--chart-1))"
            fill={`hsl(var(--chart-1))`}
            fillOpacity={0.6}
          />
          <Radar
            name="Metric B"
            dataKey="B"
            stroke="hsl(var(--chart-2))"
            fill={`hsl(var(--chart-2))`}
            fillOpacity={0.6}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegendContent />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}