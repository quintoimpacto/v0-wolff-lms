import Link from "next/link"
import { BookOpen, Calendar, Users, DollarSign, ClipboardList, UserPlus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  { title: "Actividades", value: "24", icon: BookOpen, href: "/admin/actividades", color: "bg-blue-100 text-blue-600" },
  { title: "Ediciones", value: "156", icon: Calendar, href: "/admin/ediciones", color: "bg-green-100 text-green-600" },
  { title: "Docentes", value: "42", icon: Users, href: "/admin/docentes", color: "bg-purple-100 text-purple-600" },
  { title: "Precios", value: "18", icon: DollarSign, href: "/admin/precios", color: "bg-yellow-100 text-yellow-600" },
  {
    title: "Inscripciones",
    value: "1,234",
    icon: ClipboardList,
    href: "/admin/inscripciones",
    color: "bg-orange-100 text-orange-600",
  },
  { title: "Leads", value: "567", icon: UserPlus, href: "/admin/leads", color: "bg-pink-100 text-pink-600" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Bienvenido al panel de administración</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.href} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-md ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
