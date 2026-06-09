"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Header } from "@/components/header"
import { HorizontalFilters, type AdvancedFilters } from "@/components/horizontal-filters"
import { CourseSection } from "@/components/course-section"
import { Search, SearchX } from "lucide-react"
import Image from "next/image"

interface CourseData {
  id: string
  day: string
  month: string
  title: string
  classes: number
  hours: number
  modality: string
  coverUrl: string
  coverAlt: string
  theme: "realestate" | "marketing" | "legal" | "finance" | "management" | "general"
  startDate?: string
  categories: string[]
  keywords: string[]
}

const coursesData: Record<string, CourseData[]> = {
  proximasActividades: [
    {
      id: "intro-corretaje",
      day: "15",
      month: "Enero",
      title: "Introducción al corretaje inmobiliario",
      classes: 4,
      hours: 12,
      modality: "Virtual sincrónico",
      coverUrl: "/covers/introduccion-corretaje.png",
      coverAlt: "Agente inmobiliario profesional estrechando manos",
      theme: "realestate" as const,
      startDate: "2026-01-15",
      categories: ["Ventas"],
      keywords: ["corretaje", "inmobiliario", "agente", "inicio", "introduccion", "virtual"],
    },
    {
      id: "tasacion-propiedades",
      day: "18",
      month: "Enero",
      title: "Tasación y validación de propiedades",
      classes: 6,
      hours: 18,
      modality: "Presencial",
      coverUrl: "/covers/tasacion-validacion.png",
      coverAlt: "Asesor mostrando documentos a pareja",
      theme: "finance" as const,
      startDate: "2026-01-18",
      categories: ["Tasaciones"],
      keywords: ["tasacion", "valuacion", "propiedades", "presencial", "perito", "valor"],
    },
    {
      id: "aspectos-legales",
      day: "22",
      month: "Enero",
      title: "Aspectos legales",
      classes: 3,
      hours: 9,
      modality: "Híbrido",
      coverUrl: "/covers/aspectos-legales.png",
      coverAlt: "Persona firmando documentos legales",
      theme: "legal" as const,
      startDate: "2026-01-22",
      categories: ["Legal"],
      keywords: ["legal", "ley", "contrato", "normativa", "regulacion", "hibrido", "derecho"],
    },
  ],
  cursos: [
    {
      id: "marketing-inmobiliario",
      day: "01",
      month: "Febrero",
      title: "Marketing Digital para Inmobiliarias",
      classes: 8,
      hours: 24,
      modality: "Virtual sincrónico",
      coverUrl: "/covers/marketing-inmobiliario.jpg",
      coverAlt: "Laptop con analytics de redes sociales en escritorio minimalista",
      theme: "marketing" as const,
      startDate: "2026-02-01",
      categories: ["Marketing", "Tecnología"],
      keywords: ["marketing", "digital", "redes sociales", "publicidad", "online", "instagram", "facebook"],
    },
    {
      id: "negociacion-ventas",
      day: "05",
      month: "Febrero",
      title: "Técnicas de Negociación y Ventas",
      classes: 5,
      hours: 15,
      modality: "Presencial",
      coverUrl: "/covers/negociacion-ventas.jpg",
      coverAlt: "Profesionales estrechando manos en oficina moderna",
      theme: "management" as const,
      startDate: "2026-02-05",
      categories: ["Ventas", "Liderazgo"],
      keywords: ["negociacion", "ventas", "cierre", "comercial", "presencial", "cliente"],
    },
    {
      id: "administracion-consorcios",
      day: "10",
      month: "Febrero",
      title: "Administración de Consorcios y Propiedades",
      classes: 10,
      hours: 30,
      modality: "Virtual sincrónico",
      coverUrl: "/covers/administracion-consorcios.jpg",
      coverAlt: "Edificio moderno con lineas arquitectonicas limpias",
      theme: "management" as const,
      startDate: "2026-02-10",
      categories: ["Liderazgo", "Legal"],
      keywords: ["administracion", "consorcio", "edificio", "propiedad horizontal", "gestion"],
    },
  ],
  formacionesIntegrales: [
    {
      id: "diplomatura-agente-inmobiliario",
      day: "15",
      month: "Febrero",
      title: "Diplomatura en Corretaje Inmobiliario",
      classes: 20,
      hours: 60,
      modality: "Híbrido",
      coverUrl: "/covers/diplomatura-corretaje.jpg",
      coverAlt: "Birrete y diploma sobre escritorio iluminado por luz natural",
      theme: "realestate" as const,
      startDate: "2026-02-15",
      categories: ["Ventas", "Legal", "Liderazgo"],
      keywords: ["diplomatura", "corretaje", "carrera", "certificacion", "titulo", "programa"],
    },
    {
      id: "programa-broker-profesional",
      day: "01",
      month: "Marzo",
      title: "Programa Broker Inmobiliario Profesional",
      classes: 16,
      hours: 48,
      modality: "Presencial",
      coverUrl: "/covers/broker-profesional.jpg",
      coverAlt: "Ejecutivo profesional en lobby de oficina moderna",
      theme: "realestate" as const,
      startDate: "2026-03-01",
      categories: ["Ventas", "Liderazgo"],
      keywords: ["broker", "profesional", "ejecutivo", "lider", "gerente", "director"],
    },
  ],
  talleresWebinars: [
    {
      id: "workshop-fotografia",
      day: "20",
      month: "Enero",
      title: "Workshop: Fotografía Inmobiliaria Profesional",
      classes: 1,
      hours: 3,
      modality: "Virtual sincrónico",
      coverUrl: "/covers/fotografia-inmobiliaria.jpg",
      coverAlt: "Camara profesional en tripode frente a interior luminoso",
      theme: "marketing" as const,
      startDate: "2026-01-20",
      categories: ["Marketing"],
      keywords: ["fotografia", "foto", "imagen", "camara", "taller", "workshop"],
    },
    {
      id: "webinar-tendencias-2026",
      day: "25",
      month: "Enero",
      title: "Webinar: Tendencias del Mercado Inmobiliario 2026",
      classes: 1,
      hours: 2,
      modality: "Virtual sincrónico",
      coverUrl: "/covers/tendencias-2026.jpg",
      coverAlt: "Tablet con graficos de tendencias frente a skyline urbano",
      theme: "realestate" as const,
      startDate: "2026-01-25",
      categories: ["Ventas", "Tecnología"],
      keywords: ["tendencias", "mercado", "2026", "webinar", "analisis", "datos", "estadisticas"],
    },
    {
      id: "taller-crm",
      day: "28",
      month: "Enero",
      title: "Taller de CRM para Agentes Inmobiliarios",
      classes: 2,
      hours: 4,
      modality: "Presencial",
      coverUrl: "/covers/crm-inmobiliario.jpg",
      coverAlt: "Laptop con dashboard CRM en escritorio minimalista",
      theme: "marketing" as const,
      startDate: "2026-01-28",
      categories: ["Marketing", "Tecnología"],
      keywords: ["crm", "clientes", "gestion", "software", "herramientas", "taller"],
    },
  ],
  elearning: [
    {
      id: "fundamentos-inmobiliarios",
      day: "",
      month: "",
      title: "Fundamentos del Negocio Inmobiliario",
      classes: 6,
      hours: 12,
      modality: "E-learning",
      coverUrl: "/covers/fundamentos-inmobiliarios.jpg",
      coverAlt: "Maqueta de casa sobre planos en escritorio luminoso",
      theme: "realestate" as const,
      categories: ["Ventas", "Tasaciones"],
      keywords: ["fundamentos", "basico", "principiante", "negocio", "inmobiliario", "elearning"],
    },
    {
      id: "proptech-innovacion",
      day: "",
      month: "",
      title: "PropTech e Innovación Inmobiliaria",
      classes: 4,
      hours: 8,
      modality: "E-learning",
      coverUrl: "/covers/proptech-innovacion.jpg",
      coverAlt: "Smartphone con app de hogar inteligente en interior moderno",
      theme: "marketing" as const,
      categories: ["Tecnología"],
      keywords: ["proptech", "tecnologia", "innovacion", "smart", "app", "digital", "elearning"],
    },
    {
      id: "inversiones-inmobiliarias",
      day: "",
      month: "",
      title: "Inversiones Inmobiliarias para Principiantes",
      classes: 5,
      hours: 10,
      modality: "E-learning",
      coverUrl: "/covers/inversiones-inmobiliarias.jpg",
      coverAlt: "Documentos de inversion con llave sobre escritorio de marmol",
      theme: "finance" as const,
      categories: ["Tasaciones", "Legal"],
      keywords: ["inversiones", "inversion", "capital", "dinero", "rentabilidad", "principiante", "elearning"],
    },
  ],
}

