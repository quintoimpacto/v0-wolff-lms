import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"

const inscripciones = [
  {
    id: "INS-001",
    curso: "Introducción al Mercado de Capitales",
    estado: "confirmado",
    fechaInicio: "15 de Enero 2026",
    modalidad: "Virtual sincrónico",
  },
]

export default function MisInscripcionesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-2xl font-bold text-gray-900">Mis inscripciones</h1>

        {inscripciones.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="mb-4 text-gray-500">No tenés inscripciones activas</p>
              <Button asChild className="bg-[#1c426e] hover:bg-[#15345a]">
                <Link href="/">Ver cursos disponibles</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {inscripciones.map((inscripcion) => (
              <Card key={inscripcion.id} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">{inscripcion.curso}</CardTitle>
                  <Badge
                    className={
                      inscripcion.estado === "confirmado"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {inscripcion.estado === "confirmado" ? "Confirmado" : "Pendiente"}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Inicio: {inscripcion.fechaInicio}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{inscripcion.modalidad}</span>
                    </div>
                  </div>
                  <Button variant="link" className="mt-4 h-auto p-0 text-[#1c426e]" asChild>
                    <Link href={`/curso/1`}>
                      Ver detalles del curso
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
