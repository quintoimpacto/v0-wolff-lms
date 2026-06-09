"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar, Clock, MapPin, Users, Download, ArrowLeft, BookOpen } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Course data mapped by ID with cover images matching the home page
const allCourses: Record<string, {
  id: string
  type: string
  title: string
  modality: string
  startDate: string
  endDate: string
  schedule: string
  scheduleTime: string
  totalClasses: number
  totalHours: number
  coverUrl: string
  coverAlt: string
  theme: "realestate" | "marketing" | "legal" | "finance" | "management" | "general"
  description: string
  modules: { title: string; content: string }[]
  teachers: { name: string; role: string; bio: string; avatar: string }[]
  spotsAvailable: boolean
}> = {
  "intro-corretaje": {
    id: "intro-corretaje",
    type: "CURSO",
    title: "Introducción al Corretaje Inmobiliario",
    modality: "Virtual sincrónico",
    startDate: "15 de Enero 2026",
    endDate: "28 de Febrero 2026",
    schedule: "Martes y Jueves",
    scheduleTime: "18:00 - 21:00",
    totalClasses: 4,
    totalHours: 12,
    coverUrl: "/covers/introduccion-corretaje.png",
    coverAlt: "Agente inmobiliario profesional estrechando manos",
    theme: "realestate",
    description: `Este curso brinda una introducción integral al corretaje inmobiliario profesional. Los participantes adquirirán conocimientos fundamentales sobre el mercado inmobiliario, técnicas de captación y venta de propiedades, y el marco legal vigente.

Se abordarán temas como la clasificación de propiedades, técnicas de tasación básica, estrategias de marketing inmobiliario, negociación con clientes y los aspectos legales de las operaciones de compraventa y alquiler.`,
    modules: [
      { title: "Módulo 1: Introducción al mercado inmobiliario", content: "Conceptos fundamentales del mercado inmobiliario, actores principales, ciclos del mercado y análisis de tendencias actuales." },
      { title: "Módulo 2: Marco legal del corretaje", content: "Leyes y regulaciones vigentes, responsabilidades del corredor, contratos y documentación legal necesaria." },
      { title: "Módulo 3: Técnicas de captación", content: "Estrategias para captar propiedades y clientes, networking efectivo, y construcción de cartera." },
      { title: "Módulo 4: Tasación y valuación", content: "Métodos de tasación, factores que afectan el valor de una propiedad, y herramientas de valuación." },
    ],
    teachers: [{ name: "Martín Rodríguez", role: "Director Académico", bio: "Broker inmobiliario con 20 años de experiencia.", avatar: "/docente-martin-rodriguez.jpg" }],
    spotsAvailable: true,
  },
  "tasacion-propiedades": {
    id: "tasacion-propiedades",
    type: "CURSO",
    title: "Tasación y Validación de Propiedades",
    modality: "Presencial",
    startDate: "18 de Enero 2026",
    endDate: "15 de Marzo 2026",
    schedule: "Lunes y Miércoles",
    scheduleTime: "19:00 - 22:00",
    totalClasses: 6,
    totalHours: 18,
    coverUrl: "/covers/tasacion-validacion.png",
    coverAlt: "Asesor mostrando documentos a pareja",
    theme: "finance",
    description: `Curso especializado en técnicas de tasación y validación de propiedades inmobiliarias. Aprenderás métodos comparativos, de capitalización de rentas y de costo de reposición.

Se incluyen prácticas de campo, análisis de mercado local y herramientas digitales para la valuación profesional.`,
    modules: [
      { title: "Módulo 1: Fundamentos de tasación", content: "Conceptos básicos de valuación, marco normativo y ética profesional del tasador." },
      { title: "Módulo 2: Métodos comparativos", content: "Análisis de mercado, selección de comparables, ajustes y determinación de valor." },
      { title: "Módulo 3: Capitalización de rentas", content: "Valuación por ingresos, tasas de capitalización y análisis de rentabilidad." },
      { title: "Módulo 4: Costo de reposición", content: "Valuación por costos, depreciación, obsolescencia y valor residual del terreno." },
      { title: "Módulo 5: Herramientas digitales", content: "Software de tasación, bases de datos y plataformas de análisis de mercado." },
      { title: "Módulo 6: Práctica de campo", content: "Inspecciones, relevamientos y elaboración de informes de tasación profesionales." },
    ],
    teachers: [{ name: "Martín Rodríguez", role: "Tasador Certificado", bio: "Perito tasador con 15 años de experiencia en el mercado inmobiliario.", avatar: "/docente-martin-rodriguez.jpg" }],
    spotsAvailable: true,
  },
  "aspectos-legales": {
    id: "aspectos-legales",
    type: "CURSO",
    title: "Aspectos Legales",
    modality: "Híbrido",
    startDate: "22 de Enero 2026",
    endDate: "12 de Febrero 2026",
    schedule: "Viernes",
    scheduleTime: "17:00 - 20:00",
    totalClasses: 3,
    totalHours: 9,
    coverUrl: "/covers/aspectos-legales.png",
    coverAlt: "Persona firmando documentos legales",
    theme: "legal",
    description: `Curso enfocado en el marco legal del corretaje inmobiliario. Se abordan contratos, regulaciones, derechos y obligaciones de las partes involucradas en operaciones inmobiliarias.

Incluye análisis de jurisprudencia relevante y casos prácticos para la resolución de conflictos.`,
    modules: [
      { title: "Módulo 1: Marco legal del corretaje", content: "Ley de corretaje inmobiliario, requisitos de matriculación y responsabilidades del corredor." },
      { title: "Módulo 2: Contratos inmobiliarios", content: "Tipos de contratos, cláusulas esenciales, boleto de compraventa y escrituración." },
      { title: "Módulo 3: Resolución de conflictos", content: "Mediación, arbitraje y jurisprudencia relevante en operaciones inmobiliarias." },
    ],
    teachers: [{ name: "Martín Rodríguez", role: "Asesor Legal", bio: "Abogado especialista en derecho inmobiliario.", avatar: "/docente-martin-rodriguez.jpg" }],
    spotsAvailable: true,
  },
  "marketing-inmobiliario": {
    id: "marketing-inmobiliario",
    type: "CURSO",
    title: "Marketing Digital para Inmobiliarias",
    modality: "Virtual sincrónico",
    startDate: "01 de Febrero 2026",
    endDate: "28 de Marzo 2026",
    schedule: "Lunes y Miércoles",
    scheduleTime: "18:00 - 21:00",
    totalClasses: 8,
    totalHours: 24,
    coverUrl: "/covers/marketing-inmobiliario.jpg",
    coverAlt: "Laptop con analytics de redes sociales en escritorio minimalista",
    theme: "marketing",
    description: `Domina las estrategias de marketing digital aplicadas al sector inmobiliario. Desde redes sociales hasta campañas de email marketing y posicionamiento SEO.

Aprenderás a crear contenido atractivo, gestionar campañas publicitarias y medir resultados para maximizar la captación de clientes.`,
    modules: [
      { title: "Módulo 1: Estrategia digital", content: "Planificación de marketing digital, definición de público objetivo y buyer persona." },
      { title: "Módulo 2: Redes sociales", content: "Gestión de Instagram, Facebook y LinkedIn para inmobiliarias." },
      { title: "Módulo 3: Publicidad online", content: "Google Ads, Meta Ads y estrategias de remarketing inmobiliario." },
      { title: "Módulo 4: Contenido y SEO", content: "Creación de contenido, posicionamiento web y email marketing." },
    ],
    teachers: [{ name: "Martín Rodríguez", role: "Especialista en Marketing Digital", bio: "Consultor de marketing digital para el sector inmobiliario.", avatar: "/docente-martin-rodriguez.jpg" }],
    spotsAvailable: true,
  },
  "negociacion-ventas": {
    id: "negociacion-ventas",
    type: "CURSO",
    title: "Técnicas de Negociación y Ventas",
    modality: "Presencial",
    startDate: "05 de Febrero 2026",
    endDate: "12 de Marzo 2026",
    schedule: "Jueves",
    scheduleTime: "18:00 - 21:00",
    totalClasses: 5,
    totalHours: 15,
    coverUrl: "/covers/negociacion-ventas.jpg",
    coverAlt: "Profesionales estrechando manos en oficina moderna",
    theme: "management",
    description: `Curso práctico sobre técnicas avanzadas de negociación y cierre de ventas en el sector inmobiliario. Incluye role-playing, análisis de casos reales y desarrollo de habilidades comunicacionales.`,
    modules: [
      { title: "Módulo 1: Psicología del comprador", content: "Perfil del comprador, motivaciones de compra y proceso de decisión." },
      { title: "Módulo 2: Técnicas de negociación", content: "Método Harvard, BATNA, y estrategias de negociación ganar-ganar." },
      { title: "Módulo 3: Manejo de objeciones", content: "Identificación de objeciones comunes y técnicas de respuesta efectiva." },
      { title: "Módulo 4: Cierre de ventas", content: "Técnicas de cierre, seguimiento post-venta y fidelización de clientes." },
    ],
    teachers: [{ name: "Martín Rodríguez", role: "Coach Comercial", bio: "Especialista en ventas y negociación con experiencia en el mercado inmobiliario.", avatar: "/docente-martin-rodriguez.jpg" }],
    spotsAvailable: true,
  },
  "administracion-consorcios": {
    id: "administracion-consorcios",
    type: "CURSO",
    title: "Administración de Consorcios y Propiedades",
    modality: "Virtual sincrónico",
    startDate: "10 de Febrero 2026",
    endDate: "30 de Abril 2026",
    schedule: "Martes y Jueves",
    scheduleTime: "19:00 - 21:00",
    totalClasses: 10,
    totalHours: 30,
    coverUrl: "/covers/administracion-consorcios.jpg",
    coverAlt: "Edificio moderno con lineas arquitectonicas limpias",
    theme: "management",
    description: `Formación completa en administración de consorcios y propiedades horizontales. Cubre aspectos legales, contables, técnicos y de gestión de conflictos.`,
    modules: [
      { title: "Módulo 1: Marco legal", content: "Ley de propiedad horizontal, reglamento de copropiedad y asambleas." },
      { title: "Módulo 2: Gestión contable", content: "Expensas, presupuestos, balances y rendición de cuentas." },
      { title: "Módulo 3: Mantenimiento edilicio", content: "Planes de mantenimiento, proveedores y gestión de emergencias." },
      { title: "Módulo 4: Gestión de conflictos", content: "Mediación vecinal, comunicación efectiva y resolución de disputas." },
    ],
    teachers: [{ name: "Martín Rodríguez", role: "Administrador de Consorcios", bio: "Administrador certificado con amplia experiencia en gestión de edificios.", avatar: "/docente-martin-rodriguez.jpg" }],
    spotsAvailable: true,
  },
  "diplomatura-agente-inmobiliario": {
    id: "diplomatura-agente-inmobiliario",
    type: "PROGRAMA INTEGRAL",
    title: "Diplomatura en Corretaje Inmobiliario",
    modality: "Híbrido",
    startDate: "15 de Febrero 2026",
    endDate: "15 de Agosto 2026",
    schedule: "Lunes, Miércoles y Viernes",
    scheduleTime: "18:00 - 21:00",
    totalClasses: 20,
    totalHours: 60,
    coverUrl: "/covers/diplomatura-corretaje.jpg",
    coverAlt: "Birrete y diploma sobre escritorio iluminado por luz natural",
    theme: "realestate",
    description: `Programa integral de formación en corretaje inmobiliario. Cubre todos los aspectos del negocio: legal, comercial, técnico y de gestión. Al finalizar se otorga certificado de diplomatura.`,
    modules: [
      { title: "Módulo 1: Fundamentos del negocio", content: "Introducción al mercado, tipos de propiedades y análisis de mercado." },
      { title: "Módulo 2: Marco legal completo", content: "Legislación, contratos, escrituración y aspectos impositivos." },
      { title: "Módulo 3: Tasación profesional", content: "Métodos de valuación, informes periciales y herramientas digitales." },
      { title: "Módulo 4: Marketing y ventas", content: "Estrategias comerciales, marketing digital y técnicas de cierre." },
      { title: "Módulo 5: Gestión de oficina", content: "Administración de la inmobiliaria, sistemas CRM y gestión de equipo." },
      { title: "Módulo 6: Práctica profesional", content: "Casos reales, visitas a campo y proyecto final integrador." },
    ],
    teachers: [{ name: "Martín Rodríguez", role: "Director Académico", bio: "Broker inmobiliario con 20 años de experiencia.", avatar: "/docente-martin-rodriguez.jpg" }],
    spotsAvailable: true,
  },
  "programa-broker-profesional": {
    id: "programa-broker-profesional",
    type: "PROGRAMA INTEGRAL",
    title: "Programa Broker Inmobiliario Profesional",
    modality: "Presencial",
    startDate: "01 de Marzo 2026",
    endDate: "01 de Julio 2026",
    schedule: "Sábados",
    scheduleTime: "09:00 - 13:00",
    totalClasses: 16,
    totalHours: 48,
    coverUrl: "/covers/broker-profesional.jpg",
    coverAlt: "Ejecutivo profesional en lobby de oficina moderna",
    theme: "realestate",
    description: `Programa ejecutivo para quienes buscan liderar equipos y oficinas inmobiliarias. Enfoque en liderazgo, gestión empresarial y desarrollo de negocios.`,
    modules: [
      { title: "Módulo 1: Liderazgo inmobiliario", content: "Estilos de liderazgo, motivación de equipos y cultura organizacional." },
      { title: "Módulo 2: Gestión empresarial", content: "Plan de negocios, métricas de rendimiento y escalabilidad." },
      { title: "Módulo 3: Desarrollo comercial", content: "Estrategias de crecimiento, alianzas y franquicias." },
      { title: "Módulo 4: Innovación y tecnología", content: "PropTech, herramientas digitales y transformación del negocio." },
    ],
    teachers: [{ name: "Martín Rodríguez", role: "Broker Senior", bio: "Director de oficina RE/MAX con amplia trayectoria.", avatar: "/docente-martin-rodriguez.jpg" }],
    spotsAvailable: true,
  },
  "workshop-fotografia": {
    id: "workshop-fotografia",
    type: "TALLER",
    title: "Workshop: Fotografía Inmobiliaria Profesional",
    modality: "Virtual sincrónico",
    startDate: "20 de Enero 2026",
    endDate: "20 de Enero 2026",
    schedule: "Sábado",
    scheduleTime: "10:00 - 13:00",
    totalClasses: 1,
    totalHours: 3,
    coverUrl: "/covers/fotografia-inmobiliaria.jpg",
    coverAlt: "Camara profesional en tripode frente a interior luminoso",
    theme: "marketing",
    description: `Taller intensivo de fotografía inmobiliaria. Aprenderás técnicas de composición, iluminación y edición para crear imágenes profesionales que vendan propiedades.`,
    modules: [
      { title: "Bloque 1: Técnicas fotográficas", content: "Composición, iluminación natural y artificial, y equipamiento recomendado." },
      { title: "Bloque 2: Edición y postproducción", content: "Retoque digital, corrección de perspectiva y presentación final." },
    ],
    teachers: [{ name: "Martín Rodríguez", role: "Fotógrafo Profesional", bio: "Fotógrafo especializado en arquitectura e interiorismo.", avatar: "/docente-martin-rodriguez.jpg" }],
    spotsAvailable: true,
  },
  "webinar-tendencias-2026": {
    id: "webinar-tendencias-2026",
    type: "WEBINAR",
    title: "Webinar: Tendencias del Mercado Inmobiliario 2026",
    modality: "Virtual sincrónico",
    startDate: "25 de Enero 2026",
    endDate: "25 de Enero 2026",
    schedule: "Sábado",
    scheduleTime: "11:00 - 13:00",
    totalClasses: 1,
    totalHours: 2,
    coverUrl: "/covers/tendencias-2026.jpg",
    coverAlt: "Tablet con graficos de tendencias frente a skyline urbano",
    theme: "realestate",
    description: `Análisis de las principales tendencias del mercado inmobiliario para 2026. Datos de mercado, proyecciones y oportunidades de inversión.`,
    modules: [
      { title: "Bloque 1: Panorama del mercado", content: "Estado actual del mercado, indicadores clave y análisis comparativo." },
      { title: "Bloque 2: Tendencias y oportunidades", content: "Proyecciones 2026, nichos emergentes y estrategias de posicionamiento." },
    ],
    teachers: [{ name: "Martín Rodríguez", role: "Analista de Mercado", bio: "Analista inmobiliario con experiencia en investigación de mercado.", avatar: "/docente-martin-rodriguez.jpg" }],
    spotsAvailable: true,
  },
  "taller-crm": {
    id: "taller-crm",
    type: "TALLER",
    title: "Taller de CRM para Agentes Inmobiliarios",
    modality: "Presencial",
    startDate: "28 de Enero 2026",
    endDate: "04 de Febrero 2026",
    schedule: "Miércoles",
    scheduleTime: "18:00 - 20:00",
    totalClasses: 2,
    totalHours: 4,
    coverUrl: "/covers/crm-inmobiliario.jpg",
    coverAlt: "Laptop con dashboard CRM en escritorio minimalista",
    theme: "marketing",
    description: `Taller práctico para aprender a implementar y usar un CRM inmobiliario. Gestión de contactos, seguimiento de oportunidades y automatización de procesos.`,
    modules: [
      { title: "Sesión 1: Implementación del CRM", content: "Selección de herramienta, configuración inicial y carga de datos." },
      { title: "Sesión 2: Automatización y reportes", content: "Flujos automáticos, seguimiento de leads y métricas de rendimiento." },
    ],
    teachers: [{ name: "Martín Rodríguez", role: "Consultor Tecnológico", bio: "Especialista en soluciones tecnológicas para el sector inmobiliario.", avatar: "/docente-martin-rodriguez.jpg" }],
    spotsAvailable: true,
  },
  "fundamentos-inmobiliarios": {
    id: "fundamentos-inmobiliarios",
    type: "E-LEARNING",
    title: "Fundamentos del Negocio Inmobiliario",
    modality: "E-learning",
    startDate: "Disponible ahora",
    endDate: "Autogestivo",
    schedule: "A tu ritmo",
    scheduleTime: "Sin horario fijo",
    totalClasses: 6,
    totalHours: 12,
    coverUrl: "/covers/fundamentos-inmobiliarios.jpg",
    coverAlt: "Maqueta de casa sobre planos en escritorio luminoso",
    theme: "realestate",
    description: `Curso autogestivo que cubre los fundamentos del negocio inmobiliario. Ideal para quienes se inician en el sector y buscan una base sólida de conocimientos.`,
    modules: [
      { title: "Unidad 1: El mercado inmobiliario", content: "Estructura del mercado, actores y dinámicas de oferta y demanda." },
      { title: "Unidad 2: Tipos de propiedades", content: "Clasificación, características y segmentos de mercado." },
      { title: "Unidad 3: Operaciones inmobiliarias", content: "Compraventa, alquiler, permutas y otras operaciones." },
    ],
    teachers: [{ name: "Martín Rodríguez", role: "Docente", bio: "Profesional inmobiliario con experiencia docente.", avatar: "/docente-martin-rodriguez.jpg" }],
    spotsAvailable: true,
  },
  "proptech-innovacion": {
    id: "proptech-innovacion",
    type: "E-LEARNING",
    title: "PropTech e Innovación Inmobiliaria",
    modality: "E-learning",
    startDate: "Disponible ahora",
    endDate: "Autogestivo",
    schedule: "A tu ritmo",
    scheduleTime: "Sin horario fijo",
    totalClasses: 4,
    totalHours: 8,
    coverUrl: "/covers/proptech-innovacion.jpg",
    coverAlt: "Smartphone con app de hogar inteligente en interior moderno",
    theme: "marketing",
    description: `Explora las últimas innovaciones tecnológicas aplicadas al sector inmobiliario. Desde plataformas digitales hasta inteligencia artificial y realidad virtual.`,
    modules: [
      { title: "Unidad 1: Ecosistema PropTech", content: "Panorama global y local, categorías de soluciones y casos de éxito." },
      { title: "Unidad 2: Herramientas digitales", content: "Plataformas, apps y software para el agente inmobiliario moderno." },
    ],
    teachers: [{ name: "Martín Rodríguez", role: "Consultor PropTech", bio: "Especialista en tecnología aplicada al real estate.", avatar: "/docente-martin-rodriguez.jpg" }],
    spotsAvailable: true,
  },
  "inversiones-inmobiliarias": {
    id: "inversiones-inmobiliarias",
    type: "E-LEARNING",
    title: "Inversiones Inmobiliarias para Principiantes",
    modality: "E-learning",
    startDate: "Disponible ahora",
    endDate: "Autogestivo",
    schedule: "A tu ritmo",
    scheduleTime: "Sin horario fijo",
    totalClasses: 5,
    totalHours: 10,
    coverUrl: "/covers/inversiones-inmobiliarias.jpg",
    coverAlt: "Documentos de inversion con llave sobre escritorio de marmol",
    theme: "finance",
    description: `Curso introductorio sobre inversiones inmobiliarias. Aprenderás a evaluar oportunidades, calcular rentabilidad y construir un portafolio de propiedades.`,
    modules: [
      { title: "Unidad 1: Fundamentos de inversión", content: "Tipos de inversión inmobiliaria, riesgos y rentabilidad esperada." },
      { title: "Unidad 2: Análisis financiero", content: "Cálculo de ROI, flujo de caja y financiamiento." },
      { title: "Unidad 3: Estrategias de inversión", content: "Compra para alquiler, flipping, desarrollo y fondos inmobiliarios." },
    ],
    teachers: [{ name: "Martín Rodríguez", role: "Inversor Inmobiliario", bio: "Inversor con portafolio diversificado en el mercado inmobiliario.", avatar: "/docente-martin-rodriguez.jpg" }],
    spotsAvailable: true,
  },
}

