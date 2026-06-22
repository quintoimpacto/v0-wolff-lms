"use client"

import Image from "next/image"
import { Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
      <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-8 lg:px-10">
        {/* Logo */}
        <Image
          src="/wolff-logo.png"
          alt="Instituto Wolff Cardiología"
          width={200}
          height={64}
          className="h-14 w-auto object-contain"
          priority
        />

        {/* Right: Notifications + Avatar */}
        <div className="flex items-center gap-4">
          <button className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary transition-colors">
            <Bell className="h-5 w-5 text-text-secondary" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
          </button>
          <Avatar className="h-9 w-9 cursor-pointer">
            <AvatarImage src="/professional-man-portrait.png" alt="Usuario" className="object-cover" />
            <AvatarFallback className="bg-hero-bg text-hero-foreground text-xs font-semibold">WF</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
