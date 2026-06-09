"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { CheckCircle, Send, Bot, User, BookOpen, Clock, RotateCcw, ThumbsUp, AlertCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export interface QuizQuestion {
  id: string
  pregunta: string
}

export interface QuizData {
  id: string
  titulo: string
  descripcion?: string
  modulosVinculados: string[]
  preguntas: QuizQuestion[]
  intentosPermitidos: number
  intentosRealizados: number
  notaAprobacion: number
  mejorNota?: number
}

interface QuizModalProps {
  quiz: QuizData
  open: boolean
  onClose: () => void
  onComplete: (resultado: QuizResult) => void
}

export interface QuizResult {
  quizId: string
  respuestas: { preguntaId: string; respuesta: string; evaluacion: EvaluacionRespuesta }[]
  notaFinal: number
  tiempoUtilizado: number
}

interface EvaluacionRespuesta {
  tipo: "correcta" | "parcial" | "incorrecta"
  puntaje: number // 0-10
  feedback: string
  sugerencia?: string
}

interface ChatMessage {
  id: string
  tipo: "agente" | "usuario"
  contenido: string
  preguntaId?: string
  timestamp: Date
  evaluacion?: EvaluacionRespuesta
}

type QuizState = "intro" | "chat" | "completed"

// Mock de evaluaciones simuladas para demostrar la funcionalidad
const evaluacionesSimuladas: Record<string, EvaluacionRespuesta[]> = {
  "quiz-1": [
    { tipo: "correcta", puntaje: 9, feedback: "Excelente respuesta. Demostraste una comprensión sólida del rol del sistema financiero como intermediario entre ahorristas e inversores.", sugerencia: undefined },
    { tipo: "parcial", puntaje: 7, feedback: "Buena explicación del concepto. Mencionaste correctamente que las acciones son un ejemplo, aunque podrías haber profundizado en por qué se llama 'variable'.", sugerencia: "Recordá que se llama renta variable porque el rendimiento no está garantizado y depende del desempeño de la empresa." },
    { tipo: "correcta", puntaje: 10, feedback: "Perfecto. Identificaste correctamente a todos los participantes principales: inversores, emisores, intermediarios y reguladores.", sugerencia: undefined },
    { tipo: "parcial", puntaje: 6, feedback: "Entendés la diferencia básica, pero faltó mencionar la importancia de la liquidez que proporciona el mercado secundario.", sugerencia: "El mercado secundario es clave porque permite a los inversores vender sus títulos antes del vencimiento, dando liquidez al sistema." },
    { tipo: "correcta", puntaje: 8, feedback: "Muy bien. Explicaste correctamente la importancia de la regulación y mencionaste a la CNV.", sugerencia: undefined },
  ],
  "quiz-2": [
    { tipo: "correcta", puntaje: 9, feedback: "Muy buena respuesta. Explicaste claramente qué es una acción y los derechos que otorga.", sugerencia: undefined },
    { tipo: "parcial", puntaje: 7, feedback: "Descripción correcta pero básica. Podrías haber mencionado algunos ratios específicos del análisis fundamental.", sugerencia: "El análisis fundamental incluye ratios como P/E, ROE, margen de ganancia, nivel de endeudamiento, entre otros." },
    { tipo: "correcta", puntaje: 8, feedback: "Correcto. Entendés qué es el Merval y su función como referencia del mercado argentino.", sugerencia: undefined },
    { tipo: "incorrecta", puntaje: 3, feedback: "La interpretación no es del todo correcta. Un P/E alto no siempre significa que la acción está cara.", sugerencia: "Un P/E alto puede indicar expectativas de crecimiento futuro, mientras que uno bajo puede indicar que el mercado espera problemas o que la acción está subvaluada." },
    { tipo: "correcta", puntaje: 9, feedback: "Excelente. Explicaste bien qué son los dividendos y las razones por las que una empresa podría reinvertir.", sugerencia: undefined },
    { tipo: "parcial", puntaje: 6, feedback: "Mencionaste la OPA pero faltó explicar el mecanismo completo y las condiciones regulatorias.", sugerencia: "Una OPA debe ofrecer el mismo precio a todos los accionistas y generalmente requiere aprobación regulatoria." },
  ],
  "quiz-3": [
    { tipo: "correcta", puntaje: 9, feedback: "Muy bien. Identificaste correctamente los componentes de un bono: valor nominal, cupón, plazo y emisor.", sugerencia: undefined },
    { tipo: "correcta", puntaje: 10, feedback: "Excelente explicación de la relación inversa entre precio y tasas de interés.", sugerencia: undefined },
    { tipo: "parcial", puntaje: 7, feedback: "Buena definición de duration, aunque podrías haber sido más específico sobre su utilidad práctica.", sugerencia: "La duration permite comparar la sensibilidad de diferentes bonos y gestionar el riesgo de tasa de interés en un portfolio." },
    { tipo: "correcta", puntaje: 8, feedback: "Correcto. Diste un buen ejemplo de uso de derivados para cobertura.", sugerencia: undefined },
    { tipo: "parcial", puntaje: 6, feedback: "Entendés la diferencia básica pero la explicación podría ser más clara.", sugerencia: "La clave es: en futuros ambas partes están obligadas; en opciones, solo el vendedor está obligado si el comprador decide ejercer." },
    { tipo: "correcta", puntaje: 9, feedback: "Muy bien explicado el concepto de opción call y cuándo conviene ejercerla.", sugerencia: undefined },
    { tipo: "parcial", puntaje: 7, feedback: "Mencionaste el riesgo de crédito correctamente, aunque faltó hablar de las calificadoras de riesgo.", sugerencia: "Las calificadoras como Moody's, S&P y Fitch asignan ratings que ayudan a evaluar el riesgo crediticio de un emisor." },
  ],
}

