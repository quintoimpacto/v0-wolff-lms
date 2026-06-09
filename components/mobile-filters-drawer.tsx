"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"
import { FiltersSidebar } from "./filters-sidebar"

export function MobileFiltersDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 lg:hidden bg-transparent border-[#E5E7EB] hover:bg-[#F7F8FA] font-medium text-[#4B5563] transition-colors duration-200">
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto bg-white">
        <SheetHeader>
          <SheetTitle className="text-[#111827]">Filtrar cursos</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <FiltersSidebar />
        </div>
      </SheetContent>
    </Sheet>
  )
}
