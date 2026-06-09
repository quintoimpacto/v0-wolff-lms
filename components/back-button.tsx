"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
  href?: string
  label?: string
  className?: string
}

export function BackButton({ href, label = "Volver", className }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className={`text-[#6B7280] hover:text-[#111827] hover:bg-[#F7F8FA] gap-2 ${className || ""}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  )
}
