"use client"

import { Edit, MoreHorizontal } from "lucide-react"
import { DataTable } from "@/components/admin/data-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Precio {
  id: string
  actividad: string
  segmento: string
  precio: string
  vigente: boolean
}

const mockPrecios: Precio[] = [
  {
    id: "PR-001",
    actividad: "Diplomatura en Mercado de Capitales",
    segmento: "Público general",
    precio: "$150.000",
    vigente: true,
  },
  {
    id: "PR-002",
    actividad: "Diplomatura en Mercado de Capitales",
    segmento: "Socio BYMA",
    precio: "$120.000",
    vigente: true,
  },
  {
    id: "PR-003",
    actividad: "Diplomatura en Mercado de Capitales",
    segmento: "Estudiante",
    precio: "$90.000",
    vigente: true,
  },
  { id: "PR-004", actividad: "Trading Algorítmico", segmento: "Público general", precio: "$85.000", vigente: true },
  { id: "PR-005", actividad: "Trading Algorítmico", segmento: "Socio BYMA", precio: "$68.000", vigente: true },
  {
    id: "PR-006",
    actividad: "Análisis Técnico Avanzado",
    segmento: "Público general",
    precio: "$65.000",
    vigente: true,
  },
]

export default function PreciosPage() {
  const columns = [
    { key: "actividad", label: "Actividad" },
    { key: "segmento", label: "Segmento" },
    { key: "precio", label: "Precio" },
    {
      key: "actions",
      label: "Acciones",
      render: (item: Precio) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Editar precio
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const filters = [
    {
      key: "segmento",
      label: "Segmento",
      options: [
        { value: "publico", label: "Público general" },
        { value: "socio", label: "Socio BYMA" },
        { value: "estudiante", label: "Estudiante" },
        { value: "profesional", label: "Colegio Profesional" },
        { value: "funcionario", label: "Funcionario Público" },
      ],
    },
  ]

  return <DataTable data={mockPrecios} columns={columns} title="Precios" onAdd={() => {}} filters={filters} />
}
