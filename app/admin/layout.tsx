"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Calendar, Users, DollarSign, ClipboardList, UserPlus, LogOut } from "lucide-react"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RemaxLogo } from "@/components/remax-logo"

const navItems = [
  { title: "Actividades", href: "/admin/actividades", icon: BookOpen },
  { title: "Ediciones", href: "/admin/ediciones", icon: Calendar },
  { title: "Docentes", href: "/admin/docentes", icon: Users },
  { title: "Precios", href: "/admin/precios", icon: DollarSign },
  { title: "Inscripciones", href: "/admin/inscripciones", icon: ClipboardList },
  { title: "Leads", href: "/admin/leads", icon: UserPlus },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Link href="/admin">
            <RemaxLogo className="h-8 w-auto" textClassName="text-sm" />
          </Link>
        </SidebarHeader>
        <Separator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Gestión</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <Button variant="ghost" className="w-full justify-start gap-2 text-gray-600">
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-white px-6">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <span className="text-sm text-gray-500">Panel de Administración</span>
        </header>
        <main className="flex-1 overflow-auto bg-gray-50 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
