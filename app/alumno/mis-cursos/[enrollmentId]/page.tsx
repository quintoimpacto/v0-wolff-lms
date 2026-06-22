"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  CheckCircle,
  Clock,
  FileText,
  Upload,
  Download,
  Award,
  Lock,
  Video,
  File,
  ImageIcon,
  X,
  ClipboardList,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/back-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { QuizModal, type QuizData, type QuizResult } from "@/components/quiz/quiz-modal"

// Mock data
const cursoData = {
  id: "ecg-basico",
  titulo: "ECG Básico para el Médico Clínico",
  tipo: "Curso",
  progreso: 65,
  totalClases: 10,
  clasesCompletadas: 6,
  horasTotales: 20,
  certificadoDisponible: false,
  condicionesCertificado: [
    { texto: "Completar el 100% de las clases", cumplida: false },
    { texto: "Aprobar todas las actividades obligatorias", cumplida: false },
    { texto: "Asistencia mínima del 75%", cumplida: true },
  ],
}

const modulos = [
  {
    id: "mod-1",
    titulo: "Módulo 1: Fundamentos del ECG",
    clases: [
      {
        id: "clase-1",
        titulo: "Anatomía y fisiología del sistema de conducción",
        duracion: "45 min",
        completada: true,
        videoUrl: "#",
      },
      { id: "clase-2", titulo: "Derivaciones y colocación de electrodos", duracion: "38 min", completada: true, videoUrl: "#" },
      {
        id: "clase-3",
        titulo: "El trazado normal: ondas, intervalos y segmentos",
        duracion: "52 min",
        completada: true,
        videoUrl: "#",
      },
    ],
  },
  {
    id: "mod-2",
    titulo: "Módulo 2: Ritmo y Frecuencia",
    clases: [
      { id: "clase-4", titulo: "Cálculo de la frecuencia cardíaca", duracion: "40 min", completada: true, videoUrl: "#" },
      { id: "clase-5", titulo: "Ritmo sinusal y arritmias frecuentes", duracion: "55 min", completada: true, videoUrl: "#" },
      { id: "clase-6", titulo: "Extrasístoles y bloqueos", duracion: "35 min", completada: true, videoUrl: "#" },
    ],
  },
  {
    id: "mod-3",
    titulo: "Módulo 3: Trastornos de la Conducción",
    clases: [
      { id: "clase-7", titulo: "Bloqueos de rama y hemibloqueos", duracion: "48 min", completada: false, videoUrl: "#" },
      { id: "clase-8", titulo: "Síndromes de preexcitación", duracion: "50 min", completada: false, videoUrl: "#" },
    ],
  },
  {
    id: "mod-4",
    titulo: "Módulo 4: Isquemia e Infarto",
    clases: [
      { id: "clase-9", titulo: "Cambios isquémicos en el ECG", duracion: "45 min", completada: false, videoUrl: "#" },
      { id: "clase-10", titulo: "Localización del infarto y diagnóstico diferencial", duracion: "60 min", completada: false, videoUrl: "#" },
    ],
  },
]

const actividades = [
  {
    id: "act-1",
    titulo: "Cuestionario Módulo 1",
    tipo: "cuestionario",
    estado: "aprobado" as const,
    nota: 8,
    fechaEntrega: "2025-11-20",
    obligatoria: true,
    quizId: "quiz-1",
  },
  {
    id: "act-2",
    titulo: "Análisis de caso: Interpretación de un ECG patológico",
    tipo: "entrega",
    estado: "aprobado" as const,
    nota: 9,
    fechaEntrega: "2025-12-05",
    obligatoria: true,
  },
  {
    id: "act-3",
    titulo: "Cuestionario Módulo 2",
    tipo: "cuestionario",
    estado: "pendiente" as const,
    fechaLimite: "2026-01-20",
    obligatoria: true,
    quizId: "quiz-2",
  },
  {
    id: "act-4",
    titulo: "Trabajo práctico: Informe de un caso isquémico",
    tipo: "entrega",
    estado: "no_entregado" as const,
    fechaLimite: "2026-01-25",
    obligatoria: true,
  },
  {
    id: "act-5",
    titulo: "Foro de discusión: Casos clínicos de arritmias",
    tipo: "foro",
    estado: "opcional" as const,
    obligatoria: false,
  },
  {
    id: "act-6",
    titulo: "Cuestionario Módulos 3 y 4",
    tipo: "cuestionario",
    estado: "pendiente" as const,
    fechaLimite: "2026-02-01",
    obligatoria: true,
    quizId: "quiz-3",
  },
]

