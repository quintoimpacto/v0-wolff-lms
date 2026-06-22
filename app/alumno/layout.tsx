"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Award, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Suspense } from "react"
import { Header } from "@/components/header"

const navItems = [
  { href: "/alumno", label: "Inicio", icon: Home },
  { href: "/alumno/mis-cursos", label: "Mis cursos", icon: BookOpen },
  { href: "/alumno/certificados", label: "Certificados", icon: Award },
  { href: "/alumno/perfil", label: "Perfil", icon: User },
]

export default function AlumnoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-secondary">
      {/* Topbar (same as homepage) */}
      <Header />

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="fixed left-0 top-20 z-30 hidden h-[calc(100vh-5rem)] w-64 border-r border-border bg-card lg:block">
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                    isActive ? "bg-[#111827] text-white" : "text-text-secondary hover:bg-secondary",
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
