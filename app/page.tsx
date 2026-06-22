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
      id: "ecg-basico",
      day: "10",
      month: "Julio",
      title: "ECG Básico para el Médico Clínico",
      classes: 4,
      hours: 10,
      modality: "Virtual sincrónico",
      coverUrl: "/covers/ecg-basico.png",
      coverAlt: "Trazado de electrocardiograma sobre escritorio clínico",
      theme: "general" as const,
      startDate: "2026-07-10",
      categories: ["Diagnóstico", "Clínica"],
      keywords: ["ecg", "electrocardiograma", "basico", "medico", "clinico", "trazado", "virtual"],
    },
    {
      id: "hipertension-arterial",
      day: "17",
      month: "Julio",
      title: "Hipertensión Arterial: Diagnóstico y Tratamiento",
      classes: 6,
      hours: 15,
      modality: "Presencial",
      coverUrl: "/covers/hipertension.png",
      coverAlt: "Tensiómetro sobre escritorio médico",
      theme: "management" as const,
      startDate: "2026-07-17",
      categories: ["Prevención", "Clínica"],
      keywords: ["hipertension", "presion", "arterial", "tratamiento", "diagnostico", "presencial"],
    },
    {
      id: "cardiologia-deportiva-intro",
      day: "24",
      month: "Julio",
      title: "Introducción a la Cardiología Deportiva",
      classes: 3,
      hours: 8,
      modality: "Híbrido",
      coverUrl: "/covers/cardiologia-deportiva.png",
      coverAlt: "Atleta con monitor de frecuencia cardíaca siendo evaluado",
      theme: "general" as const,
      startDate: "2026-07-24",
      categories: ["Deporte", "Prevención"],
      keywords: ["cardiologia", "deportiva", "deporte", "atleta", "apto", "hibrido"],
    },
  ],
  cursos: [
    {
      id: "ecocardiografia-basica",
      day: "01",
      month: "Agosto",
      title: "Ecocardiografía Básica",
      classes: 8,
      hours: 24,
      modality: "Presencial",
      coverUrl: "/covers/ecocardiografia.png",
      coverAlt: "Pantalla de ecocardiografía mostrando cámaras cardíacas",
      theme: "general" as const,
      startDate: "2026-08-01",
      categories: ["Diagnóstico", "Imagen"],
      keywords: ["ecocardiografia", "eco", "ultrasonido", "imagen", "corazon", "presencial"],
    },
    {
      id: "holter-monitoreo",
      day: "07",
      month: "Agosto",
      title: "Monitoreo Holter e Interpretación",
      classes: 5,
      hours: 14,
      modality: "Virtual sincrónico",
      coverUrl: "/covers/holter.png",
      coverAlt: "Dispositivo Holter con trazados de monitoreo",
      theme: "finance" as const,
      startDate: "2026-08-07",
      categories: ["Diagnóstico", "Clínica"],
      keywords: ["holter", "monitoreo", "arritmia", "virtual", "interpretacion", "ritmo"],
    },
    {
      id: "insuficiencia-cardiaca",
      day: "14",
      month: "Agosto",
      title: "Insuficiencia Cardíaca: Actualización 2026",
      classes: 10,
      hours: 28,
      modality: "Híbrido",
      coverUrl: "/covers/insuficiencia-cardiaca.png",
      coverAlt: "Anatomía cardíaca con notas médicas",
      theme: "management" as const,
      startDate: "2026-08-14",
      categories: ["Clínica", "Prevención"],
      keywords: ["insuficiencia", "cardiaca", "falla", "corazon", "tratamiento", "actualizacion", "hibrido"],
    },
  ],
  formacionesIntegrales: [
    {
      id: "diplomatura-cardiologia",
      day: "01",
      month: "Septiembre",
      title: "Diplomatura en Cardiología Clínica",
      classes: 24,
      hours: 72,
      modality: "Híbrido",
      coverUrl: "/covers/diplomatura-cardiologia.png",
      coverAlt: "Diploma médico y estetoscopio sobre escritorio académico",
      theme: "realestate" as const,
      startDate: "2026-09-01",
      categories: ["Clínica", "Diagnóstico", "Prevención"],
      keywords: ["diplomatura", "cardiologia", "clinica", "programa", "certificacion", "titulo"],
    },
    {
      id: "programa-prevencion-cardiovascular",
      day: "15",
      month: "Septiembre",
      title: "Programa Integral de Prevención Cardiovascular",
      classes: 16,
      hours: 48,
      modality: "Virtual sincrónico",
      coverUrl: "/covers/prevencion-cardiovascular.png",
      coverAlt: "Hábitos saludables y prevención cardiovascular",
      theme: "management" as const,
      startDate: "2026-09-15",
      categories: ["Prevención", "Deporte"],
      keywords: ["prevencion", "cardiovascular", "riesgo", "factores", "programa", "integral", "virtual"],
    },
  ],
  talleresWebinars: [
    {
      id: "taller-ergometria",
      day: "19",
      month: "Julio",
      title: "Taller: Interpretación de Ergometría",
      classes: 1,
      hours: 4,
      modality: "Presencial",
      coverUrl: "/covers/ergometria.png",
      coverAlt: "Paciente en cinta ergométrica con monitoreo cardíaco",
      theme: "general" as const,
      startDate: "2026-07-19",
      categories: ["Diagnóstico", "Deporte"],
      keywords: ["ergometria", "prueba", "esfuerzo", "treadmill", "taller", "presencial"],
    },
    {
      id: "webinar-arritmias",
      day: "26",
      month: "Julio",
      title: "Webinar: Arritmias en la Práctica Diaria",
      classes: 1,
      hours: 2,
      modality: "Virtual sincrónico",
      coverUrl: "/covers/arritmias.png",
      coverAlt: "Trazado de ECG con patrón de arritmia",
      theme: "legal" as const,
      startDate: "2026-07-26",
      categories: ["Diagnóstico", "Clínica"],
      keywords: ["arritmias", "fibrilacion", "extrasistoles", "webinar", "practica", "virtual"],
    },
    {
      id: "taller-apto-medico",
      day: "02",
      month: "Agosto",
      title: "Taller: Apto Médico Pre-Competitivo",
      classes: 2,
      hours: 5,
      modality: "Presencial",
      coverUrl: "/covers/apto-medico.png",
      coverAlt: "Médico examinando atleta con estetoscopio",
      theme: "marketing" as const,
      startDate: "2026-08-02",
      categories: ["Deporte", "Prevención"],
      keywords: ["apto", "medico", "precompetitivo", "deporte", "examen", "taller", "presencial"],
    },
  ],
  elearning: [
    {
      id: "riesgo-cardiovascular",
      day: "",
      month: "",
      title: "Evaluación del Riesgo Cardiovascular",
      classes: 6,
      hours: 12,
      modality: "E-learning",
      coverUrl: "/covers/riesgo-cardiovascular.png",
      coverAlt: "Gráficos de riesgo cardiovascular en consulta médica",
      theme: "finance" as const,
      categories: ["Prevención", "Clínica"],
      keywords: ["riesgo", "cardiovascular", "evaluacion", "score", "factores", "elearning"],
    },
    {
      id: "ecg-avanzado",
      day: "",
      month: "",
      title: "ECG Avanzado: Patologías y Síndromes",
      classes: 5,
      hours: 10,
      modality: "E-learning",
      coverUrl: "/covers/ecg-basico.png",
      coverAlt: "Trazado de ECG con patología avanzada",
      theme: "general" as const,
      categories: ["Diagnóstico", "Imagen"],
      keywords: ["ecg", "avanzado", "sindromes", "patologias", "bloqueos", "elearning"],
    },
    {
      id: "farmacologia-cardiologica",
      day: "",
      month: "",
      title: "Farmacología en Cardiología",
      classes: 4,
      hours: 8,
      modality: "E-learning",
      coverUrl: "/covers/insuficiencia-cardiaca.png",
      coverAlt: "Medicamentos y recursos cardiológicos en escritorio",
      theme: "management" as const,
      categories: ["Clínica", "Prevención"],
      keywords: ["farmacologia", "medicamentos", "drogas", "tratamiento", "cardiologia", "elearning"],
    },
  ],
}

