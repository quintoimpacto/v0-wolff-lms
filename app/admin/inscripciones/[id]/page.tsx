"use client"

import Link from "next/link"
import ArrowLeft from "lucide-react/dist/esm/icons/ArrowLeft"

import { useState } from "react"
import { Upload, CheckCircle, Clock, XCircle, FileText, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TimelineEvent {
  id: string
  fecha: string
  hora: string
  evento: string
  tipo: "info" | "success" | "warning" | "error"
}

const inscripcion = {
  id: "INS-001",
  alumno: "Juan Pérez",
  email: "juan@email.com",
  telefono: "+54 11 1234-5678",
  dni: "30.123.456",
  actividad: "Diplomatura en Mercado de Capitales",
  edicion: "Marzo 2024",
  fecha: "2024-01-15",
  monto: "$150.000",
  segmento: "Público general",
  estado: "pendiente" as const,
  tipo: "empresa" as const,
  empresa: {
    cuit: "30-12345678-9",
    razonSocial: "Inversiones SA",
    emailFacturacion: "facturacion@inversiones.com",
  },
}

const timeline: TimelineEvent[] = [
  { id: "1", fecha: "2024-01-15", hora: "10:30", evento: "Inscripción iniciada", tipo: "info" },
  { id: "2", fecha: "2024-01-15", hora: "10:35", evento: "Datos personales completados", tipo: "info" },
  { id: "3", fecha: "2024-01-15", hora: "10:38", evento: "Segmento seleccionado: Público general", tipo: "info" },
  { id: "4", fecha: "2024-01-15", hora: "10:40", evento: "Tipo de inscripción: Empresa", tipo: "info" },
  {
    id: "5",
    fecha: "2024-01-15",
    hora: "10:42",
    evento: "Inscripción completada - Pendiente de pago",
    tipo: "warning",
  },
]

export default function InscripcionDetallePage() {
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const getTimelineIcon = (tipo: TimelineEvent["tipo"]) => {
    switch (tipo) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <div className="h-2 w-2 rounded-full bg-gray-400" />
    }
  }

  const estadoVariants: Record<string, string> = {
    confirmado: "bg-green-100 text-green-700",
    pendiente: "bg-yellow-100 text-yellow-700",
    cancelado: "bg-red-100 text-red-700",
  }

  return (
    <div className="space-y-6">
<div className="flex items-center gap-4">
        <BackButton href="/admin/inscripciones" label="Volver a inscripciones" />
        <Separator orientation="vertical" className="h-6" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inscripción {inscripcion.id}</h1>
          <p className="text-gray-500">{inscripcion.actividad}</p>
        </div>
        <Badge className={`ml-auto ${estadoVariants[inscripcion.estado]}`}>
          {inscripcion.estado.charAt(0).toUpperCase() + inscripcion.estado.slice(1)}
        </Badge>
      </div>

      <div className="flex gap-3">
        <Button className="bg-[#1c426e] hover:bg-[#15345a]" onClick={() => setIsConfirmOpen(true)}>
          <CheckCircle className="mr-2 h-4 w-4" />
          Confirmar pago
        </Button>
        <Button variant="outline" onClick={() => setIsUploadOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Subir comprobante
        </Button>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Generar factura
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Datos del alumno</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="font-medium">{inscripcion.alumno}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{inscripcion.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p className="font-medium">{inscripcion.telefono}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">DNI</p>
                <p className="font-medium">{inscripcion.dni}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Datos de inscripción</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Actividad</p>
                <p className="font-medium">{inscripcion.actividad}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Edición</p>
                <p className="font-medium">{inscripcion.edicion}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Segmento</p>
                <p className="font-medium">{inscripcion.segmento}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Monto</p>
                <p className="font-medium text-lg">{inscripcion.monto}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tipo</p>
                <Badge variant="outline" className="border-blue-300 text-blue-700">
                  Empresa
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fecha inscripción</p>
                <p className="font-medium">{inscripcion.fecha}</p>
              </div>
            </CardContent>
          </Card>

          {inscripcion.tipo === "empresa" && (
            <Card>
              <CardHeader>
                <CardTitle>Datos de facturación</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500">CUIT</p>
                  <p className="font-medium">{inscripcion.empresa.cuit}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Razón Social</p>
                  <p className="font-medium">{inscripcion.empresa.razonSocial}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-500">Email de facturación</p>
                  <p className="font-medium">{inscripcion.empresa.emailFacturacion}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-4">
                {timeline.map((event, index) => (
                  <div key={event.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-6 w-6 items-center justify-center">{getTimelineIcon(event.tipo)}</div>
                      {index < timeline.length - 1 && <div className="h-full w-px bg-gray-200 my-1" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-medium">{event.evento}</p>
                      <p className="text-xs text-gray-500">
                        {event.fecha} - {event.hora}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Subir comprobante</DialogTitle>
            <DialogDescription>Sube el comprobante de pago o factura relacionada a esta inscripción.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Archivo</Label>
              <Input type="file" accept=".pdf,.jpg,.jpeg,.png" />
            </div>
            <div className="space-y-2">
              <Label>Descripción (opcional)</Label>
              <Input placeholder="Ej: Comprobante de transferencia" />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-[#1c426e] hover:bg-[#15345a]">Subir</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar pago</DialogTitle>
            <DialogDescription>
              Esta acción marcará la inscripción como pagada y enviará un email de confirmación al alumno.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">{inscripcion.monto}</p>
                  <p className="text-sm text-gray-500">{inscripcion.alumno}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
                Cancelar
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">Confirmar pago</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
