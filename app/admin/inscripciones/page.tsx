"use client"

import Link from "next/link"
import { Eye, MoreHorizontal } from "lucide-react"
import { DataTable } from "@/components/admin/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Inscripcion {
  id: string
  alumno: string
  email: string
  actividad: string
  fecha: string
  monto: string
  estado: "pendiente" | "confirmado" | "cancelado"
  tipo: "particular" | "empresa"
}

const mockInscripciones: Inscripcion[] = [
  {
    id: "INS-001",
    alumno: "Juan Pérez",
    email: "juan@email.com",
    actividad: "Diplomatura en Mercado de Capitales",
    fecha: "2024-01-15",
    monto: "$150.000",
    estado: "confirmado",
    tipo: "particular",
  },
  {
    id: "INS-002",
    alumno: "María García",
    email: "maria@email.com",
    actividad: "Trading Algorítmico",
    fecha: "2024-01-14",
    monto: "$85.000",
    estado: "pendiente",
    tipo: "empresa",
  },
  {
    id: "INS-003",
    alumno: "Carlos López",
    email: "carlos@email.com",
    actividad: "Análisis Técnico Avanzado",
    fecha: "2024-01-13",
    monto: "$65.000",
    estado: "confirmado",
    tipo: "particular",
  },
  {
    id: "INS-004",
    alumno: "Ana Martínez",
    email: "ana@email.com",
    actividad: "Introducción a Bonos",
    fecha: "2024-01-12",
    monto: "$45.000",
    estado: "cancelado",
    tipo: "particular",
  },
  {
    id: "INS-005",
    alumno: "Roberto Silva",
    email: "roberto@email.com",
    actividad: "Derivados Financieros",
    fecha: "2024-01-11",
    monto: "$95.000",
    estado: "pendiente",
    tipo: "empresa",
  },
  {
    id: "INS-006",
    alumno: "Laura Rodríguez",
    email: "laura@email.com",
    actividad: "Webinar: Coyuntura Económica",
    fecha: "2024-01-10",
    monto: "Gratis",
    estado: "confirmado",
    tipo: "particular",
  },
  {
    id: "INS-007",
    alumno: "Diego Fernández",
    email: "diego@email.com",
    actividad: "Finanzas Personales",
    fecha: "2024-01-09",
    monto: "$35.000",
    estado: "confirmado",
    tipo: "particular",
  },
  {
    id: "INS-008",
    alumno: "Sofía Gómez",
    email: "sofia@email.com",
    actividad: "Renta Fija Argentina",
    fecha: "2024-01-08",
    monto: "$75.000",
    estado: "pendiente",
    tipo: "empresa",
  },
]

export default function InscripcionesPage() {
  const columns = [
    { key: "id", label: "ID" },
    { key: "alumno", label: "Alumno" },
    { key: "actividad", label: "Actividad" },
    { key: "fecha", label: "Fecha" },
    { key: "monto", label: "Monto" },
    {
      key: "tipo",
      label: "Tipo",
      render: (item: Inscripcion) => (
        <Badge variant="outline" className={item.tipo === "empresa" ? "border-blue-300 text-blue-700" : ""}>
          {item.tipo === "empresa" ? "Empresa" : "Particular"}
        </Badge>
      ),
    },
    {
      key: "estado",
      label: "Estado",
      render: (item: Inscripcion) => {
        const variants: Record<string, string> = {
          confirmado: "bg-green-100 text-green-700",
          pendiente: "bg-yellow-100 text-yellow-700",
          cancelado: "bg-red-100 text-red-700",
        }
        return (
          <Badge className={variants[item.estado]}>{item.estado.charAt(0).toUpperCase() + item.estado.slice(1)}</Badge>
        )
      },
    },
    {
      key: "actions",
      label: "Acciones",
      render: (item: Inscripcion) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/inscripciones/${item.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                Ver detalle
              </Link>
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
        { value: "confirmado", label: "Confirmado" },
        { value: "pendiente", label: "Pendiente" },
        { value: "cancelado", label: "Cancelado" },
      ],
    },
    {
      key: "tipo",
      label: "Tipo",
      options: [
        { value: "particular", label: "Particular" },
        { value: "empresa", label: "Empresa" },
      ],
    },
  ]

  return <DataTable data={mockInscripciones} columns={columns} title="Inscripciones" filters={filters} />
}
