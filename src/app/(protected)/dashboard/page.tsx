"use client"

import * as React from "react"
import { Users, CreditCard, Activity, DollarSign, TrendingUp, Download } from 'lucide-react'
import { AreaChartInteractive } from "@/components/charts/area-chart-interactive"
import { AreaChartComponent } from "@/components/charts/area-chart"
import { RadarChartComponent } from "@/components/charts/radar-chart"
import { StatsCard } from "@/components/stats-card"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Page() {
  const [selected, setSelected] = React.useState("Overview")

  return (
    <div className="space-y-6 mt-8">
      {/* Header with Navigation and Date/Download on same line */}
      <div className="flex items-center justify-between pb-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            {["Overview", "Analytics", "Reports", "Notifications"].map((item) => (
              <Button
                key={item}
                variant="ghost"
                className={`h-8 ${selected === item ? "text-primary" : "text-muted-foreground"} hover:text-primary`}
                size="sm"
                onClick={() => setSelected(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <time className="text-sm text-muted-foreground">
            Jan 20, 2023 - Feb 09, 2023
          </time>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="$45,231.89"
          change="+20.1% from last month"
          icon={DollarSign}
        />
        <StatsCard
          title="Subscriptions"
          value="+2,350"
          change="+180.1% from last month"
          icon={Users}
        />
        <StatsCard
          title="Sales"
          value="+12,234"
          change="+19% from last month"
          icon={CreditCard}
        />
        <StatsCard
          title="Active Now"
          value="+573"
          change="+201 since last hour"
          icon={Activity}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Area Chart - Gradient</CardTitle>
            <CardDescription>
              Showing total visitors for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChartComponent />
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium">
                  Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Performance</CardTitle>
            <CardDescription>Monthly performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <RadarChartComponent />
          </CardContent>
        </Card>
      </div>

      {/* Visitors Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Visitors</CardTitle>
          <CardDescription>Interactive area chart showing visitor data</CardDescription>
        </CardHeader>
        <CardContent>
          <AreaChartInteractive />
        </CardContent>
      </Card>
    </div>
  )
}