// Mock data de cuestionarios conversacionales
const cuestionarios: Record<string, QuizData> = {
  "quiz-1": {
    id: "quiz-1",
    titulo: "Cuestionario Módulo 1: Fundamentos del ECG",
    descripcion: "Evaluación conversacional sobre el sistema de conducción, las derivaciones y el trazado normal.",
    modulosVinculados: ["Módulo 1: Fundamentos del ECG"],
    intentosPermitidos: 3,
    intentosRealizados: 1,
    notaAprobacion: 60,
    mejorNota: 8,
    preguntas: [
      { id: "q1-1", pregunta: "¿Cuáles son los componentes del sistema de conducción cardíaco y qué función cumple cada uno?" },
      { id: "q1-2", pregunta: "Explicame con tus palabras qué representan las derivaciones del plano frontal y del plano horizontal, y dame un ejemplo de cada una." },
      { id: "q1-3", pregunta: "¿Qué representan la onda P, el complejo QRS y la onda T en el electrocardiograma?" },
      { id: "q1-4", pregunta: "¿Cuáles son los valores normales del intervalo PR y del complejo QRS, y qué indican sus alteraciones?" },
      { id: "q1-5", pregunta: "¿Por qué es importante la correcta colocación de los electrodos? Dame un ejemplo de un error frecuente y sus consecuencias." },
    ],
  },
  "quiz-2": {
    id: "quiz-2",
    titulo: "Cuestionario Módulo 2: Ritmo y Frecuencia",
    descripcion: "Evaluación conversacional sobre el cálculo de la frecuencia, el ritmo sinusal y las arritmias frecuentes.",
    modulosVinculados: ["Módulo 2: Ritmo y Frecuencia"],
    intentosPermitidos: 3,
    intentosRealizados: 0,
    notaAprobacion: 60,
    preguntas: [
      { id: "q2-1", pregunta: "¿Qué métodos conocés para calcular la frecuencia cardíaca a partir de un ECG y cuándo conviene usar cada uno?" },
      { id: "q2-2", pregunta: "Describí brevemente los criterios que definen un ritmo sinusal normal." },
      { id: "q2-3", pregunta: "¿Cómo diferenciarías una fibrilación auricular de un aleteo (flutter) auricular en el trazado?" },
      { id: "q2-4", pregunta: "¿Qué son las extrasístoles ventriculares y cómo se reconocen en el ECG?" },
      { id: "q2-5", pregunta: "¿Cuáles son los grados de bloqueo auriculoventricular y cómo se distinguen entre sí?" },
      { id: "q2-6", pregunta: "Si encontrás una bradicardia sintomática en un paciente, ¿qué hallazgos del ECG orientarían tu conducta?" },
    ],
  },
  "quiz-3": {
    id: "quiz-3",
    titulo: "Cuestionario Módulos 3 y 4: Conducción, Isquemia e Infarto",
    descripcion: "Evaluación integral conversacional sobre trastornos de la conducción, cambios isquémicos y diagnóstico del infarto.",
    modulosVinculados: ["Módulo 3: Trastornos de la Conducción", "Módulo 4: Isquemia e Infarto"],
    intentosPermitidos: 2,
    intentosRealizados: 0,
    notaAprobacion: 70,
    preguntas: [
      { id: "q3-1", pregunta: "¿Cómo se reconocen en el ECG el bloqueo de rama derecha y el de rama izquierda, y por qué es importante diferenciarlos?" },
      { id: "q3-2", pregunta: "Explicame qué son los hemibloqueos y cómo afectan el eje eléctrico cardíaco." },
      { id: "q3-3", pregunta: "¿Qué caracteriza al síndrome de Wolff-Parkinson-White en el electrocardiograma?" },
      { id: "q3-4", pregunta: "¿Cuáles son los cambios electrocardiográficos típicos de la isquemia, la lesión y la necrosis?" },
      { id: "q3-5", pregunta: "¿Qué diferencia hay entre un infarto con supradesnivel del ST (IAMCEST) y uno sin supradesnivel?" },
      { id: "q3-6", pregunta: "¿Cómo localizarías un infarto según las derivaciones afectadas? Dame un ejemplo de cara anterior e inferior." },
      { id: "q3-7", pregunta: "Ante un dolor torácico con ECG dudoso, ¿qué conducta y qué estudios complementarios indicarías?" },
    ],
  },
}

