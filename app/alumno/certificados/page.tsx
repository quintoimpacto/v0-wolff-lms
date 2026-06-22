import { Download, Award, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"

const certificados = [
  {
    id: "cert-001",
    curso: "Evaluación del Riesgo Cardiovascular",
    fecha: "15 de Diciembre, 2025",
    codigo: "WOLFF-2025-ERC-001234",
    imagen: "/covers/riesgo-cardiovascular.png",
  },
  {
    id: "cert-002",
    curso: "Monitoreo Holter e Interpretación",
    fecha: "28 de Noviembre, 2025",
    codigo: "WOLFF-2025-HOL-001198",
    imagen: "/covers/holter.png",
  },
  {
    id: "cert-003",
    curso: "Webinar: Arritmias en la Práctica Diaria",
    fecha: "10 de Octubre, 2025",
    codigo: "WOLFF-2025-ARR-000987",
    imagen: "/covers/arritmias.png",
  },
  {
    id: "cert-004",
    curso: "Hipertensión Arterial: Diagnóstico y Tratamiento",
    fecha: "5 de Septiembre, 2025",
    codigo: "WOLFF-2025-HTA-000876",
    imagen: "/covers/hipertension.png",
  },
]

export default function Certificados() {
  return (
<div className="space-y-6">
      <div>
        <BackButton href="/alumno" label="Volver al inicio" />
        <h1 className="text-2xl font-semibold text-[#111827] mt-2">Mis certificados</h1>
        <p className="mt-1 text-[#6B7280]">Descarga y comparte tus logros académicos</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {certificados.map((cert) => (
          <Card key={cert.id} className="overflow-hidden border-[#E5E7EB] bg-white">
            <div className="relative">
              <img src={cert.imagen || "/placeholder.svg"} alt={cert.curso} className="h-48 w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-[#111827]/40">
                <Award className="h-16 w-16 text-white/80" />
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-[#111827]">{cert.curso}</h3>
              <p className="mt-1 text-sm text-[#6B7280]">Emitido el {cert.fecha}</p>
              <p className="mt-1 text-xs text-[#6B7280]">Código: {cert.codigo}</p>
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 bg-[#0244eb] hover:bg-[#0238c7] transition-colors">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar PDF
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent border-[#E5E7EB] text-[#4B5563] hover:bg-[#F7F8FA]">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {certificados.length === 0 && (
        <Card className="border-[#E5E7EB] bg-white">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Award className="h-12 w-12 text-[#E5E7EB]" />
            <p className="mt-4 text-[#6B7280]">Aún no tienes certificados</p>
            <p className="text-sm text-[#6B7280]">Completa tus cursos para obtenerlos</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
