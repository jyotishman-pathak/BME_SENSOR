"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
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
import { useParams, usePathname } from "next/navigation"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Sensor Readings",
      url: "/readings",
      icon: IconChartBar,
    },
    {
      title: "Logs",
      url: "/logs",
      icon: IconDatabase,
    },
    {
      title: "Sand Quality",
      url: "/quality",
      icon: IconReport,
    },
    {
      title: "Operators",
      url: "/operators",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "/capture",
      items: [
        {
          title: "Live Feed",
          url: "/capture/live",
        },
        {
          title: "Snapshots",
          url: "/capture/snapshots",
        },
      ],
    },
    {
      title: "Analysis Reports",
      icon: IconFileDescription,
      url: "/reports",
      items: [
        {
          title: "Daily Reports",
          url: "/reports/daily",
        },
        {
          title: "Archived",
          url: "/reports/archived",
        },
      ],
    },
    {
      title: "AI Insights",
      icon: IconFileAi,
      url: "/ai",
      items: [
        {
          title: "Anomalies",
          url: "/ai/anomalies",
        },
        {
          title: "Recommendations",
          url: "/ai/recommendations",
        },
      ],
    },
  ],
  
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "/data-library",
      icon: IconDatabase,
    },
    {
      name: "Sand Types",
      url: "/sand-types",
      icon: IconFileWord,
    },
    {
      name: "Sensor Manuals",
      url: "/manuals",
      icon: IconFileDescription,
    },
  ]
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
const pathaname = usePathname()
console.log(pathaname)
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Data Logger</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
