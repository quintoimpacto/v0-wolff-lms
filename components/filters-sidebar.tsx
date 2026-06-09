"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FilterSection {
  title: string
  options: string[]
}

const filterSections: FilterSection[] = [
  {
    title: "Perfiles",
    options: ["Operadores", "Analistas", "Ejecutivos", "Compliance"],
  },
  {
    title: "Ejes temáticos",
    options: ["Mercado de Capitales", "Riesgo", "Normativa", "Tecnología"],
  },
  {
    title: "Delegaciones",
    options: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza"],
  },
  {
    title: "Modalidades",
    options: ["Presencial", "Virtual sincrónico", "E-learning", "Híbrido"],
  },
]

export function FiltersSidebar() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["Perfiles", "Ejes temáticos"])
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => (prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]))
  }

  const toggleFilter = (section: string, option: string) => {
    setSelectedFilters((prev) => {
      const current = prev[section] || []
      return {
        ...prev,
        [section]: current.includes(option) ? current.filter((o) => o !== option) : [...current, option],
      }
    })
  }

  const clearFilters = () => setSelectedFilters({})

  const hasFilters = Object.values(selectedFilters).some((arr) => arr.length > 0)

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-[#111827] tracking-tight">Filtros</h2>

      {filterSections.map((section) => (
        <div key={section.title} className="rounded-lg border border-[#E5E7EB] bg-white">
          <button
            onClick={() => toggleSection(section.title)}
            className="flex w-full items-center justify-between p-3 text-left font-semibold text-[#111827] hover:bg-[#F7F8FA] transition-colors duration-200"
          >
            {section.title}
            {expandedSections.includes(section.title) ? (
              <ChevronUp className="h-4 w-4 text-[#6B7280]" />
            ) : (
              <ChevronDown className="h-4 w-4 text-[#6B7280]" />
            )}
          </button>

          {expandedSections.includes(section.title) && (
            <div className="flex flex-col gap-2 border-t border-[#E5E7EB]/70 p-3">
              {section.options.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2 text-sm text-[#4B5563] hover:text-[#111827] transition-colors duration-200"
                >
                  <Checkbox
                    checked={selectedFilters[section.title]?.includes(option) || false}
                    onCheckedChange={() => toggleFilter(section.title, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="flex flex-col gap-2 pt-3">
        <Button className="w-full bg-[#0244eb] hover:bg-[#0238c7] text-white font-semibold transition-colors duration-200">Aplicar filtros</Button>
        <Button variant="outline" className="w-full bg-transparent border-[#E5E7EB] hover:bg-[#F7F8FA] text-[#4B5563] font-medium transition-colors duration-200" onClick={clearFilters} disabled={!hasFilters}>
          Limpiar filtros
        </Button>
      </div>
    </div>
  )
}
