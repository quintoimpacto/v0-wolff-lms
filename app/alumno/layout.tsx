"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Award, User, Search, Bell, Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Suspense } from "react"
import { RemaxLogo, RemaxLogoIcon } from "@/components/remax-logo"

const navItems = [
  { href: "/alumno", label: "Inicio", icon: Home },
  { href: "/alumno/mis-cursos", label: "Mis cursos", icon: BookOpen },
  { href: "/alumno/certificados", label: "Certificados", icon: Award },
  { href: "/alumno/perfil", label: "Perfil", icon: User },
]

export default function AlumnoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-secondary">
      {/* Topbar */}
      <header className="sticky top-0 z-40 h-16 border-b border-border bg-card">
        <div className="flex h-full items-center justify-between px-4 lg:px-6">
          {/* Left: Logo + Mobile menu */}
          <div className="flex items-center gap-3">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menú">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 bg-card">
                <nav className="flex flex-col gap-1 p-4">
                  <div className="mb-4 px-2">
                    <RemaxLogo className="h-8 w-auto" />
                  </div>
                  {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                          isActive ? "bg-primary text-primary-foreground" : "text-text-secondary hover:bg-secondary",
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/alumno">
              <RemaxLogo className="h-8 w-auto" textClassName="hidden sm:inline" />
            </Link>
          </div>

          {/* Center: Search */}
          <div className="hidden max-w-md flex-1 px-8 md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar cursos..."
                className="h-10 w-full border-border bg-secondary pl-10 focus:bg-card"
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Buscar">
              <Search className="h-5 w-5 text-text-secondary" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button type="button" className="group relative flex h-9 w-9 items-center justify-center" aria-label="Notificaciones">
                  <Bell className="h-5 w-5 text-text-secondary transition-transform duration-200 group-hover:scale-125" />
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-card">
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground">Notificaciones</p>
                </div>
                <DropdownMenuSeparator />
                <div className="p-3">
                  <p className="text-sm text-text-secondary">Nueva clase disponible en "Mercado de Capitales"</p>
                  <p className="mt-1 text-xs text-muted-foreground">Hace 2 horas</p>
                </div>
                <DropdownMenuSeparator />
                <div className="p-3">
                  <p className="text-sm text-text-secondary">Tu certificado está listo para descargar</p>
                  <p className="mt-1 text-xs text-muted-foreground">Hace 1 día</p>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/professional-man-portrait.png" alt="Usuario" className="object-cover" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card">
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground">Juan Díaz</p>
                  <p className="text-xs text-muted-foreground">juan.diaz@email.com</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/alumno/perfil" className="cursor-pointer text-text-secondary hover:text-foreground">
                    <User className="mr-2 h-4 w-4" />
                    Mi perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/alumno/certificados" className="cursor-pointer text-text-secondary hover:text-foreground">
                    <Award className="mr-2 h-4 w-4" />
                    Certificados
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="fixed left-0 top-16 z-30 hidden h-[calc(100vh-4rem)] w-64 border-r border-border bg-card lg:block">
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                    isActive ? "bg-primary text-primary-foreground" : "text-text-secondary hover:bg-secondary",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 pb-20 lg:ml-64 lg:pb-6">
          <Suspense fallback={<div>Loading...</div>}>
            <div className="p-4 lg:p-6">{children}</div>
          </Suspense>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card lg:hidden">
        <div className="flex h-16 items-center justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 transition-colors duration-200",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
