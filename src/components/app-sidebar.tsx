"use client"

import * as React from "react"
import {

  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  LayoutDashboard,
  Users,
  Briefcase,
  Package,
  Boxes,
  DollarSign,
  Truck,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-sales-channels"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ThemeProvider } from "next-themes"

const data = {
  user: {
    name: "Ashton",
    email: "ashton_clear@outlook.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "Inventory",
      url: "consultant",
      icon: Boxes,
      items: [
        {
          title: "Products",
          url: "#",
        },
        {
          title: "Categories",
          url: "#",
        },
        {
          title: "Collections",
          url: "#",
        },
        {
          title: "Stock Adjustments",
          url: "#",
        },
      ],
    },
    {
      title: "Customers",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Add Customer",
          url: "#",
        },
        {
          title: "Customer Orders",
          url: "#",
        },
      ],
    },
    {
      title: "Suppliers",
      url: "#",
      icon: Truck,
      items: [
        {
          title: "Manage Suppliers",
          url: "#",
        },
        {
          title: "Purchase Orders",
          url: "#",
        },
        {
          title: "Analytics",
          url: "#",
        },
      ],
    },
    {
      title: "Employees",
      url: "#",
      icon: Briefcase,
      items: [
        {
          title: "Manage Staff",
          url: "#",
        },
        {
          title: "Analytics",
          url: "#",
        },
        {
          title: "Log",
          url: "#",
        },
      ],
    },
    {
      title: "Shipments",
      url: "#",
      icon: Package,
      items: [
        {
          title: "Create Shipment",
          url: "#",
        },
        {
          title: "Manage Shipments",
          url: "#",
        },
        {
          title: "Track Shipments",
          url: "#",
        },
      ],
    },
    {
      title: "Transactions",
      url: "consultant",
      icon: DollarSign,
      items: [
        {
          title: "All Transactions",
          url: "#",
        },
      ],
    },
    {
      title: "Consultant",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "New Chat",
          url: "#",
        },
        {
          title: "Chat History",
          url: "#",
        },
        {
          title: "My Plans",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Website",
      url: "#",
      icon: Frame,
    },
    {
      name: "Social Media",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Contact List",
      url: "#",
      icon: Map,
    },
    {
      name: " Automations",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <ThemeProvider>
      <Sidebar 
        variant="sidebar" 
        className="bg-[hsl(var(--sidebar))] border-r border-[hsl(var(--sidebar-border))]" 
        {...props}
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
  <a href="/account" className="flex flex-col"> {/* Use flex-col for vertical alignment */}
    <span className="truncate font-semibold">GigGrid</span>
    <span className="truncate text-xs">Enterprise</span>
  </a>
</div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
    </ThemeProvider>
  )
}
