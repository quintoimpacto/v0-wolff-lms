"use client"

import type React from "react"
import { useState } from "react"
import { Search, Download, Plus, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Column<T> {
  key: keyof T | string
  label: string
  render?: (item: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  title: string
  onAdd?: () => void
  onExport?: () => void
  filters?: { key: string; label: string; options: { value: string; label: string }[] }[]
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  title,
  onAdd,
  onExport,
  filters,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filterValues, setFilterValues] = useState<Record<string, string>>({})
  const itemsPerPage = 10

  const filteredData = data.filter((item) => {
    const matchesSearch = columns.some((col) => {
      const value = item[col.key as keyof T]
      return String(value).toLowerCase().includes(search.toLowerCase())
    })
    return matchesSearch
  })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleExportCSV = () => {
    const headers = columns.map((col) => col.label).join(",")
    const rows = filteredData.map((item) => columns.map((col) => String(item[col.key as keyof T] ?? "")).join(","))
    const csv = [headers, ...rows].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${title.toLowerCase().replace(/\s/g, "-")}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="flex gap-2">
          {onAdd && (
            <Button onClick={onAdd} className="bg-[#1c426e] hover:bg-[#15345a]">
              <Plus className="mr-2 h-4 w-4" />
              Crear nuevo
            </Button>
          )}
          <Button variant="outline" onClick={onExport || handleExportCSV}>
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        {filters?.map((filter) => (
          <Select
            key={filter.key}
            value={filterValues[filter.key] || "all"}
            onValueChange={(value) => setFilterValues((prev) => ({ ...prev, [filter.key]: value }))}
          >
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {filter.options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={String(col.key)}>{col.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                {columns.map((col) => (
                  <TableCell key={String(col.key)}>
                    {col.render ? col.render(item) : String(item[col.key as keyof T] ?? "")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8 text-gray-500">
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Mostrando {(currentPage - 1) * itemsPerPage + 1} a{" "}
            {Math.min(currentPage * itemsPerPage, filteredData.length)} de {filteredData.length} resultados
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