// Default fallback
const defaultCourse = allCourses["intro-corretaje"]

function DownloadProgramModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2 bg-transparent border-hero-bg text-hero-bg hover:bg-transparent hover:text-hero-bg hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
        >
          <Download className="h-4 w-4" />
          Descargar programa
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle className="text-heading">Descargar programa del curso</DialogTitle>
        </DialogHeader>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="download-name" className="text-heading">Nombre completo</Label>
            <Input id="download-name" placeholder="Tu nombre" className="border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="download-email" className="text-heading">Email</Label>
            <Input id="download-email" type="email" placeholder="tu@email.com" className="border-border" />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-hero-bg hover:bg-hero-bg/85 text-hero-foreground font-semibold transition-colors duration-200"
          >
            Descargar PDF
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function SidebarContent({ courseData }: { courseData: typeof defaultCourse }) {
  return (
    <div className="space-y-6">
      {/* Availability Status */}
      {courseData.spotsAvailable ? (
        <div className="text-center pb-6 border-b border-border">
          <Badge className="mb-3 bg-green-50 text-green-700 border-green-200 font-medium">
            Vacantes disponibles
          </Badge>
          <h3 className="text-xl font-bold text-heading">
            ¡Tu lugar está disponible!
          </h3>
        </div>
      ) : (
        <div className="text-center pb-6 border-b border-border">
          <Badge className="mb-3 bg-amber-50 text-amber-700 border-amber-200 font-medium">
            Sin vacantes
          </Badge>
          <h3 className="text-lg font-bold text-heading">
            Curso completo
          </h3>
        </div>
      )}

      {/* CTA Button */}
      <Button 
        size="lg" 
        className="w-full h-12 bg-hero-bg hover:bg-hero-bg/85 text-hero-foreground font-semibold transition-colors duration-200 rounded-lg"
      >
        {courseData.spotsAvailable ? "Inscribirme ahora" : "Unirme a lista de espera"}
      </Button>

      {/* Technical Info */}
      <div className="space-y-4 pt-2">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Modalidad</p>
            <p className="text-sm font-medium text-heading">{courseData.modality}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Fecha de inicio</p>
            <p className="text-sm font-medium text-heading">{courseData.startDate}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Fecha de fin</p>
            <p className="text-sm font-medium text-heading">{courseData.endDate}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Dias y horarios</p>
            <p className="text-sm font-medium text-heading">{courseData.schedule}</p>
            <p className="text-sm text-muted-foreground">{courseData.scheduleTime}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Users className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Cantidad de clases</p>
            <p className="text-sm font-medium text-heading">{courseData.totalClasses} clases</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <BookOpen className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Carga horaria</p>
            <p className="text-sm font-medium text-heading">{courseData.totalHours} horas totales</p>
          </div>
        </div>
      </div>
    </div>
  )
}

