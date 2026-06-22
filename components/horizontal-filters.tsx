"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SlidersHorizontal } from "lucide-react"

const filterSections = [
  {
    id: "categorias",
    title: "Categoría",
    options: ["Clínica", "Diagnóstico", "Prevención", "Deporte", "Imagen"],
  },
  {
    id: "modalidades",
    title: "Modalidad",
    options: ["Presencial", "Virtual sincrónico", "E-learning", "Híbrido"],
  },
  {
    id: "tipo",
    title: "Tipo de formación",
    options: ["Cursos", "Programas Integrales", "Talleres / Webinars", "E-learning"],
  },
  {
    id: "duracion",
    title: "Duración",
    options: ["Corta (1-5 hs)", "Media (6-20 hs)", "Larga (+20 hs)"],
  },
]

export interface AdvancedFilters {
  categorias: string[]
  modalidades: string[]
  tipo: string[]
  duracion: string[]
}

interface HorizontalFiltersProps {
  onFiltersChange?: (filters: AdvancedFilters) => void
}

export function HorizontalFilters({ onFiltersChange }: HorizontalFiltersProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})

  const toggleFilter = (section: string, option: string) => {
    setSelectedFilters((prev) => {
      const current = prev[section] || []
      return {
        ...prev,
        [section]: current.includes(option) ? current.filter((o) => o !== option) : [...current, option],
      }
    })
  }

  const clearFilters = () => {
    setSelectedFilters({})
    onFiltersChange?.({ categorias: [], modalidades: [], tipo: [], duracion: [] })
  }

  const applyFilters = () => {
    onFiltersChange?.({
      categorias: selectedFilters.categorias || [],
      modalidades: selectedFilters.modalidades || [],
      tipo: selectedFilters.tipo || [],
      duracion: selectedFilters.duracion || [],
    })
    setDrawerOpen(false)
  }

  const hasFilters = Object.values(selectedFilters).some((arr) => arr.length > 0)
  const filterCount = Object.values(selectedFilters).flat().length

  return (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2 text-foreground font-medium hover:text-hero-bg transition-colors">
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filtros</span>
          {filterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-hero-bg text-xs text-hero-foreground">
              {filterCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      
      <SheetContent 
        side="right" 
        className="w-full sm:w-[420px] p-0 overflow-hidden bg-card/98 backdrop-blur-xl border-l border-border shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-border bg-card">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-foreground">Filtros Avanzados</SheetTitle>
            <p className="text-sm text-muted-foreground mt-1">Refina tu búsqueda con opciones específicas</p>
          </SheetHeader>
        </div>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <Accordion type="multiple" defaultValue={[]} className="w-full space-y-2">
            {filterSections.map((section) => (
              <AccordionItem 
                key={section.id} 
                value={section.id}
                className="border border-border rounded-xl overflow-hidden bg-card data-[state=open]:shadow-sm transition-shadow duration-200 last:border-b"
              >
                <AccordionTrigger className="px-4 py-4 text-foreground font-semibold hover:no-underline hover:bg-secondary transition-colors [&[data-state=open]]:bg-secondary border-none">
                  <div className="flex items-center gap-2">
                    {section.title}
                    {selectedFilters[section.id]?.length > 0 && (
                      <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-hero-bg text-xs text-hero-foreground font-medium px-1.5">
                        {selectedFilters[section.id].length}
                      </span>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <div className="flex flex-col gap-3">
                    {section.options.map((option) => (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-3 p-2 -mx-2 rounded-lg text-sm text-text-secondary hover:bg-secondary hover:text-foreground transition-all duration-200"
                      >
                        <Checkbox
                          checked={selectedFilters[section.id]?.includes(option) || false}
                          onCheckedChange={() => toggleFilter(section.id, option)}
                          className="h-5 w-5 border-border rounded data-[state=checked]:bg-hero-bg data-[state=checked]:border-hero-bg"
                        />
                        <span className="flex-1">{option}</span>
                      </label>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Fixed Footer */}
        <div className="px-6 py-5 bg-card border-t border-border space-y-3">
          <Button 
            onClick={applyFilters}
            className="w-full h-11 bg-hero-bg hover:bg-hero-bg/85 text-hero-foreground font-semibold rounded-xl transition-colors duration-200"
          >
            Aplicar filtros
          </Button>
          <Button 
            variant="ghost"
            onClick={clearFilters}
            disabled={!hasFilters}
            className="w-full h-10 text-muted-foreground hover:text-foreground hover:bg-secondary font-medium rounded-xl disabled:opacity-50 transition-colors duration-200"
          >
            Limpiar todo
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
