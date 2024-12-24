"use client"

import { Activity, BadgeCheck, Building2, ChevronDown, Download, Plus, Search, Users } from 'lucide-react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Sample data
const stats = [
  {
    name: "Active Employees",
    value: "164",
    change: "+12",
    changeType: "increase",
    icon: Users,
  },
  {
    name: "Departments",
    value: "8",
    change: "0",
    changeType: "neutral",
    icon: Building2,
  },
  {
    name: "Onboarding",
    value: "6",
    change: "+2",
    changeType: "increase",
    icon: BadgeCheck,
  },
  {
    name: "Activity Rate",
    value: "92%",
    change: "+5%",
    changeType: "increase",
    icon: Activity,
  },
]

const departments = [
  { name: "Engineering", count: 45 },
  { name: "Sales", count: 32 },
  { name: "Marketing", count: 18 },
  { name: "Customer Support", count: 24 },
  { name: "Operations", count: 15 },
  { name: "HR", count: 8 },
]

const recentActivity = [
  {
    type: "joined",
    name: "Sarah Chen",
    department: "Engineering",
    date: "2 hours ago",
  },
  {
    type: "role_change",
    name: "Michael Rodriguez",
    department: "Sales",
    date: "5 hours ago",
  },
  {
    type: "department_change",
    name: "Emily Johnson",
    department: "Marketing",
    date: "1 day ago",
  },
]

export default function EmployeesPage() {
  return (
    <div className="flex min-h-screen flex-col space-y-6 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
          <p className="text-muted-foreground">
            Manage your team members and their account permissions here.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="directory">Directory</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search employees..." className="pl-8" />
            </div>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.name}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Department Overview</CardTitle>
                <CardDescription>
                  Employee distribution across departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departments.map((dept) => (
                    <div key={dept.name} className="flex items-center">
                      <div className="w-1/3 text-sm font-medium">
                        {dept.name}
                      </div>
                      <div className="w-full">
                        <div className="flex items-center">
                          <div
                            className="h-2 rounded bg-primary"
                            style={{
                              width: `${(dept.count / 45) * 100}%`,
                            }}
                          />
                          <span className="ml-2 text-sm text-muted-foreground">
                            {dept.count}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates in the last 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between space-x-4"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.department}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity.date}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

