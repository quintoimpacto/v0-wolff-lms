import type React from "react"
import { cn } from "@/lib/utils"

type StatusVariant =
  | "en_curso"
  | "pendiente"
  | "pendiente_pago"
  | "finalizado"
  | "completado"
  | "certificado_disponible"
  | "aprobado"
  | "no_entregado"
  | "opcional"
  | "borrador"
  | "publicado"
  | "archivado"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "default"

interface StatusBadgeProps {
  variant: StatusVariant
  children?: React.ReactNode
  label?: string
  className?: string
  size?: "sm" | "md"
}

const variantConfig: Record<StatusVariant, { label: string; classes: string }> = {
  en_curso: { label: "En curso", classes: "bg-transparent text-blue-600 border-[#E5E7EB]" },
  pendiente: { label: "Pendiente", classes: "bg-transparent text-amber-600 border-[#E5E7EB]" },
  pendiente_pago: { label: "Pendiente de pago", classes: "bg-transparent text-amber-600 border-[#E5E7EB]" },
  finalizado: { label: "Finalizado", classes: "bg-transparent text-[#4B5563] border-[#E5E7EB]" },
  completado: { label: "Completado", classes: "bg-transparent text-[#4B5563] border-[#E5E7EB]" },
  certificado_disponible: { label: "Certificado disponible", classes: "bg-transparent text-green-600 border-[#E5E7EB]" },
  aprobado: { label: "Aprobado", classes: "bg-transparent text-green-600 border-[#E5E7EB]" },
  no_entregado: { label: "No entregado", classes: "bg-transparent text-red-600 border-[#E5E7EB]" },
  opcional: { label: "Opcional", classes: "bg-transparent text-[#4B5563] border-[#E5E7EB]" },
  borrador: { label: "Borrador", classes: "bg-transparent text-[#4B5563] border-[#E5E7EB]" },
  publicado: { label: "Publicado", classes: "bg-transparent text-green-600 border-[#E5E7EB]" },
  archivado: { label: "Archivado", classes: "bg-transparent text-[#4B5563] border-[#E5E7EB]" },
  success: { label: "Éxito", classes: "bg-transparent text-green-600 border-[#E5E7EB]" },
  warning: { label: "Advertencia", classes: "bg-transparent text-amber-600 border-[#E5E7EB]" },
  error: { label: "Error", classes: "bg-transparent text-red-600 border-[#E5E7EB]" },
  info: { label: "Info", classes: "bg-transparent text-blue-600 border-[#E5E7EB]" },
  default: { label: "", classes: "bg-transparent text-[#4B5563] border-[#E5E7EB]" },
}

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
}

export function StatusBadge({ variant, children, label, className, size = "md" }: StatusBadgeProps) {
  const config = variantConfig[variant] || variantConfig.default
  const displayLabel = children || label || config.label

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[4px] border font-medium",
        config.classes,
        sizeClasses[size],
        className,
      )}
    >
      {displayLabel}
    </span>
  )
}
