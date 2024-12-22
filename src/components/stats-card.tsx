"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
}

export function StatsCard({ title, value, change, icon: Icon }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        <p className="text-sm text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  )
}