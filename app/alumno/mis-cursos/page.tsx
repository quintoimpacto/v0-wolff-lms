"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { PlayCircle, CheckCircle, Clock, CreditCard, Download, Filter, Grid, List, ArrowUpDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProgressBar } from "@/components/ui/progress-bar"
import { StatusBadge } from "@/components/ui/status-badge"
import { BackButton } from "@/components/back-button"

type EstadoInscripcion = "en_curso" | "pendiente_pago" | "finalizado" | "certificado_disponible"

interface Enrollment {
  id: string
  titulo: string
  tipo: "Curso" | "Diplomatura" | "Taller" | "Webinar"
  estado: EstadoInscripcion
  progreso: number
  clases: number
  clasesCompletadas: number
  imagen: string
  modalidad: string
  fechaInscripcion: string
  fechaFin?: string
  montoPendiente?: number
}

const inscripciones: Enrollment[] = [
  {
    id: "corretaje-inmobiliario-101",
    titulo: "Introducción al Corretaje Inmobiliario",
    tipo: "Curso",
    estado: "en_curso",
    progreso: 65,
    clases: 10,
    clasesCompletadas: 6,
    imagen: "/covers/introduccion-corretaje.png",
    modalidad: "Online",
    fechaInscripcion: "2025-10-15",
  },
  {
    id: "marketing-inmobiliario",
    titulo: "Marketing Digital para Inmobiliarias",
    tipo: "Curso",
    estado: "pendiente_pago",
    progreso: 0,
    clases: 8,
    clasesCompletadas: 0,
    imagen: "/covers/marketing-inmobiliario.jpg",
    modalidad: "E-learning",
    fechaInscripcion: "2026-01-05",
    montoPendiente: 45000,
  },
  {
    id: "fotografia-inmobiliaria",
    titulo: "Fotografía Inmobiliaria Profesional",
    tipo: "Taller",
    estado: "en_curso",
    progreso: 10,
    clases: 6,
    clasesCompletadas: 1,
    imagen: "/covers/fotografia-inmobiliaria.jpg",
    modalidad: "Online",
    fechaInscripcion: "2025-12-01",
  },
  {
    id: "fundamentos-inmobiliarios",
    titulo: "Fundamentos del Negocio Inmobiliario",
    tipo: "Curso",
    estado: "certificado_disponible",
    progreso: 100,
    clases: 12,
    clasesCompletadas: 12,
    imagen: "/covers/fundamentos-inmobiliarios.jpg",
    modalidad: "E-learning",
    fechaInscripcion: "2025-08-01",
    fechaFin: "2025-12-15",
  },
  {
    id: "crm-inmobiliario",
    titulo: "CRM para Agentes Inmobiliarios",
    tipo: "Taller",
    estado: "finalizado",
    progreso: 100,
    clases: 4,
    clasesCompletadas: 4,
    imagen: "/covers/crm-inmobiliario.jpg",
    modalidad: "Presencial",
    fechaInscripcion: "2025-09-10",
    fechaFin: "2025-11-20",
  },
  {
    id: "diplomatura-corretaje",
    titulo: "Diplomatura en Corretaje Inmobiliario",
    tipo: "Diplomatura",
    estado: "en_curso",
    progreso: 45,
    clases: 24,
    clasesCompletadas: 11,
    imagen: "/covers/diplomatura-corretaje.jpg",
    modalidad: "Online",
    fechaInscripcion: "2025-06-01",
  },
]

