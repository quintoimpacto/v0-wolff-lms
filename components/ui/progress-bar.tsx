"use client"

import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  size?: "sm" | "md" | "lg"
  className?: string
  trackClassName?: string
  progressClassName?: string
  showValue?: boolean
  valuePosition?: "right" | "inside"
}

const sizeClasses = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
}

export function ProgressBar({
  value,
  size = "md",
  className,
  trackClassName,
  progressClassName,
  showValue = false,
  valuePosition = "right",
}: ProgressBarProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn("relative flex-1 overflow-hidden rounded-full bg-[#E5E7EB]", sizeClasses[size], trackClassName)}
      >
        <div
          className={cn("h-full rounded-full bg-[#111827] transition-all duration-500", progressClassName)}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
        {showValue && valuePosition === "inside" && size === "lg" && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-white">
            {Math.round(value)}%
          </span>
        )}
      </div>
      {showValue && valuePosition === "right" && (
        <span className="text-sm font-medium text-[#6B7280] tabular-nums">{Math.round(value)}%</span>
      )}
    </div>
  )
}
