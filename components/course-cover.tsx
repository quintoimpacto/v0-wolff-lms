"use client"

import Image from "next/image"
import { BookOpen, GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CourseCoverProps {
  title: string
  coverUrl?: string
  coverAlt?: string
  theme?: "realestate" | "marketing" | "legal" | "finance" | "management" | "general"
  modality: string
  startDate?: string
  variant?: "default" | "large"
}

export function CourseCover({ title, coverUrl, coverAlt, theme = "general", modality, startDate, variant = "default" }: CourseCoverProps) {
  const isLarge = variant === "large"
  const getThemeGradient = (themeType: string) => {
    switch (themeType) {
      case "realestate":
        return "from-blue-600 via-blue-700 to-cyan-600"
      case "marketing":
        return "from-purple-600 via-pink-600 to-rose-600"
      case "legal":
        return "from-slate-700 via-gray-700 to-zinc-700"
      case "finance":
        return "from-emerald-600 via-teal-600 to-green-600"
      case "management":
        return "from-amber-600 via-orange-600 to-red-600"
      default:
        return "from-[#0244eb] via-blue-600 to-[#0238c7]"
    }
  }

  const getModalityStyles = (mod: string) => {
    const normalizedMod = mod.toLowerCase()
    if (normalizedMod.includes("e-learning")) {
      return "bg-emerald-500 text-white"
    }
    if (normalizedMod.includes("presencial")) {
      return "bg-orange-500 text-white"
    }
    if (normalizedMod.includes("virtual") || normalizedMod.includes("online")) {
      return "bg-amber-400 text-[#111827]"
    }
    if (normalizedMod.includes("híbrido")) {
      return "bg-purple-500 text-white"
    }
    return "bg-gray-500 text-white"
  }

  const isUpcoming = (date?: string) => {
    if (!date) return false
    const courseDate = new Date(date)
    const today = new Date()
    const diffTime = courseDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays >= 0 && diffDays <= 14
  }

  const getInitials = (text: string) => {
    return text
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-t-2xl bg-gradient-to-br ${isLarge ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
      {coverUrl ? (
        <>
          <Image
            src={coverUrl || "/placeholder.svg"}
            alt={coverAlt || `Portada del curso ${title}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${getThemeGradient(theme)}`}>
          <div className="flex h-full flex-col items-center justify-center p-6 text-white">
            <div className="mb-3 rounded-full bg-white/20 p-4 backdrop-blur-sm">
              {theme === "realestate" || theme === "general" ? (
                <GraduationCap className="h-8 w-8" />
              ) : (
                <BookOpen className="h-8 w-8" />
              )}
            </div>
            <div className="rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="text-3xl font-bold tracking-wider">{getInitials(title)}</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      )}

      <div className="absolute left-3 right-3 top-3 flex items-start justify-between gap-2">
        <Badge className={`${getModalityStyles(modality)} border-0 px-2.5 py-1 text-[11px] font-semibold shadow-lg`}>
          {modality}
        </Badge>
        {isUpcoming(startDate) && (
          <Badge className="border-0 bg-primary/90 px-2.5 py-1 text-[11px] font-semibold text-primary-foreground shadow-lg">
            Próximo inicio
          </Badge>
        )}
      </div>
    </div>
  )
}
