"use client"

import { Clock, AlertCircle, CheckCircle, FileText, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { StatusBadge } from "./status-badge"

interface ActivityDeadlineItemProps {
  titulo: string
  tipo?: "cuestionario" | "entrega" | "foro" | "clase" | "evento"
  fechaLimite?: string
  estado?: "pendiente" | "completado" | "vencido" | "proximo"
  curso?: string
  className?: string
  onClick?: () => void
}

const tipoIcons = {
  cuestionario: FileText,
  entrega: FileText,
  foro: MessageSquare,
  clase: Clock,
  evento: Clock,
}

const estadoConfig = {
  pendiente: { variant: "pendiente" as const, icon: Clock },
  completado: { variant: "aprobado" as const, icon: CheckCircle },
  vencido: { variant: "error" as const, icon: AlertCircle },
  proximo: { variant: "warning" as const, icon: Clock },
}

export function ActivityDeadlineItem({
  titulo,
  tipo = "entrega",
  fechaLimite,
  estado = "pendiente",
  curso,
  className,
  onClick,
}: ActivityDeadlineItemProps) {
  const TipoIcon = tipoIcons[tipo] || FileText
  const config = estadoConfig[estado]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Hoy"
    if (diffDays === 1) return "Mañana"
    if (diffDays < 0) return `Venció hace ${Math.abs(diffDays)} días`
    if (diffDays <= 7) return `En ${diffDays} días`
    return date.toLocaleDateString("es-AR", { day: "numeric", month: "short" })
  }

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border border-gray-100 bg-white p-3 transition-colors",
        onClick && "cursor-pointer hover:border-gray-200 hover:bg-gray-50",
        className,
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          estado === "vencido" ? "bg-red-50" : estado === "completado" ? "bg-green-50" : "bg-gray-100",
        )}
      >
        <TipoIcon
          className={cn(
            "h-4 w-4",
            estado === "vencido" ? "text-red-600" : estado === "completado" ? "text-green-600" : "text-gray-600",
          )}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 text-sm truncate">{titulo}</p>
        {curso && <p className="text-xs text-gray-500 truncate">{curso}</p>}
        {fechaLimite && (
          <p
            className={cn(
              "mt-1 flex items-center gap-1 text-xs",
              estado === "vencido" ? "text-red-600" : estado === "proximo" ? "text-amber-600" : "text-gray-500",
            )}
          >
            <Clock className="h-3 w-3" />
            {formatDate(fechaLimite)}
          </p>
        )}
      </div>
      <StatusBadge variant={config.variant} size="sm" />
    </div>
  )
}