function EnrollmentCard({ enrollment, viewMode }: { enrollment: Enrollment; viewMode: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <Card className="border-[#E5E7EB] bg-white">
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
          <img
            src={enrollment.imagen || "/placeholder.svg"}
            alt={enrollment.titulo}
            className="h-24 w-full rounded-lg object-cover sm:h-20 sm:w-32"
          />
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-xs border-[#E5E7EB] text-[#4B5563] bg-transparent">
                  {enrollment.tipo}
                </Badge>
                <StatusBadge variant={enrollment.estado} />
              </div>
              <Link href={`/alumno/mis-cursos/${enrollment.id}`}>
                <h3 className="font-medium text-[#111827] line-clamp-1 hover:text-[#0244eb] hover:underline transition-colors">
                  {enrollment.titulo}
                </h3>
              </Link>
              {enrollment.estado === "en_curso" && (
                <ProgressBar value={enrollment.progreso} size="sm" showValue className="max-w-[200px]" />
              )}
            </div>
            <div className="flex gap-2">
              {enrollment.estado === "en_curso" && (
                <Button size="sm" className="bg-[#0244eb] hover:bg-[#0238c7] transition-colors" asChild>
                  <Link href={`/alumno/mis-cursos/${enrollment.id}`}>
                    <PlayCircle className="mr-1 h-4 w-4" />
                    Ir al aula
                  </Link>
                </Button>
              )}
              {enrollment.estado === "pendiente_pago" && (
                <Button size="sm" className="bg-[#F59E0B] hover:bg-[#D97706] transition-colors">
                  <CreditCard className="mr-1 h-4 w-4" />
                  Pagar ${enrollment.montoPendiente?.toLocaleString()}
                </Button>
              )}
              {enrollment.estado === "certificado_disponible" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A]/10 bg-transparent"
                >
                  <Download className="mr-1 h-4 w-4" />
                  Descargar certificado
                </Button>
              )}
              {enrollment.estado === "finalizado" && (
                <Button size="sm" variant="outline" disabled className="bg-transparent">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Completado
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="flex h-full flex-col overflow-hidden border-[#E5E7EB] bg-white">
      <img src={enrollment.imagen || "/placeholder.svg"} alt={enrollment.titulo} className="h-40 w-full object-cover" />
      <CardContent className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs border-[#E5E7EB] text-[#4B5563] bg-transparent">
            {enrollment.tipo}
          </Badge>
          <StatusBadge variant={enrollment.estado} />
        </div>
        <Link href={`/alumno/mis-cursos/${enrollment.id}`}>
          <h3 className="font-medium text-[#111827] line-clamp-2 min-h-[2.5rem] hover:text-[#0244eb] hover:underline transition-colors">
            {enrollment.titulo}
          </h3>
        </Link>

        <div className="flex-1">
          {(enrollment.estado === "en_curso" || enrollment.estado === "pendiente_pago") && (
            <div className="mt-3 flex items-center gap-2 text-sm text-[#6B7280]">
              <Clock className="h-4 w-4" />
              <span>
                {enrollment.clasesCompletadas}/{enrollment.clases} clases
              </span>
            </div>
          )}

          {enrollment.estado === "en_curso" && (
            <div className="mt-3">
              <ProgressBar value={enrollment.progreso} showValue />
            </div>
          )}

          {enrollment.estado === "finalizado" && enrollment.fechaFin && (
            <p className="mt-3 flex items-center gap-2 text-sm text-[#6B7280]">
              <CheckCircle className="h-4 w-4 text-[#6B7280]" />
              Completado el {new Date(enrollment.fechaFin).toLocaleDateString("es-AR")}
            </p>
          )}

          {enrollment.estado === "certificado_disponible" && (
            <p className="mt-3 flex items-center gap-2 text-sm text-[#16A34A]">
              <CheckCircle className="h-4 w-4" />
              Completado - Certificado listo
            </p>
          )}
        </div>

        <div className="mt-4 pt-2">
          {enrollment.estado === "en_curso" && (
            <Button className="w-full bg-[#0244eb] hover:bg-[#0238c7] transition-colors" asChild>
              <Link href={`/alumno/mis-cursos/${enrollment.id}`}>
                <PlayCircle className="mr-2 h-4 w-4" />
                Ir al aula
              </Link>
            </Button>
          )}
          {enrollment.estado === "pendiente_pago" && (
            <Button className="w-full bg-[#F59E0B] hover:bg-[#D97706] transition-colors">
              <CreditCard className="mr-2 h-4 w-4" />
              Pagar ${enrollment.montoPendiente?.toLocaleString()}
            </Button>
          )}
          {enrollment.estado === "certificado_disponible" && (
            <Button
              variant="outline"
              className="w-full border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A]/10 bg-transparent"
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar certificado
            </Button>
          )}
          {enrollment.estado === "finalizado" && (
            <Button variant="outline" className="w-full bg-transparent" disabled>
              <CheckCircle className="mr-2 h-4 w-4" />
              Completado
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function MisCursos() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [estadoFilter, setEstadoFilter] = useState<EstadoInscripcion[]>([])
  const [sortBy, setSortBy] = useState<"fecha" | "progreso" | "titulo">("fecha")

  const filteredAndSorted = useMemo(() => {
    let result = [...inscripciones]

    if (estadoFilter.length > 0) {
      result = result.filter((e) => estadoFilter.includes(e.estado))
    }

    result.sort((a, b) => {
      if (sortBy === "fecha") {
        return new Date(b.fechaInscripcion).getTime() - new Date(a.fechaInscripcion).getTime()
      }
      if (sortBy === "progreso") {
        return b.progreso - a.progreso
      }
      return a.titulo.localeCompare(b.titulo)
    })

    return result
  }, [estadoFilter, sortBy])

  const counts = {
    total: inscripciones.length,
    en_curso: inscripciones.filter((e) => e.estado === "en_curso").length,
    pendiente_pago: inscripciones.filter((e) => e.estado === "pendiente_pago").length,
    finalizado: inscripciones.filter((e) => e.estado === "finalizado").length,
    certificado_disponible: inscripciones.filter((e) => e.estado === "certificado_disponible").length,
  }

  return (
<div className="space-y-6">
      <div>
        <BackButton href="/alumno" label="Volver al inicio" />
        <h1 className="text-2xl font-semibold text-[#111827] mt-2">Mis cursos</h1>
        <p className="mt-1 text-[#6B7280]">Gestiona tus inscripciones y progreso de aprendizaje</p>
      </div>

      {/* Filters and controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 bg-transparent border-[#E5E7EB] text-[#4B5563]">
                <Filter className="mr-2 h-4 w-4" />
                Estado
                {estadoFilter.length > 0 && (
                  <Badge className="ml-2 h-5 w-5 rounded-none bg-[#0244eb] text-white p-0 text-xs">{estadoFilter.length}</Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 bg-white">
              <DropdownMenuCheckboxItem
                checked={estadoFilter.includes("en_curso")}
                onCheckedChange={(checked) => {
                  setEstadoFilter((prev) => (checked ? [...prev, "en_curso"] : prev.filter((e) => e !== "en_curso")))
                }}
              >
                En curso ({counts.en_curso})
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={estadoFilter.includes("pendiente_pago")}
                onCheckedChange={(checked) => {
                  setEstadoFilter((prev) =>
                    checked ? [...prev, "pendiente_pago"] : prev.filter((e) => e !== "pendiente_pago"),
                  )
                }}
              >
                Pendiente de pago ({counts.pendiente_pago})
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={estadoFilter.includes("finalizado")}
                onCheckedChange={(checked) => {
                  setEstadoFilter((prev) =>
                    checked ? [...prev, "finalizado"] : prev.filter((e) => e !== "finalizado"),
                  )
                }}
              >
                Finalizado ({counts.finalizado})
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={estadoFilter.includes("certificado_disponible")}
                onCheckedChange={(checked) => {
                  setEstadoFilter((prev) =>
                    checked ? [...prev, "certificado_disponible"] : prev.filter((e) => e !== "certificado_disponible"),
                  )
                }}
              >
                Certificado disponible ({counts.certificado_disponible})
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {estadoFilter.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setEstadoFilter([])} className="h-9 text-[#6B7280] hover:text-[#111827]">
              Limpiar filtros
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
            <SelectTrigger className="h-9 w-[220px] border-[#E5E7EB] text-[#4B5563]">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="fecha">Fecha de inscripción</SelectItem>
              <SelectItem value="progreso">Progreso</SelectItem>
              <SelectItem value="titulo">Título A-Z</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex rounded-lg border border-[#E5E7EB]">
            <Button
              variant="ghost"
              size="sm"
              className={`h-9 rounded-r-none ${viewMode === "grid" ? "bg-[#F7F8FA] text-[#0244eb]" : "text-[#6B7280]"}`}
              onClick={() => setViewMode("grid")}
              aria-label="Vista en grilla"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-9 rounded-l-none ${viewMode === "list" ? "bg-[#F7F8FA] text-[#0244eb]" : "text-[#6B7280]"}`}
              onClick={() => setViewMode("list")}
              aria-label="Vista en lista"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <p className="text-sm text-[#6B7280]">
        Mostrando {filteredAndSorted.length} de {counts.total} inscripciones
      </p>

      {filteredAndSorted.length === 0 ? (
        <Card className="border-[#E5E7EB] bg-white p-12 text-center">
          <p className="text-[#6B7280]">No se encontraron inscripciones con los filtros seleccionados.</p>
          <Button variant="link" onClick={() => setEstadoFilter([])} className="mt-2 text-[#2563EB] hover:text-[#0244eb]">
            Limpiar filtros
          </Button>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredAndSorted.map((enrollment) => (
            <EnrollmentCard key={enrollment.id} enrollment={enrollment} viewMode="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSorted.map((enrollment) => (
            <EnrollmentCard key={enrollment.id} enrollment={enrollment} viewMode="list" />
          ))}
        </div>
      )}
    </div>
  )
}
