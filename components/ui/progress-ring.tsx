"use client"

import { cn } from "@/lib/utils"

interface ProgressRingProps {
  value: number
  size?: number
  strokeWidth?: number
  className?: string
  trackClassName?: string
  progressClassName?: string
  showValue?: boolean
  valueClassName?: string
}

export function ProgressRing({
  value,
  size = 64,
  strokeWidth = 6,
  className,
  trackClassName,
  progressClassName,
  showValue = true,
  valueClassName,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          className={cn("stroke-gray-200", trackClassName)}
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn("stroke-[#1c426e] transition-all duration-500", progressClassName)}
        />
      </svg>
      {showValue && (
        <span className={cn("absolute text-sm font-semibold text-gray-900", valueClassName)}>{Math.round(value)}%</span>
      )}
    </div>
  )
}