const categories = ["Ventas", "Legal", "Tasaciones", "Liderazgo", "Marketing", "Tecnología"]

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

function courseMatchesSearch(course: CourseData, query: string): boolean {
  if (!query) return true
  const q = normalize(query)
  const terms = q.split(/\s+/).filter(Boolean)

  const searchable = normalize(
    [
      course.title,
      course.month,
      course.modality,
      ...course.categories,
      ...course.keywords,
    ].join(" ")
  )

  return terms.every((term) => searchable.includes(term))
}

function getDurationRange(hours: number): string {
  if (hours <= 5) return "Corta (1-5 hs)"
  if (hours <= 20) return "Media (6-20 hs)"
  return "Larga (+20 hs)"
}

function filterCourses(
  courses: CourseData[],
  category: string | null,
  advanced: AdvancedFilters,
  search: string
): CourseData[] {
  return courses.filter((course) => {
    // Search filter
    if (!courseMatchesSearch(course, search)) return false
    // Pill category filter
    if (category && !course.categories.includes(category)) return false
    // Advanced: categorias
    if (advanced.categorias.length > 0 && !advanced.categorias.some((c) => course.categories.includes(c))) return false
    // Advanced: modalidades
    if (advanced.modalidades.length > 0 && !advanced.modalidades.includes(course.modality)) return false
    // Advanced: duracion
    if (advanced.duracion.length > 0 && !advanced.duracion.includes(getDurationRange(course.hours))) return false
    return true
  })
}