export function QuizModal({ quiz, open, onClose, onComplete }: QuizModalProps) {
  const [state, setState] = useState<QuizState>("intro")
  const [mensajes, setMensajes] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [respuestas, setRespuestas] = useState<{ preguntaId: string; respuesta: string; evaluacion: EvaluacionRespuesta }[]>([])
  const [tiempoInicio, setTiempoInicio] = useState<number | null>(null)
  const [isAgentTyping, setIsAgentTyping] = useState(false)
  const [notaAcumulada, setNotaAcumulada] = useState(0)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const totalPreguntas = quiz.preguntas.length
  const puedeIntentar = quiz.intentosRealizados < quiz.intentosPermitidos

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [mensajes, isAgentTyping])

  // Focus en input cuando el agente termina de escribir
  useEffect(() => {
    if (!isAgentTyping && state === "chat" && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isAgentTyping, state])

  const agregarMensajeAgente = (contenido: string, preguntaId?: string, evaluacion?: EvaluacionRespuesta) => {
    return new Promise<void>((resolve) => {
      setIsAgentTyping(true)
      
      // Simular delay de escritura (más largo para evaluaciones)
      const delay = evaluacion ? 1500 + Math.random() * 500 : 800 + Math.random() * 400
      
      setTimeout(() => {
        setMensajes((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            tipo: "agente",
            contenido,
            preguntaId,
            timestamp: new Date(),
            evaluacion,
          },
        ])
        setIsAgentTyping(false)
        resolve()
      }, delay)
    })
  }

  const handleIniciarChat = () => {
    setTiempoInicio(Date.now())
    setMensajes([])
    setRespuestas([])
    setCurrentQuestionIndex(0)
    setNotaAcumulada(0)
    setState("chat")

    // Mensaje de bienvenida
    setTimeout(() => {
      setMensajes([
        {
          id: "welcome",
          tipo: "agente",
          contenido: `Hola, soy tu asistente de evaluación para este cuestionario. Voy a hacerte ${totalPreguntas} preguntas y evaluaré cada una de tus respuestas en tiempo real, dándote feedback inmediato sobre tu comprensión del tema. Responde con tus propias palabras, cuanto más completa sea tu respuesta, mejor podré evaluar tu conocimiento.`,
          timestamp: new Date(),
        },
      ])
      
      // Primera pregunta después del mensaje de bienvenida
      setTimeout(async () => {
        await agregarMensajeAgente(
          `Comencemos con la primera pregunta:\n\n${quiz.preguntas[0].pregunta}`,
          quiz.preguntas[0].id
        )
      }, 1200)
    }, 500)
  }

  const obtenerEvaluacion = (quizId: string, preguntaIndex: number): EvaluacionRespuesta => {
    const evaluaciones = evaluacionesSimuladas[quizId]
    if (evaluaciones && evaluaciones[preguntaIndex]) {
      return evaluaciones[preguntaIndex]
    }
    // Evaluación por defecto aleatoria
    const tipos: Array<"correcta" | "parcial" | "incorrecta"> = ["correcta", "parcial", "incorrecta"]
    const tipo = tipos[Math.floor(Math.random() * tipos.length)]
    const puntaje = tipo === "correcta" ? 8 + Math.floor(Math.random() * 3) : 
                   tipo === "parcial" ? 5 + Math.floor(Math.random() * 3) : 
                   Math.floor(Math.random() * 4)
    return {
      tipo,
      puntaje,
      feedback: tipo === "correcta" ? "Muy buena respuesta. Demostraste comprensión del tema." :
               tipo === "parcial" ? "Tu respuesta es parcialmente correcta. Hay algunos aspectos que podrías profundizar." :
               "Tu respuesta no aborda correctamente el tema. Te sugiero revisar el material.",
      sugerencia: tipo !== "correcta" ? "Te recomiendo repasar este tema en el módulo correspondiente." : undefined,
    }
  }

  const handleEnviarRespuesta = async () => {
    if (!inputValue.trim() || isAgentTyping) return

    const preguntaActual = quiz.preguntas[currentQuestionIndex]
    const respuestaUsuario = inputValue.trim()
    
    // Agregar mensaje del usuario
    setMensajes((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        tipo: "usuario",
        contenido: respuestaUsuario,
        preguntaId: preguntaActual.id,
        timestamp: new Date(),
      },
    ])

    setInputValue("")

    // Simular evaluación del agente
    const evaluacion = obtenerEvaluacion(quiz.id, currentQuestionIndex)
    
    // Actualizar nota acumulada
    const nuevaNota = notaAcumulada + evaluacion.puntaje
    setNotaAcumulada(nuevaNota)

    // Guardar respuesta con evaluación
    const nuevaRespuesta = { 
      preguntaId: preguntaActual.id, 
      respuesta: respuestaUsuario,
      evaluacion 
    }
    setRespuestas((prev) => [...prev, nuevaRespuesta])

    // Construir mensaje de feedback
    let feedbackMensaje = ""
    if (evaluacion.tipo === "correcta") {
      feedbackMensaje = `${evaluacion.feedback}`
    } else if (evaluacion.tipo === "parcial") {
      feedbackMensaje = `${evaluacion.feedback}${evaluacion.sugerencia ? `\n\n${evaluacion.sugerencia}` : ""}`
    } else {
      feedbackMensaje = `${evaluacion.feedback}${evaluacion.sugerencia ? `\n\n${evaluacion.sugerencia}` : ""}`
    }

    // Mostrar evaluación
    await agregarMensajeAgente(feedbackMensaje, undefined, evaluacion)

    // Verificar si hay más preguntas
    const nextIndex = currentQuestionIndex + 1

    if (nextIndex < totalPreguntas) {
      // Siguiente pregunta
      setTimeout(async () => {
        setCurrentQuestionIndex(nextIndex)
        await agregarMensajeAgente(
          `Pregunta ${nextIndex + 1} de ${totalPreguntas}:\n\n${quiz.preguntas[nextIndex].pregunta}`,
          quiz.preguntas[nextIndex].id
        )
      }, 1000)
    } else {
      // Calcular nota final
      const notaFinal = Math.round((nuevaNota / totalPreguntas) * 10) / 10
      const aprobado = notaFinal >= quiz.notaAprobacion / 10
      
      // Mensaje de cierre
      setTimeout(async () => {
        const mensajeFinal = aprobado
          ? `Has completado la evaluación con una nota de ${notaFinal}/10. Felicitaciones, has aprobado! Tu comprensión de los temas es ${notaFinal >= 8 ? "excelente" : "buena"}.`
          : `Has completado la evaluación con una nota de ${notaFinal}/10. No alcanzaste la nota mínima de aprobación (${quiz.notaAprobacion / 10}/10). Te recomiendo repasar los temas y volver a intentarlo.`
        
        await agregarMensajeAgente(mensajeFinal)
        
        setTimeout(() => {
          setState("completed")
          
          const tiempoUtilizado = tiempoInicio ? Math.floor((Date.now() - tiempoInicio) / 1000) : 0
          onComplete({
            quizId: quiz.id,
            respuestas: [...respuestas, nuevaRespuesta],
            notaFinal,
            tiempoUtilizado,
          })
        }, 1500)
      }, 1200)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleEnviarRespuesta()
    }
  }

  const handleCerrar = () => {
    setState("intro")
    setMensajes([])
    setRespuestas([])
    setCurrentQuestionIndex(0)
    setInputValue("")
    setNotaAcumulada(0)
    onClose()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getNotaColor = (nota: number) => {
    if (nota >= 8) return "text-[#16A34A]"
    if (nota >= 6) return "text-[#F59E0B]"
    return "text-[#DC2626]"
  }

  const getEvaluacionIcon = (tipo: "correcta" | "parcial" | "incorrecta") => {
    switch (tipo) {
      case "correcta":
        return <ThumbsUp className="h-4 w-4 text-[#16A34A]" />
      case "parcial":
        return <AlertCircle className="h-4 w-4 text-[#F59E0B]" />
      case "incorrecta":
        return <AlertCircle className="h-4 w-4 text-[#DC2626]" />
    }
  }

  const getEvaluacionBadge = (evaluacion: EvaluacionRespuesta) => {
    const colors = {
      correcta: "bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/30",
      parcial: "bg-[#F59E0B]/10 text-[#92400E] border-[#F59E0B]/30",
      incorrecta: "bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/30",
    }
    const labels = {
      correcta: "Correcto",
      parcial: "Parcial",
      incorrecta: "A mejorar",
    }
    return (
      <Badge variant="outline" className={cn("text-xs", colors[evaluacion.tipo])}>
        {getEvaluacionIcon(evaluacion.tipo)}
        <span className="ml-1">{labels[evaluacion.tipo]} ({evaluacion.puntaje}/10)</span>
      </Badge>
    )
  }

  // Intro Screen
  const renderIntro = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#0244eb]/20 to-[#E4002B]/20">
          <Sparkles className="h-8 w-8 text-[#0244eb]" />
        </div>
        <h3 className="text-lg font-semibold text-[#111827]">{quiz.titulo}</h3>
        {quiz.descripcion && <p className="mt-2 text-sm text-[#6B7280]">{quiz.descripcion}</p>}
      </div>

      <div className="rounded-lg border border-[#E5E7EB] bg-[#F7F8FA] p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#6B7280]">Preguntas</span>
          <span className="font-medium text-[#111827]">{totalPreguntas}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#6B7280]">Evaluación</span>
          <Badge variant="outline" className="border-[#0244eb]/30 text-[#0244eb] bg-[#0244eb]/5">
            <Sparkles className="h-3 w-3 mr-1" />
            Con IA en tiempo real
          </Badge>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#6B7280]">Nota para aprobar</span>
          <span className="font-medium text-[#111827]">{quiz.notaAprobacion / 10}/10</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#6B7280]">Intentos</span>
          <span className="font-medium text-[#111827]">
            {quiz.intentosRealizados} / {quiz.intentosPermitidos}
          </span>
        </div>
        {quiz.mejorNota !== undefined && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#6B7280]">Mejor nota</span>
            <span className={cn("font-medium", getNotaColor(quiz.mejorNota))}>{quiz.mejorNota}/10</span>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-[#0244eb]/20 bg-[#0244eb]/5 p-4">
        <div className="flex gap-3">
          <Bot className="h-5 w-5 text-[#0244eb] shrink-0 mt-0.5" />
          <p className="text-sm text-[#0244eb]">
            Un asistente inteligente te hará preguntas y evaluará tus respuestas en tiempo real. 
            Recibirás feedback inmediato sobre cada respuesta, incluyendo sugerencias para mejorar.
          </p>
        </div>
      </div>

      {quiz.modulosVinculados.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-[#111827]">Temas evaluados:</p>
          <div className="flex flex-wrap gap-2">
            {quiz.modulosVinculados.map((modulo) => (
              <Badge key={modulo} variant="outline" className="border-[#E5E7EB] text-[#4B5563] bg-transparent">
                <BookOpen className="mr-1 h-3 w-3" />
                {modulo}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {!puedeIntentar && (
        <div className="rounded-lg border border-[#F59E0B]/30 bg-[#F59E0B]/10 p-4 flex items-start gap-3">
          <Clock className="h-5 w-5 text-[#F59E0B] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-[#92400E]">Has agotado los intentos disponibles</p>
            <p className="text-xs text-[#A16207] mt-1">Contacta a tu profesor si necesitas un intento adicional.</p>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={handleCerrar} className="flex-1 bg-transparent border-[#E5E7EB] text-[#4B5563] hover:bg-[#F7F8FA]">
          Cancelar
        </Button>
        <Button
          onClick={handleIniciarChat}
          disabled={!puedeIntentar}
          className="flex-1 bg-[#0244eb] hover:bg-[#0238c7] transition-colors"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Comenzar evaluación
        </Button>
      </div>
    </div>
  )

  // Chat Screen
  const renderChat = () => {
    const notaActual = respuestas.length > 0 
      ? Math.round((notaAcumulada / respuestas.length) * 10) / 10 
      : 0
    
    return (
      <div className="flex flex-col h-[520px]">
        {/* Header con progreso */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0244eb]/20 to-[#E4002B]/20">
              <Sparkles className="h-4 w-4 text-[#0244eb]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#111827]">Asistente de evaluación</p>
              <p className="text-xs text-[#6B7280]">
                Pregunta {Math.min(currentQuestionIndex + 1, totalPreguntas)} de {totalPreguntas}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {respuestas.length > 0 && (
              <Badge variant="outline" className={cn("border-[#E5E7EB]", getNotaColor(notaActual))}>
                Nota: {notaActual}/10
              </Badge>
            )}
            <Badge variant="outline" className="border-[#E5E7EB] text-[#4B5563] bg-transparent">
              {respuestas.length}/{totalPreguntas}
            </Badge>
          </div>
        </div>

        {/* Chat messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto py-4 space-y-4"
        >
          {mensajes.map((mensaje) => (
            <div
              key={mensaje.id}
              className={cn(
                "flex gap-3",
                mensaje.tipo === "usuario" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className={cn(
                  mensaje.tipo === "agente" 
                    ? "bg-gradient-to-br from-[#0244eb]/20 to-[#E4002B]/20 text-[#0244eb]" 
                    : "bg-[#E4002B]/10 text-[#E4002B]"
                )}>
                  {mensaje.tipo === "agente" ? <Sparkles className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div className={cn("max-w-[80%] space-y-2")}>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-3",
                    mensaje.tipo === "agente"
                      ? "bg-[#F7F8FA] text-[#111827] rounded-tl-md"
                      : "bg-[#0244eb] text-white rounded-tr-md"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{mensaje.contenido}</p>
                </div>
                {mensaje.evaluacion && (
                  <div className="flex items-center gap-2">
                    {getEvaluacionBadge(mensaje.evaluacion)}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isAgentTyping && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-[#0244eb]/20 to-[#E4002B]/20 text-[#0244eb]">
                  <Sparkles className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-[#F7F8FA] rounded-2xl rounded-tl-md px-4 py-3">
                <div className="flex gap-1 items-center">
                  <span className="text-xs text-[#6B7280] mr-2">Analizando</span>
                  <span className="w-2 h-2 bg-[#0244eb] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-[#0244eb] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-[#0244eb] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        {state === "chat" && !isAgentTyping && currentQuestionIndex < totalPreguntas && (
          <div className="pt-4 border-t border-[#E5E7EB]">
            <div className="flex gap-2">
              <Textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu respuesta con tus propias palabras..."
                className="min-h-[80px] resize-none border-[#E5E7EB] focus:border-[#0244eb] focus:ring-[#0244eb]"
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-[#6B7280]">
                Enter para enviar | Shift+Enter para nueva línea
              </p>
              <Button
                onClick={handleEnviarRespuesta}
                disabled={!inputValue.trim()}
                size="sm"
                className="bg-[#0244eb] hover:bg-[#00338D] transition-colors"
              >
                <Send className="h-4 w-4 mr-1" />
                Enviar respuesta
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Completed Screen
  const renderCompleted = () => {
    const notaFinal = respuestas.length > 0 
      ? Math.round((notaAcumulada / respuestas.length) * 10) / 10 
      : 0
    const aprobado = notaFinal >= quiz.notaAprobacion / 10
    const correctas = respuestas.filter(r => r.evaluacion.tipo === "correcta").length
    const parciales = respuestas.filter(r => r.evaluacion.tipo === "parcial").length
    const incorrectas = respuestas.filter(r => r.evaluacion.tipo === "incorrecta").length

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className={cn(
            "mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full",
            aprobado ? "bg-[#16A34A]/10" : "bg-[#F59E0B]/10"
          )}>
            {aprobado ? (
              <CheckCircle className="h-10 w-10 text-[#16A34A]" />
            ) : (
              <AlertCircle className="h-10 w-10 text-[#F59E0B]" />
            )}
          </div>
          <h3 className={cn("text-xl font-semibold", aprobado ? "text-[#16A34A]" : "text-[#F59E0B]")}>
            {aprobado ? "Aprobado" : "No aprobado"}
          </h3>
          <p className="mt-2 text-sm text-[#6B7280]">
            {aprobado 
              ? "Felicitaciones, demostraste un buen dominio de los temas." 
              : "Te recomendamos repasar los temas y volver a intentarlo."}
          </p>
        </div>

        <div className="rounded-lg border border-[#E5E7EB] bg-[#F7F8FA] p-6 space-y-4">
          <div className="text-center">
            <p className={cn("text-4xl font-bold", getNotaColor(notaFinal))}>{notaFinal}</p>
            <p className="text-sm text-[#6B7280] mt-1">Nota final (sobre 10)</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E5E7EB]">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <ThumbsUp className="h-4 w-4 text-[#16A34A]" />
                <span className="text-lg font-semibold text-[#16A34A]">{correctas}</span>
              </div>
              <p className="text-xs text-[#6B7280]">Correctas</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <AlertCircle className="h-4 w-4 text-[#F59E0B]" />
                <span className="text-lg font-semibold text-[#92400E]">{parciales}</span>
              </div>
              <p className="text-xs text-[#6B7280]">Parciales</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <AlertCircle className="h-4 w-4 text-[#DC2626]" />
                <span className="text-lg font-semibold text-[#DC2626]">{incorrectas}</span>
              </div>
              <p className="text-xs text-[#6B7280]">A mejorar</p>
            </div>
          </div>
          
          {tiempoInicio && (
            <div className="text-center pt-4 border-t border-[#E5E7EB]">
              <p className="text-sm text-[#6B7280]">
                Tiempo utilizado: {formatTime(Math.floor((Date.now() - tiempoInicio) / 1000))}
              </p>
            </div>
          )}
        </div>

        {!aprobado && (
          <div className="rounded-lg border border-[#0244eb]/20 bg-[#0244eb]/5 p-4">
            <p className="text-sm text-[#0244eb]">
              Revisa el feedback de cada pregunta para entender qué aspectos necesitas reforzar antes de tu próximo intento.
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setState("intro")
              setMensajes([])
              setRespuestas([])
              setCurrentQuestionIndex(0)
              setNotaAcumulada(0)
            }}
            className="flex-1 bg-transparent border-[#E5E7EB] text-[#4B5563] hover:bg-[#F7F8FA]"
            disabled={quiz.intentosRealizados + 1 >= quiz.intentosPermitidos}
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Intentar de nuevo
          </Button>
          <Button
            onClick={handleCerrar}
            className="flex-1 bg-[#0244eb] hover:bg-[#00338D] transition-colors"
          >
            Cerrar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleCerrar()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-[#111827]">
            {state === "intro" && "Evaluación con IA"}
            {state === "chat" && quiz.titulo}
            {state === "completed" && "Resultado de la evaluación"}
          </DialogTitle>
        </DialogHeader>
        
        {state === "intro" && renderIntro()}
        {state === "chat" && renderChat()}
        {state === "completed" && renderCompleted()}
      </DialogContent>
    </Dialog>
  )
}
