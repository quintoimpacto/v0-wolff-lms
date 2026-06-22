"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { BookOpen, Award, Clock, FileText, PlayCircle, Bell, AlertTriangle, CheckCircle, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProgressBar } from "@/components/ui/progress-bar"

const cursosEnProgreso = [
  {
    id: "ecg-basico",
    titulo: "ECG Básico para el Médico Clínico",
    progreso: 65,
    ultimaClase: "Clase 7: Trastornos de la conducción",
    imagen: "/covers/ecg-basico.png",
  },
  {
    id: "ecocardiografia-basica",
    titulo: "Ecocardiografía Básica",
    progreso: 30,
    ultimaClase: "Clase 3: Evaluación de cámaras cardíacas",
    imagen: "/covers/ecocardiografia.png",
  },
  {
    id: "insuficiencia-cardiaca",
    titulo: "Insuficiencia Cardíaca: Actualización 2026",
    progreso: 45,
    ultimaClase: "Clase 4: Tratamiento farmacológico actual",
    imagen: "/covers/insuficiencia-cardiaca.png",
  },
]

const stats = [
  { label: "Horas de estudio", value: "48", icon: Clock, color: "text-violet-500", bgColor: "bg-violet-500/10" },
  { label: "Cursos activos", value: "3", icon: BookOpen, color: "text-violet-500", bgColor: "bg-violet-500/10" },
  { label: "Completados", value: "5", icon: Award, color: "text-violet-500", bgColor: "bg-violet-500/10" },
  { label: "Certificados", value: "4", icon: FileText, color: "text-violet-500", bgColor: "bg-violet-500/10" },
]

const actividadesPendientes = [
  {
    id: "1",
    titulo: "Cuestionario Módulo 2",
    curso: "ECG Básico para el Médico Clínico",
    vencimiento: "Venció hace 12 días",
    estado: "pendiente" as const,
    icon: FileText,
  },
  {
    id: "2",
    titulo: "Trabajo práctico: Interpretación de trazado",
    curso: "Ecocardiografía Básica",
    vencimiento: "Venció hace 7 días",
    estado: "no_entregado" as const,
    icon: AlertTriangle,
  },
  {
    id: "3",
    titulo: "Foro de discusión clínica",
    curso: "Diplomatura en Cardiología Clínica",
    vencimiento: "Entregado hace 5 días",
    estado: "aprobado" as const,
    icon: CheckCircle,
  },
  {
    id: "4",
    titulo: "Cuestionario Módulo 3",
    curso: "ECG Básico para el Médico Clínico",
    vencimiento: "Vence en 3 días",
    estado: "pendiente" as const,
    icon: FileText,
  },
  {
    id: "5",
    titulo: "Caso clínico final",
    curso: "Insuficiencia Cardíaca: Actualización 2026",
    vencimiento: "Venció hace 2 días",
    estado: "no_entregado" as const,
    icon: AlertTriangle,
  },
]

type EstadoActividad = "pendiente" | "no_entregado" | "aprobado"

const proximasClases = [
  {
    id: "1",
    dia: "15",
    mes: "Ene",
    titulo: "Webinar: Arritmias en la Práctica Diaria",
    hora: "10:00 hs - Online",
  },
  {
    id: "2",
    dia: "22",
    mes: "Ene",
    titulo: "Clase sincrónica: Manejo de la Hipertensión Arterial",
    hora: "18:00 hs - Online",
  },
]

const anuncios = [
  {
    id: "1",
    titulo: "Nueva edición de la Diplomatura en Cardiología Clínica disponible",
    fecha: "7 de enero",
  },
  {
    id: "2",
    titulo: "Mantenimiento programado del campus el 15 de enero",
    fecha: "5 de enero",
  },
]

const filtrosActividades = [
  { value: "pendiente" as EstadoActividad, label: "Pendientes" },
  { value: "no_entregado" as EstadoActividad, label: "No entregado" },
  { value: "aprobado" as EstadoActividad, label: "Aprobado" },
]

