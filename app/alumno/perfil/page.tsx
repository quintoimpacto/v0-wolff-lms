"use client"

import { useState } from "react"
import { Camera, Mail, Phone, MapPin, Building, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BackButton } from "@/components/back-button"

export default function Perfil() {
  const [formData, setFormData] = useState({
    nombre: "Juan",
    apellido: "Díaz",
    email: "juan.diaz@email.com",
    telefono: "+54 11 1234-5678",
    dni: "30.123.456",
    provincia: "Buenos Aires",
    empresa: "Hospital Italiano de Buenos Aires",
    cargo: "Médico Cardiólogo",
  })

  return (
    <div className="space-y-6">
      <div>
        <BackButton href="/alumno" label="Volver al inicio" />
        <h1 className="text-2xl font-semibold text-[#111827] mt-2">Mi perfil</h1>
        <p className="mt-1 text-[#6B7280]">Administra tu información personal</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Avatar Card */}
        <Card className="border-[#E5E7EB] bg-white lg:col-span-1">
          <CardContent className="flex flex-col items-center py-8">
            <div className="relative">
              <Avatar className="h-32 w-32">
                <AvatarImage src="/professional-man-portrait.png" alt="Avatar" className="object-cover" />
                <AvatarFallback className="bg-[#0244eb] text-2xl text-white">JD</AvatarFallback>
              </Avatar>
              <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-[#F7F8FA] hover:bg-[#E5E7EB] border border-[#E5E7EB]">
                <Camera className="h-4 w-4 text-[#4B5563]" />
              </Button>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-[#111827]">
              {formData.nombre} {formData.apellido}
            </h2>
            <p className="text-sm text-[#6B7280]">{formData.cargo}</p>
            <p className="text-sm text-[#6B7280]">{formData.empresa}</p>

            <Separator className="my-6 w-full bg-[#E5E7EB]" />

            <div className="w-full space-y-3 text-sm">
              <div className="flex items-center gap-3 text-[#4B5563]">
                <Mail className="h-4 w-4 text-[#6B7280]" />
                {formData.email}
              </div>
              <div className="flex items-center gap-3 text-[#4B5563]">
                <Phone className="h-4 w-4 text-[#6B7280]" />
                {formData.telefono}
              </div>
              <div className="flex items-center gap-3 text-[#4B5563]">
                <MapPin className="h-4 w-4 text-[#6B7280]" />
                {formData.provincia}
              </div>
              <div className="flex items-center gap-3 text-[#4B5563]">
                <Building className="h-4 w-4 text-[#6B7280]" />
                {formData.empresa}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Card */}
        <Card className="border-[#E5E7EB] bg-white lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#111827]">Información personal</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-[#111827]">Nombre</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="border-[#E5E7EB] focus:border-[#0244eb]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido" className="text-[#111827]">Apellido</Label>
                  <Input
                    id="apellido"
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                    className="border-[#E5E7EB] focus:border-[#0244eb]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#111827]">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-[#E5E7EB] focus:border-[#0244eb]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono" className="text-[#111827]">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="border-[#E5E7EB] focus:border-[#0244eb]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dni" className="text-[#111827]">DNI/CUIT</Label>
                  <Input
                    id="dni"
                    value={formData.dni}
                    onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                    className="border-[#E5E7EB] focus:border-[#0244eb]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provincia" className="text-[#111827]">Provincia</Label>
                  <Select
                    value={formData.provincia}
                    onValueChange={(value) => setFormData({ ...formData, provincia: value })}
                  >
                    <SelectTrigger id="provincia" className="border-[#E5E7EB]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Buenos Aires">Buenos Aires</SelectItem>
                      <SelectItem value="CABA">CABA</SelectItem>
                      <SelectItem value="Córdoba">Córdoba</SelectItem>
                      <SelectItem value="Santa Fe">Santa Fe</SelectItem>
                      <SelectItem value="Mendoza">Mendoza</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="bg-[#E5E7EB]" />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="empresa" className="text-[#111827]">Institución</Label>
                  <Input
                    id="empresa"
                    value={formData.empresa}
                    onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    className="border-[#E5E7EB] focus:border-[#0244eb]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargo" className="text-[#111827]">Especialidad</Label>
                  <Input
                    id="cargo"
                    value={formData.cargo}
                    onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                    className="border-[#E5E7EB] focus:border-[#0244eb]"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-[#0244eb] hover:bg-[#0238c7] transition-colors">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar cambios
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
