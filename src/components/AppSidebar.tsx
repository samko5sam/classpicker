import { Calendar, Home, Inbox, Info, MapIcon, Search, Settings, Table2, User2 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import FacebookLoginButton from "./FacebookLoginButton"

// Menu items.
const items = [
  {
    title: "課表",
    url: "/classtable",
    icon: Table2,
  },
  {
    title: "選課地圖",
    url: "/map",
    icon: MapIcon,
  },
  {
    title: "使用者",
    url: "/user",
    icon: User2
  },
  {
    title: "使用說明",
    url: "/instruction",
    icon: Info
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>我很餓 - 我要選課！</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <FacebookLoginButton />
      </SidebarFooter>
    </Sidebar>
  )
}
