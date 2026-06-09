"use client"

import { Eye, MoreHorizontal, Mail } from "lucide-react"
import { DataTable } from "@/components/admin/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Lead {
  id: string
  nombre: string
  email: string
  telefono: string
  origen: string
  actividad: string
  fecha: string
  estado: "nuevo" | "contactado" | "convertido" | "descartado"
}

const mockLeads: Lead[] = [
  {
    id: "LD-001",
    nombre: "Pedro Ramírez",
    email: "pedro@email.com",
    telefono: "+54 11 5555-1234",
    origen: "Pedir más info",
    actividad: "Diplomatura en Mercado de Capitales",
    fecha: "2024-01-15",
    estado: "nuevo",
  },
  {
    id: "LD-002",
    nombre: "Lucía Torres",
    email: "lucia@email.com",
    telefono: "+54 11 5555-5678",
    origen: "Lista de espera",
    actividad: "Trading Algorítmico",
    fecha: "2024-01-14",
    estado: "contactado",
  },
  {
    id: "LD-003",
    nombre: "Martín Díaz",
    email: "martin@email.com",
    telefono: "+54 11 5555-9012",
    origen: "Descargar programa",
    actividad: "Análisis Técnico Avanzado",
    fecha: "2024-01-13",
    estado: "convertido",
  },
  {
    id: "LD-004",
    nombre: "Valentina Castro",
    email: "vale@email.com",
    telefono: "+54 11 5555-3456",
    origen: "Pedir más info",
    actividad: "Introducción a Bonos",
    fecha: "2024-01-12",
    estado: "descartado",
  },
  {
    id: "LD-005",
    nombre: "Nicolás Ruiz",
    email: "nico@email.com",
    telefono: "+54 11 5555-7890",
    origen: "Lista de espera",
    actividad: "Derivados Financieros",
    fecha: "2024-01-11",
    estado: "nuevo",
  },
]

export default function LeadsPage() {
  const columns = [
    { key: "nombre", label: "Nombre" },
    { key: "email", label: "Email" },
    { key: "origen", label: "Origen" },
    { key: "actividad", label: "Actividad" },
    { key: "fecha", label: "Fecha" },
    {
      key: "estado",
      label: "Estado",
      render: (item: Lead) => {
        const variants: Record<string, string> = {
          nuevo: "bg-blue-100 text-blue-700",
          contactado: "bg-yellow-100 text-yellow-700",
          convertido: "bg-green-100 text-green-700",
          descartado: "bg-gray-100 text-gray-700",
        }
        return (
          <Badge className={variants[item.estado]}>{item.estado.charAt(0).toUpperCase() + item.estado.slice(1)}</Badge>
        )
      },
    },
    {
      key: "actions",
      label: "Acciones",
      render: (item: Lead) => (
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
              <Mail className="mr-2 h-4 w-4" />
              Enviar email
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
        { value: "nuevo", label: "Nuevo" },
        { value: "contactado", label: "Contactado" },
        { value: "convertido", label: "Convertido" },
        { value: "descartado", label: "Descartado" },
      ],
    },
    {
      key: "origen",
      label: "Origen",
      options: [
        { value: "pedir_info", label: "Pedir más info" },
        { value: "lista_espera", label: "Lista de espera" },
        { value: "descargar", label: "Descargar programa" },
      ],
    },
  ]

  return <DataTable data={mockLeads} columns={columns} title="Leads" filters={filters} />
}
