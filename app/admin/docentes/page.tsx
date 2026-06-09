"use client"

import { Eye, Edit, MoreHorizontal } from "lucide-react"
import { DataTable } from "@/components/admin/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Docente {
  id: string
  nombre: string
  email: string
  especialidad: string
  actividades: number
  estado: "activo" | "inactivo"
}

const mockDocentes: Docente[] = [
  {
    id: "DOC-001",
    nombre: "Dr. Carlos Fernández",
    email: "cfernandez@email.com",
    especialidad: "Mercado de Capitales",
    actividades: 5,
    estado: "activo",
  },
  {
    id: "DOC-002",
    nombre: "Lic. María González",
    email: "mgonzalez@email.com",
    especialidad: "Análisis Técnico",
    actividades: 3,
    estado: "activo",
  },
  {
    id: "DOC-003",
    nombre: "Mg. Roberto Silva",
    email: "rsilva@email.com",
    especialidad: "Derivados",
    actividades: 2,
    estado: "activo",
  },
  {
    id: "DOC-004",
    nombre: "Dr. Ana Martínez",
    email: "amartinez@email.com",
    especialidad: "Renta Fija",
    actividades: 4,
    estado: "inactivo",
  },
  {
    id: "DOC-005",
    nombre: "Lic. Diego López",
    email: "dlopez@email.com",
    especialidad: "Trading",
    actividades: 6,
    estado: "activo",
  },
]

export default function DocentesPage() {
  const columns = [
    {
      key: "nombre",
      label: "Docente",
      render: (item: Docente) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-[#1c426e] text-white text-xs">
              {item.nombre
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{item.nombre}</p>
            <p className="text-sm text-gray-500">{item.email}</p>
          </div>
        </div>
      ),
    },
    { key: "especialidad", label: "Especialidad" },
    { key: "actividades", label: "Actividades" },
    {
      key: "estado",
      label: "Estado",
      render: (item: Docente) => (
        <Badge className={item.estado === "activo" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
          {item.estado === "activo" ? "Activo" : "Inactivo"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Acciones",
      render: (item: Docente) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              Ver perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return <DataTable data={mockDocentes} columns={columns} title="Docentes" onAdd={() => {}} />
}