export default function AlumnoInicio() {
  const [filtroActividad, setFiltroActividad] = useState<EstadoActividad>("pendiente")

  const actividadesFiltradas = useMemo(() => {
    return actividadesPendientes.filter((a) => a.estado === filtroActividad)
  }, [filtroActividad])

  return (
    <div className="space-y-4">
      {/* Hero Banner + Stats Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Welcome Banner - 8 columns */}
        <Card className="border-border bg-card lg:col-span-8 py-0 my-0">
          <CardContent className="flex flex-col items-start justify-center gap-4 px-6 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-5">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-foreground sm:text-3xl leading-9">
                {"¡Hola, Juan! Estás a un paso de completar tu meta semanal. \n¿Continuamos con ECG Básico para el Médico Clínico?"}
              </h1>
            </div>
            <Button className="bg-[#111827] hover:bg-[#1F2937] text-white font-medium px-6 py-2" asChild>
              <Link href="/alumno/mis-cursos/ecg-basico">
                Continuar donde lo dejé
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Stats Grid 2x2 - 4 columns */}
        <div className="grid grid-cols-2 gap-3 lg:col-span-4 lg:grid-cols-2">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border bg-card min-w-0">
              <CardContent className="flex items-center gap-2 p-3 lg:p-4">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xl font-bold text-foreground lg:text-2xl">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight lg:text-xs truncate">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Column - 8 columns */}
        <div className="space-y-4 lg:col-span-8">
          {/* Próximas clases en vivo */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg font-semibold text-foreground">Próximas clases en vivo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 mt-0">
              {proximasClases.map((clase) => (
                <div
                  key={clase.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg text-primary-foreground bg-[rgba(255,18,0,1)]">
                      <span className="text-lg font-bold leading-none">{clase.dia}</span>
                      <span className="text-[10px] uppercase">{clase.mes}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{clase.titulo}</p>
                      <p className="text-sm text-muted-foreground">{clase.hora}</p>
                    </div>
                  </div>
                  <Button variant="link" size="sm" className="text-muted-foreground hover:text-primary p-0 h-auto">
                    Recordar
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Continuar aprendiendo */}
          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold text-foreground">Continuar aprendiendo</CardTitle>
              <Button variant="link" size="sm" className="text-primary hover:text-primary-hover p-0 h-auto" asChild>
                <Link href="/alumno/mis-cursos" className="flex items-center gap-1">
                  ver todos
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {cursosEnProgreso.map((curso) => (
                <div
                  key={curso.id}
                  className="flex flex-col gap-4 rounded-xl border border-border bg-secondary p-4 sm:flex-row sm:items-center"
                >
                  <img
                    src={curso.imagen || "/placeholder.svg"}
                    alt={curso.titulo}
                    className="h-20 w-full rounded-lg object-cover sm:w-24 sm:h-16"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-foreground">{curso.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{curso.ultimaClase}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <ProgressBar value={curso.progreso} className="h-2" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">{curso.progreso}%</span>
                    </div>
                  </div>
                  <Button className="bg-[#111827] hover:bg-[#1F2937] text-white shrink-0" size="sm" asChild>
                    <Link href={`/alumno/mis-cursos/${curso.id}`}>
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Continuar
                    </Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          </div>

        {/* Right Column - 4 columns */}
        <div className="space-y-4 lg:col-span-4">
          {/* Actividades */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-foreground">Actividades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filtros */}
              <div className="grid grid-cols-3 gap-1.5 w-full">
                {filtrosActividades.map((filtro) => (
                  <button
                    key={filtro.value}
                    onClick={() => setFiltroActividad(filtro.value)}
                    className={`px-2 py-1.5 text-[10px] sm:text-xs font-medium rounded-[4px] border transition-colors truncate ${
                      filtroActividad === filtro.value
                        ? "bg-[#111827] text-white border-[#111827]"
                        : "bg-card text-text-secondary border-border hover:border-[#111827] hover:text-[#111827]"
                    }`}
                  >
                    {filtro.label}
                  </button>
                ))}
              </div>

              {/* Lista de actividades */}
              <div className="space-y-3">
                {actividadesFiltradas.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No hay actividades en esta categoría</p>
                ) : (
                  actividadesFiltradas.map((actividad) => (
                    <div key={actividad.id} className="flex items-start gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        actividad.estado === "pendiente" ? "bg-warning/10" :
                        actividad.estado === "no_entregado" ? "bg-destructive/10" :
                        "bg-success/10"
                      }`}>
                        <actividad.icon className={`h-4 w-4 ${
                          actividad.estado === "pendiente" ? "text-warning" :
                          actividad.estado === "no_entregado" ? "text-destructive" :
                          "text-success"
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm">{actividad.titulo}</p>
                        <p className="text-xs text-muted-foreground">{actividad.curso}</p>
                        <p className={`text-xs mt-1 ${
                          actividad.estado === "no_entregado" ? "text-destructive" :
                          actividad.estado === "aprobado" ? "text-success" :
                          "text-muted-foreground"
                        }`}>
                          {actividad.vencimiento}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Anuncios recientes */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-foreground">Anuncios recientes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {anuncios.map((anuncio) => (
                <div key={anuncio.id} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                    <Bell className="h-4 w-4 text-violet-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">{anuncio.titulo}</p>
                    <p className="text-xs text-muted-foreground mt-1">{anuncio.fecha}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