function filterBySection(
  sectionKey: string,
  courses: CourseData[],
  category: string | null,
  advanced: AdvancedFilters,
  search: string
): CourseData[] {
  const sectionMap: Record<string, string> = {
    proximasActividades: "",
    cursos: "Cursos",
    formacionesIntegrales: "Programas Integrales",
    talleresWebinars: "Talleres / Webinars",
    elearning: "E-learning",
  }
  // If tipo filter is active and this section doesn't match, return empty
  if (advanced.tipo.length > 0 && sectionMap[sectionKey] && !advanced.tipo.includes(sectionMap[sectionKey])) {
    return []
  }
  // proximasActividades contains courses from all types, so check individually
  if (sectionKey === "proximasActividades" && advanced.tipo.length > 0) {
    // Don't filter proximasActividades by section type - they are upcoming from all types
  }
  return filterCourses(courses, category, advanced, search)
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchInput, setSearchInput] = useState("")
  const [activeSearch, setActiveSearch] = useState("")
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>({
    categorias: [],
    modalidades: [],
    tipo: [],
    duracion: [],
  })
  const coursesRef = useRef<HTMLDivElement>(null)

  const handleSearch = useCallback(() => {
    const trimmed = searchInput.trim()
    setActiveSearch(trimmed)
    if (trimmed) {
      setTimeout(() => {
        coursesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 100)
    }
  }, [searchInput])

  const clearSearch = useCallback(() => {
    setSearchInput("")
    setActiveSearch("")
  }, [])

  const handleCategoryClick = useCallback((cat: string) => {
    setActiveCategory((prev) => (prev === cat ? null : cat))
    setTimeout(() => {
      coursesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }, [])

  const handleAdvancedFilters = useCallback((filters: AdvancedFilters) => {
    setAdvancedFilters(filters)
  }, [])

  const hasAdvancedFilters = Object.values(advancedFilters).some((arr) => arr.length > 0)

  const filteredProximas = filterBySection("proximasActividades", coursesData.proximasActividades, activeCategory, advancedFilters, activeSearch)
  const filteredCursos = filterBySection("cursos", coursesData.cursos, activeCategory, advancedFilters, activeSearch)
  const filteredFormaciones = filterBySection("formacionesIntegrales", coursesData.formacionesIntegrales, activeCategory, advancedFilters, activeSearch)
  const filteredTalleres = filterBySection("talleresWebinars", coursesData.talleresWebinars, activeCategory, advancedFilters, activeSearch)
  const filteredElearning = filterBySection("elearning", coursesData.elearning, activeCategory, advancedFilters, activeSearch)
  const totalResults = filteredProximas.length + filteredCursos.length + filteredFormaciones.length + filteredTalleres.length + filteredElearning.length

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section - Dark Blue */}
      <section className="relative overflow-hidden bg-hero-bg">
        <div className="mx-auto flex max-w-[1200px] items-end justify-center gap-8 lg:gap-12 px-8 lg:px-10">
          {/* Left Block - Title + Search + Pills as one unit */}
          <div className="relative z-10 py-10 md:py-12 lg:py-14 shrink-0">
            {/* Title + Search + Pills shared container */}
            <div className="flex flex-col gap-5 w-fit items-center">
              <h1 className="w-full text-center font-medium text-hero-foreground leading-none font-sans lg:text-[2.65rem] text-5xl my-2">
                ¿Qué quieres aprender hoy?
              </h1>
              {/* Search Bar */}
              <div className="relative w-full">
                <div className="relative flex items-center rounded-xl bg-background overflow-hidden">
                  <Search className="absolute left-5 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSearch() }}
                    placeholder="Busca cursos por tema, docente o palabra clave..."
                    className="w-full h-14 pl-14 pr-32 text-foreground text-base placeholder:text-muted-foreground focus:outline-none bg-transparent"
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-2 h-10 px-7 hover:bg-hero-search-btn-hover font-semibold rounded-lg transition-colors text-base text-hero-foreground bg-destructive"
                  >
                    Buscar
                  </button>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2.5 my-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium border backdrop-blur-md transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] ${
                      activeCategory === cat
                        ? "bg-white/30 text-hero-foreground border-white/50"
                        : "bg-white/15 text-hero-foreground border-white/25 hover:bg-white/25 hover:border-white/40"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block - Hero Image, close to text block */}
          <div className="hidden md:flex items-end shrink-0">
            <Image
              src="/hero-remax-person.png"
              alt="Profesional RE/MAX con material de estudio"
              width={300}
              height={340}
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>
      </section>

      {/* Main Content - Gray Background */}
      <main className="bg-content-bg">
        <div ref={coursesRef} className="mx-auto max-w-[1200px] px-8 lg:px-10 py-10 md:py-14">
          {/* Filter indicator + Filtros avanzados */}
          <div className="flex items-center mb-4">
            {(activeCategory || activeSearch) ? (
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-sm text-muted-foreground">Filtrando por:</span>
                {activeSearch && (
                  <span className="px-3 py-1 rounded-full bg-foreground/10 text-foreground text-sm font-medium flex items-center gap-1.5">
                    {'"'}{activeSearch}{'"'}
                  </span>
                )}
                {activeCategory && (
                  <span className="px-3 py-1 rounded-full bg-hero-bg text-hero-foreground text-sm font-medium">
                    {activeCategory}
                  </span>
                )}
                <button
                  onClick={() => { setActiveCategory(null); clearSearch() }}
                  className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
                >
                  Limpiar filtro
                </button>
                {activeSearch && (
                  <span className="text-sm text-muted-foreground">
                    {totalResults} resultado{totalResults !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
            ) : (
              <div />
            )}
            <div className="ml-auto">
              <HorizontalFilters onFiltersChange={handleAdvancedFilters} />
            </div>
          </div>

          {totalResults === 0 && (activeSearch || activeCategory) ? (
            <NoResultsMessage
              query={activeSearch}
              onReset={() => { setActiveCategory(null); clearSearch(); setAdvancedFilters({ categorias: [], modalidades: [], tipo: [], duracion: [] }) }}
            />
          ) : (
            <>
              {/* Section Title */}
              <h2 className="text-2xl font-bold text-foreground tracking-tight mb-8">Próximos inicios</h2>

              {/* Proximos inicios - 3 col grid */}
              {filteredProximas.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-14">
                  {filteredProximas.map((course) => (
                    <CourseCard key={course.id} {...course} />
                  ))}
                </div>
              ) : (
                <div className="mb-14" />
              )}

              {/* Remaining Sections - only show if they have results */}
              {filteredCursos.length > 0 && (
                <CourseSection title="Cursos" courses={filteredCursos} />
              )}
              {filteredFormaciones.length > 0 && (
                <CourseSection title="Programas Integrales" courses={filteredFormaciones} layout="featured" />
              )}
              {filteredTalleres.length > 0 && (
                <CourseSection title="Talleres / Webinars" courses={filteredTalleres} />
              )}
              {filteredElearning.length > 0 && (
                <CourseSection title="E-learning" courses={filteredElearning} showDate={false} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

function NoResultsMessage({ query, onReset }: { query: string; onReset: () => void }) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  useEffect(() => {
    if (countdown === 0) {
      onReset()
    }
  }, [countdown, onReset])

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
        <SearchX className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No se encontraron resultados
      </h3>
      {query && (
        <p className="text-muted-foreground mb-1">
          {'No hay cursos que coincidan con "'}{query}{'"'}
        </p>
      )}
      <p className="text-sm text-muted-foreground mb-6">
        Volviendo a la pagina principal en {countdown} segundo{countdown !== 1 ? "s" : ""}...
      </p>
      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-lg bg-hero-bg text-hero-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        Ver todos los cursos
      </button>
    </div>
  )
}

// Import CourseCard directly for the main grid
import { CourseCard } from "@/components/course-card"