const materiales = [
  { id: "mat-1", titulo: "Presentación Módulo 1", tipo: "pdf", tamaño: "2.4 MB", modulo: "Módulo 1" },
  { id: "mat-2", titulo: "Presentación Módulo 2", tipo: "pdf", tamaño: "3.1 MB", modulo: "Módulo 2" },
  { id: "mat-3", titulo: "Glosario de términos electrocardiográficos", tipo: "pdf", tamaño: "890 KB", modulo: "General" },
  { id: "mat-4", titulo: "Planilla de cálculo - Frecuencia y ejes", tipo: "xlsx", tamaño: "156 KB", modulo: "Módulo 2" },
  { id: "mat-5", titulo: "Video complementario: Caso real de IAMCEST", tipo: "video", tamaño: "45 MB", modulo: "Módulo 4" },
  { id: "mat-6", titulo: "Infografía: Localización del infarto por derivaciones", tipo: "imagen", tamaño: "1.2 MB", modulo: "Módulo 4" },
]

const estadoActividadConfig = {
  aprobado: { label: "Aprobado", color: "text-[#16A34A]", bg: "bg-[#16A34A]/10 border-[#16A34A]/30" },
  pendiente: { label: "Pendiente", color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10 border-[#F59E0B]/30" },
  no_entregado: { label: "No entregado", color: "text-[#DC2626]", bg: "bg-[#DC2626]/10 border-[#DC2626]/30" },
  opcional: { label: "Opcional", color: "text-[#6B7280]", bg: "bg-[#F7F8FA] border-[#E5E7EB]" },
}

const tipoMaterialIcon = {
  pdf: FileText,
  xlsx: File,
  video: Video,
  imagen: ImageIcon,
}

export default function CursoDetalle() {
  const params = useParams()
  const [selectedClase, setSelectedClase] = useState<string | null>("clase-7")
  const [entregaModalOpen, setEntregaModalOpen] = useState(false)
  const [selectedActividad, setSelectedActividad] = useState<(typeof actividades)[0] | null>(null)
  const [entregaTexto, setEntregaTexto] = useState("")
  const [archivoSubido, setArchivoSubido] = useState<File | null>(null)
  
  // Quiz state
  const [quizModalOpen, setQuizModalOpen] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null)

  const claseActual = modulos.flatMap((m) => m.clases).find((c) => c.id === selectedClase)

  const handleOpenEntrega = (actividad: (typeof actividades)[0]) => {
    setSelectedActividad(actividad)
    setEntregaModalOpen(true)
  }

  const handleOpenQuiz = (quizId: string) => {
    const quiz = cuestionarios[quizId]
    if (quiz) {
      setSelectedQuiz(quiz)
      setQuizModalOpen(true)
    }
  }

  const handleQuizComplete = (resultado: QuizResult) => {
    // Aquí se actualizaría el estado de la actividad en la base de datos
    // Por ejemplo: actualizar la nota y estado de la actividad
  }

  const handleSubmitEntrega = () => {
    // Mock submit
    setEntregaModalOpen(false)
    setEntregaTexto("")
    setArchivoSubido(null)
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="flex items-center gap-2">
        <BackButton href="/alumno/mis-cursos" label="Volver a mis cursos" />
        <ChevronRight className="h-4 w-4 text-[#E5E7EB]" />
        <span className="text-[#111827] font-medium">{cursoData.titulo}</span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge variant="outline" className="mb-2 border-[#E5E7EB] text-[#4B5563] bg-transparent">
            {cursoData.tipo}
          </Badge>
          <h1 className="text-2xl font-semibold text-[#111827]">{cursoData.titulo}</h1>
          <div className="mt-3 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Progress value={cursoData.progreso} className="h-2 w-32" />
              <span className="text-sm font-medium text-[#4B5563]">{cursoData.progreso}%</span>
            </div>
            <span className="text-sm text-[#6B7280]">
              {cursoData.clasesCompletadas}/{cursoData.totalClases} clases
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="clases" className="space-y-6">
        <TabsList className="h-auto flex-wrap gap-2 bg-transparent p-0">
          <TabsTrigger
            value="clases"
            className="rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] px-4 py-2 data-[state=active]:border-[#111827] data-[state=active]:bg-[#111827] data-[state=active]:text-white"
          >
            Clases
          </TabsTrigger>
          <TabsTrigger
            value="actividades"
            className="rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] px-4 py-2 data-[state=active]:border-[#111827] data-[state=active]:bg-[#111827] data-[state=active]:text-white"
          >
            Actividades
          </TabsTrigger>
          <TabsTrigger
            value="materiales"
            className="rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] px-4 py-2 data-[state=active]:border-[#111827] data-[state=active]:bg-[#111827] data-[state=active]:text-white"
          >
            Materiales
          </TabsTrigger>
          <TabsTrigger
            value="certificado"
            className="rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] px-4 py-2 data-[state=active]:border-[#111827] data-[state=active]:bg-[#111827] data-[state=active]:text-white"
          >
            Certificado
          </TabsTrigger>
        </TabsList>

        {/* Clases Tab */}
        <TabsContent value="clases" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <Card className="border-[#E5E7EB] bg-white overflow-hidden">
                <div className="aspect-video bg-[#111827] flex items-center justify-center">
                  {claseActual ? (
                    <div className="text-center text-white">
                      <PlayCircle className="mx-auto h-16 w-16 opacity-80" />
                      <p className="mt-4 text-lg font-medium">{claseActual.titulo}</p>
                      <p className="mt-1 text-sm text-white/60">{claseActual.duracion}</p>
                    </div>
                  ) : (
                    <p className="text-white/60">Selecciona una clase para comenzar</p>
                  )}
                </div>
                {claseActual && (
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[#111827]">{claseActual.titulo}</h3>
                        <p className="text-sm text-[#6B7280]">Duración: {claseActual.duracion}</p>
                      </div>
                      <Button
                        className={cn(
                          "transition-colors",
                          claseActual.completada
                            ? "bg-[#16A34A] hover:bg-[#15803D] text-white"
                            : "bg-[#111827] hover:bg-[#1F2937] text-white",
                        )}
                      >
                        {claseActual.completada ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Completada
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Marcar como vista
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>

            {/* Módulos Accordion */}
            <div className="lg:col-span-1">
              <Card className="border-[#E5E7EB] bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-[#111827]">Contenido del curso</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Accordion type="multiple" defaultValue={["mod-3"]} className="w-full">
                    {modulos.map((modulo) => {
                      const completadas = modulo.clases.filter((c) => c.completada).length
                      return (
                        <AccordionItem key={modulo.id} value={modulo.id} className="border-b border-[#E5E7EB]">
                          <AccordionTrigger className="px-4 py-3 text-sm hover:no-underline hover:bg-[#F7F8FA]">
                            <div className="flex flex-col items-start text-left">
                              <span className="font-medium text-[#111827]">{modulo.titulo}</span>
                              <span className="text-xs text-[#6B7280]">
                                {completadas}/{modulo.clases.length} clases
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pb-0">
                            <div className="space-y-1 px-2 pb-2">
                              {modulo.clases.map((clase) => (
                                <button
                                  key={clase.id}
                                  onClick={() => setSelectedClase(clase.id)}
                                  className={cn(
                                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-200",
                                    selectedClase === clase.id
                                      ? "bg-[#111827] text-white"
                                      : "hover:bg-[#F7F8FA] text-[#4B5563]",
                                  )}
                                >
                                  {clase.completada ? (
                                    <CheckCircle
                                      className={cn(
                                        "h-4 w-4 shrink-0",
                                        selectedClase === clase.id ? "text-[#86EFAC]" : "text-[#16A34A]",
                                      )}
                                    />
                                  ) : (
                                    <PlayCircle className="h-4 w-4 shrink-0 opacity-60" />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{clase.titulo}</p>
                                    <p
                                      className={cn(
                                        "text-xs",
                                        selectedClase === clase.id ? "text-white/70" : "text-[#6B7280]",
                                      )}
                                    >
                                      {clase.duracion}
                                    </p>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    })}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Actividades Tab */}
        <TabsContent value="actividades" className="space-y-4">
          <div className="grid gap-4">
            {actividades.map((actividad) => {
              const config = estadoActividadConfig[actividad.estado]
              return (
                <Card key={actividad.id} className="border-[#E5E7EB] bg-white">
                  <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {actividad.tipo === "cuestionario" && (
                          <div className="flex h-6 w-6 items-center justify-center rounded bg-[#F3F4F6]">
                            <ClipboardList className="h-3.5 w-3.5 text-[#111827]" />
                          </div>
                        )}
                        <h3 className="font-medium text-[#111827]">{actividad.titulo}</h3>
                        {actividad.obligatoria && (
                          <Badge variant="outline" className="text-xs border-[#E5E7EB] text-[#4B5563] bg-transparent">
                            Obligatoria
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-[#6B7280]">
                        <Badge variant="outline" className={cn("border", config.bg, config.color)}>
                          {config.label}
                        </Badge>
                        {actividad.nota && (
                          <span>
                            Nota: <strong className="text-[#111827]">{actividad.nota}/10</strong>
                          </span>
                        )}
                        {actividad.fechaEntrega && (
                          <span>Entregado: {new Date(actividad.fechaEntrega).toLocaleDateString("es-AR")}</span>
                        )}
                        {actividad.fechaLimite && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            Vence: {new Date(actividad.fechaLimite).toLocaleDateString("es-AR")}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {/* Cuestionarios pendientes */}
                      {actividad.tipo === "cuestionario" && (actividad.estado === "pendiente" || actividad.estado === "no_entregado") && actividad.quizId && (
                        <Button
                          size="sm"
                          className="bg-[#111827] hover:bg-[#1F2937] text-white transition-colors"
                          onClick={() => handleOpenQuiz(actividad.quizId!)}
                        >
                          <ClipboardList className="mr-1 h-4 w-4" />
                          Realizar cuestionario
                        </Button>
                      )}
                      {/* Cuestionarios aprobados - ver resultados */}
                      {actividad.tipo === "cuestionario" && actividad.estado === "aprobado" && actividad.quizId && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="bg-transparent border-[#E5E7EB] text-[#4B5563] hover:bg-[#F7F8FA]"
                          onClick={() => handleOpenQuiz(actividad.quizId!)}
                        >
                          <ClipboardList className="mr-1 h-4 w-4" />
                          Ver cuestionario
                        </Button>
                      )}
                      {/* Entregas pendientes (no cuestionarios) */}
                      {actividad.tipo !== "cuestionario" && (actividad.estado === "pendiente" || actividad.estado === "no_entregado") && (
                        <Button
                          size="sm"
                          className="bg-[#111827] hover:bg-[#1F2937] text-white transition-colors"
                          onClick={() => handleOpenEntrega(actividad)}
                        >
                          <Upload className="mr-1 h-4 w-4" />
                          Entregar
                        </Button>
                      )}
                      {/* Entregas aprobadas (no cuestionarios) */}
                      {actividad.tipo !== "cuestionario" && actividad.estado === "aprobado" && (
                        <Button size="sm" variant="outline" className="bg-transparent border-[#E5E7EB] text-[#4B5563] hover:bg-[#F7F8FA]">
                          Ver entrega
                        </Button>
                      )}
                      {actividad.estado === "opcional" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-transparent border-[#E5E7EB] text-[#4B5563] hover:bg-[#F7F8FA]"
                          onClick={() => handleOpenEntrega(actividad)}
                        >
                          Participar
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Materiales Tab */}
        <TabsContent value="materiales" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {materiales.map((material) => {
              const IconComponent = tipoMaterialIcon[material.tipo as keyof typeof tipoMaterialIcon] || File
              return (
                <Card key={material.id} className="border-[#E5E7EB] bg-white hover:border-[#0244eb]/30 transition-colors">
                  <CardContent className="flex items-start gap-4 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3F4F6]">
                      <IconComponent className="h-5 w-5 text-[#111827]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[#111827] truncate">{material.titulo}</h3>
                      <p className="text-sm text-[#6B7280]">
                        {material.modulo} • {material.tamaño}
                      </p>
                    </div>
                    <Button size="icon" variant="ghost" className="shrink-0 hover:bg-[#F7F8FA]" aria-label="Descargar">
                      <Download className="h-4 w-4 text-[#4B5563]" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Certificado Tab */}
        <TabsContent value="certificado" className="space-y-6">
          <Card className="border-[#E5E7EB] bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    "flex h-20 w-20 items-center justify-center rounded-full",
                    cursoData.certificadoDisponible ? "bg-[#16A34A]/10" : "bg-[#F7F8FA]",
                  )}
                >
                  {cursoData.certificadoDisponible ? (
                    <Award className="h-10 w-10 text-[#16A34A]" />
                  ) : (
                    <Lock className="h-10 w-10 text-[#6B7280]" />
                  )}
                </div>
                <h2 className="mt-4 text-xl font-semibold text-[#111827]">
                  {cursoData.certificadoDisponible ? "Tu certificado está listo" : "Certificado no disponible aún"}
                </h2>
                <p className="mt-2 max-w-md text-[#6B7280]">
                  {cursoData.certificadoDisponible
                    ? "Felicitaciones por completar el curso. Descarga tu certificado a continuación."
                    : "Completa las siguientes condiciones para obtener tu certificado:"}
                </p>

                {!cursoData.certificadoDisponible && (
                  <div className="mt-6 w-full max-w-md space-y-3">
                    {cursoData.condicionesCertificado.map((condicion, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "flex items-center gap-3 rounded-lg border p-3",
                          condicion.cumplida ? "border-[#16A34A]/30 bg-[#16A34A]/10" : "border-[#E5E7EB] bg-[#F7F8FA]",
                        )}
                      >
                        {condicion.cumplida ? (
                          <CheckCircle className="h-5 w-5 shrink-0 text-[#16A34A]" />
                        ) : (
                          <div className="h-5 w-5 shrink-0 rounded-full border-2 border-[#E5E7EB]" />
                        )}
                        <span className={cn("text-sm", condicion.cumplida ? "text-[#16A34A]" : "text-[#4B5563]")}>
                          {condicion.texto}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  className="mt-6 bg-[#111827] hover:bg-[#1F2937] text-white transition-colors"
                  disabled={!cursoData.certificadoDisponible}
                  size="lg"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Descargar certificado PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal Entregar Actividad */}
      <Dialog open={entregaModalOpen} onOpenChange={setEntregaModalOpen}>
        <DialogContent className="sm:max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#111827]">Entregar actividad</DialogTitle>
            <DialogDescription className="text-[#6B7280]">{selectedActividad?.titulo}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="respuesta" className="text-[#111827]">Respuesta o comentarios</Label>
              <Textarea
                id="respuesta"
                placeholder="Escribe tu respuesta aquí..."
                value={entregaTexto}
                onChange={(e) => setEntregaTexto(e.target.value)}
                rows={4}
                className="border-[#E5E7EB] focus:border-[#0244eb]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#111827]">Adjuntar archivo</Label>
              <div className="rounded-lg border-2 border-dashed border-[#E5E7EB] p-6 text-center hover:border-[#0244eb]/50 transition-colors">
                {archivoSubido ? (
                  <div className="flex items-center justify-center gap-2">
                    <File className="h-5 w-5 text-[#4B5563]" />
                    <span className="text-sm text-[#111827]">{archivoSubido.name}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-[#F7F8FA]" onClick={() => setArchivoSubido(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto h-8 w-8 text-[#6B7280]" />
                    <p className="mt-2 text-sm text-[#6B7280]">
                      Arrastra un archivo o{" "}
                      <label className="cursor-pointer text-[#2563EB] hover:text-[#0244eb] hover:underline transition-colors">
                        haz clic para seleccionar
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => setArchivoSubido(e.target.files?.[0] || null)}
                        />
                      </label>
                    </p>
                    <p className="mt-1 text-xs text-[#6B7280]">PDF, DOC, DOCX, XLS hasta 10MB</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEntregaModalOpen(false)} className="bg-transparent border-[#E5E7EB] text-[#4B5563] hover:bg-[#F7F8FA]">
              Cancelar
            </Button>
            <Button
              className="bg-[#111827] hover:bg-[#1F2937] text-white transition-colors"
              onClick={handleSubmitEntrega}
              disabled={!entregaTexto && !archivoSubido}
            >
              Enviar entrega
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Cuestionario */}
      {selectedQuiz && (
        <QuizModal
          quiz={selectedQuiz}
          open={quizModalOpen}
          onClose={() => {
            setQuizModalOpen(false)
            setSelectedQuiz(null)
          }}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  )
}
