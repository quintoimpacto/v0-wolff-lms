"use client"

import { useState } from "react"
import { Eye, Edit, MoreHorizontal, CheckCircle, XCircle } from "lucide-react"
import { DataTable } from "@/components/admin/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Actividad {
  id: string
  nombre: string
  tipo: string
  estado: "publicado" | "borrador" | "archivado"
  ediciones: number
  inscriptos: number
}

const mockActividades: Actividad[] = [
  {
    id: "1",
    nombre: "Diplomatura en Mercado de Capitales",
    tipo: "Diplomatura",
    estado: "publicado",
    ediciones: 3,
    inscriptos: 45,
  },
  { id: "2", nombre: "Trading Algorítmico", tipo: "Curso", estado: "publicado", ediciones: 2, inscriptos: 32 },
  { id: "3", nombre: "Análisis Técnico Avanzado", tipo: "Curso", estado: "borrador", ediciones: 0, inscriptos: 0 },
  { id: "4", nombre: "Introducción a Bonos", tipo: "Taller", estado: "publicado", ediciones: 5, inscriptos: 120 },
  { id: "5", nombre: "Derivados Financieros", tipo: "Curso", estado: "archivado", ediciones: 1, inscriptos: 28 },
  {
    id: "6",
    nombre: "Webinar: Coyuntura Económica",
    tipo: "Webinar",
    estado: "publicado",
    ediciones: 12,
    inscriptos: 450,
  },
  { id: "7", nombre: "Finanzas Personales", tipo: "E-learning", estado: "publicado", ediciones: 1, inscriptos: 89 },
  { id: "8", nombre: "Renta Fija Argentina", tipo: "Curso", estado: "borrador", ediciones: 0, inscriptos: 0 },
]

export default function ActividadesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const columns = [
    { key: "nombre", label: "Nombre" },
    { key: "tipo", label: "Tipo" },
    {
      key: "estado",
      label: "Estado",
      render: (item: Actividad) => {
        const variants: Record<string, string> = {
          publicado: "bg-green-100 text-green-700",
          borrador: "bg-yellow-100 text-yellow-700",
          archivado: "bg-gray-100 text-gray-700",
        }
        return (
          <Badge className={variants[item.estado]}>{item.estado.charAt(0).toUpperCase() + item.estado.slice(1)}</Badge>
        )
      },
    },
    { key: "ediciones", label: "Ediciones" },
    { key: "inscriptos", label: "Inscriptos" },
    {
      key: "actions",
      label: "Acciones",
      render: (item: Actividad) => (
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
            {item.estado === "borrador" && (
              <DropdownMenuItem>
                <CheckCircle className="mr-2 h-4 w-4" />
                Publicar
              </DropdownMenuItem>
            )}
            {item.estado === "publicado" && (
              <DropdownMenuItem>
                <XCircle className="mr-2 h-4 w-4" />
                Archivar
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const filters = [
    {
      key: "tipo",
      label: "Tipo",
      options: [
        { value: "diplomatura", label: "Diplomatura" },
        { value: "curso", label: "Curso" },
        { value: "taller", label: "Taller" },
        { value: "webinar", label: "Webinar" },
        { value: "e-learning", label: "E-learning" },
      ],
    },
    {
      key: "estado",
      label: "Estado",
      options: [
        { value: "publicado", label: "Publicado" },
        { value: "borrador", label: "Borrador" },
        { value: "archivado", label: "Archivado" },
      ],
    },
  ]

  return (
    <>
      <DataTable
        data={mockActividades}
        columns={columns}
        title="Actividades"
        onAdd={() => setIsCreateOpen(true)}
        filters={filters}
      />

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Crear Actividad</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input placeholder="Nombre de la actividad" />
            </div>
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diplomatura">Diplomatura</SelectItem>
                  <SelectItem value="curso">Curso</SelectItem>
                  <SelectItem value="taller">Taller</SelectItem>
                  <SelectItem value="webinar">Webinar</SelectItem>
                  <SelectItem value="e-learning">E-learning</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea placeholder="Descripción de la actividad" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-[#1c426e] hover:bg-[#15345a]">Crear</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