const categories = ["Clínica", "Diagnóstico", "Prevención", "Deporte", "Imagen"]

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

      {/* Hero Section - Wolff Crimson */}
      <section className="relative overflow-hidden bg-hero-bg">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 lg:gap-12 px-8 lg:px-10">
          {/* Left Block - Title + Search + Pills as one unit */}
          <div className="relative z-10 flex-1 py-12 md:py-16 lg:py-20">
            {/* Title + Search + Pills shared container */}
            <div className="flex flex-col gap-5 w-full max-w-[560px]">
              <h1 className="w-full text-center font-medium text-hero-foreground leading-tight font-sans lg:text-[2.65rem] text-4xl sm:text-5xl">
                Formación continua en Cardiología
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
                    className="absolute right-2 h-10 px-7 hover:bg-hero-search-btn-hover font-semibold rounded-lg transition-colors text-base text-hero-foreground bg-hero-search-btn"
                  >
                    Buscar
                  </button>
                </div>
              </div>

              {/* Category Pills - span full width of search bar */}
              <div className="flex w-full justify-between gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`flex-1 px-3 py-2 rounded-full text-sm font-medium border backdrop-blur-md transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] ${
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

          {/* Right Block - Hero Image (anchored to banner bottom so the cropped portrait reads as intentional) */}
          <div className="hidden md:flex flex-1 items-end justify-center self-stretch pt-12">
            <Image
              src="/hero-wolff-person.png"
              alt="Cardiólogo del Instituto Wolff"
              width={420}
              height={420}
              className="h-auto max-h-[420px] w-auto object-contain object-bottom"
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