import Image from "next/image"

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const courseData = allCourses[params.id] || defaultCourse

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Course Cover Banner */}
      <div className="relative w-full h-48 md:h-64 lg:h-72 overflow-hidden">
        <Image
          src={courseData.coverUrl}
          alt={courseData.coverAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-6">
          <Badge className="mb-2 bg-white/20 text-white border-0 backdrop-blur-sm font-medium">
            {courseData.type}
          </Badge>
          <h1 className="text-2xl font-bold text-white tracking-tight md:text-3xl lg:text-4xl drop-shadow-lg">
            {courseData.title}
          </h1>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 md:py-10">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-heading transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>

        {/* Mobile Sidebar - Shows at top on mobile */}
        <div className="lg:hidden mb-8">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <SidebarContent courseData={courseData} />
          </div>
        </div>

        {/* Two Column Layout - 12 column grid (8 + 4) */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column - Main Content (8 columns) */}
          <div className="lg:col-span-8 space-y-8">
            {/* About Section */}
            <section>
              <h2 className="mb-4 text-lg font-bold text-heading">Acerca del curso</h2>
              <div className="space-y-4">
                {courseData.description.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-text-secondary leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Program Section with Accordion */}
            <section className="rounded-lg border border-border bg-secondary p-6 md:p-8">
              <h2 className="mb-4 text-lg font-bold text-heading">Programa</h2>
              <Accordion type="single" collapsible className="w-full">
                {courseData.modules.map((module, i) => (
                  <AccordionItem 
                    key={i} 
                    value={`module-${i}`}
                    className="border-b border-border last:border-b-0"
                  >
                    <AccordionTrigger className="py-4 text-heading font-medium hover:no-underline hover:text-hero-bg transition-colors text-left">
                      {module.title}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-text-secondary leading-relaxed">
                      {module.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="mt-6 pt-6 border-t border-border">
                <DownloadProgramModal />
              </div>
            </section>

            {/* Teachers Section */}
            <section>
              <h2 className="mb-6 text-lg font-bold text-heading">Docentes</h2>
              <div className="space-y-4">
                {courseData.teachers.map((teacher, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card shadow-sm"
                  >
                    <Avatar className="h-14 w-14 border-2 border-border">
                      <AvatarImage src={teacher.avatar || "/placeholder.svg"} alt={teacher.name} />
                      <AvatarFallback className="bg-hero-bg text-hero-foreground font-semibold">
                        {teacher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-heading">{teacher.name}</h4>
                      <p className="text-sm text-muted-foreground">{teacher.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sticky Sidebar (4 columns) - Desktop only */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24">
              <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
                <SidebarContent courseData={courseData} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border lg:hidden shadow-lg">
        <Button 
          size="lg" 
          className="w-full h-12 bg-hero-bg hover:bg-hero-bg/85 text-hero-foreground font-semibold transition-colors duration-200 rounded-lg"
        >
          {courseData.spotsAvailable ? "Inscribirme ahora" : "Unirme a lista de espera"}
        </Button>
      </div>
    </div>
  )
}
