"use client"
import { Eye, Edit, MoreHorizontal, Copy } from "lucide-react"
import { DataTable } from "@/components/admin/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Edicion {
  id: string
  actividad: string
  fechaInicio: string
  fechaFin: string
  modalidad: string
  cupos: number
  inscriptos: number
  estado: "abierta" | "cerrada" | "en_curso" | "finalizada"
}

const mockEdiciones: Edicion[] = [
  {
    id: "ED-001",
    actividad: "Diplomatura en Mercado de Capitales",
    fechaInicio: "2024-03-15",
    fechaFin: "2024-06-15",
    modalidad: "Online",
    cupos: 50,
    inscriptos: 45,
    estado: "abierta",
  },
  {
    id: "ED-002",
    actividad: "Trading Algorítmico",
    fechaInicio: "2024-02-01",
    fechaFin: "2024-04-01",
    modalidad: "Presencial",
    cupos: 30,
    inscriptos: 30,
    estado: "en_curso",
  },
  {
    id: "ED-003",
    actividad: "Análisis Técnico Avanzado",
    fechaInicio: "2024-04-10",
    fechaFin: "2024-05-10",
    modalidad: "Online",
    cupos: 40,
    inscriptos: 12,
    estado: "abierta",
  },
  {
    id: "ED-004",
    actividad: "Introducción a Bonos",
    fechaInicio: "2024-01-15",
    fechaFin: "2024-02-15",
    modalidad: "Presencial",
    cupos: 25,
    inscriptos: 25,
    estado: "finalizada",
  },
  {
    id: "ED-005",
    actividad: "Webinar: Coyuntura Económica",
    fechaInicio: "2024-01-20",
    fechaFin: "2024-01-20",
    modalidad: "Online",
    cupos: 500,
    inscriptos: 450,
    estado: "cerrada",
  },
]

export default function EdicionesPage() {
  const columns = [
    { key: "id", label: "ID" },
    { key: "actividad", label: "Actividad" },
    { key: "fechaInicio", label: "Inicio" },
    { key: "fechaFin", label: "Fin" },
    { key: "modalidad", label: "Modalidad" },
    {
      key: "ocupacion",
      label: "Ocupación",
      render: (item: Edicion) => (
        <span>
          {item.inscriptos}/{item.cupos}
        </span>
      ),
    },
    {
      key: "estado",
      label: "Estado",
      render: (item: Edicion) => {
        const variants: Record<string, string> = {
          abierta: "bg-green-100 text-green-700",
          cerrada: "bg-red-100 text-red-700",
          en_curso: "bg-blue-100 text-blue-700",
          finalizada: "bg-gray-100 text-gray-700",
        }
        const labels: Record<string, string> = {
          abierta: "Abierta",
          cerrada: "Cerrada",
          en_curso: "En curso",
          finalizada: "Finalizada",
        }
        return <Badge className={variants[item.estado]}>{labels[item.estado]}</Badge>
      },
    },
    {
      key: "actions",
      label: "Acciones",
      render: (item: Edicion) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              Ver detalle
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Duplicar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const filters = [
    {
      key: "estado",
      label: "Estado",
      options: [
        { value: "abierta", label: "Abierta" },
        { value: "cerrada", label: "Cerrada" },
        { value: "en_curso", label: "En curso" },
        { value: "finalizada", label: "Finalizada" },
      ],
    },
    {
      key: "modalidad",
      label: "Modalidad",
      options: [
        { value: "online", label: "Online" },
        { value: "presencial", label: "Presencial" },
      ],
    },
  ]

  return <DataTable data={mockEdiciones} columns={columns} title="Ediciones" onAdd={() => {}} filters={filters} />
}
