import { Clock, Calendar, BookOpen } from "lucide-react"
import Link from "next/link"
import { CourseCover } from "./course-cover"

interface CourseCardProps {
  id: string
  day?: string
  month?: string
  title: string
  classes: number
  hours: number
  modality: string
  showDate?: boolean
  coverUrl?: string
  coverAlt?: string
  theme?: "realestate" | "marketing" | "legal" | "finance" | "management" | "general"
  startDate?: string
  variant?: "default" | "large"
}

export function CourseCard({
  id,
  day,
  month,
  title,
  classes,
  hours,
  modality,
  showDate = true,
  coverUrl,
  coverAlt,
  theme = "general",
  startDate,
  variant = "default",
}: CourseCardProps) {
  return (
    <Link href={`/curso/${id}`}>
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] hover:-translate-y-1">
        <CourseCover
          title={title}
          coverUrl={coverUrl}
          coverAlt={coverAlt}
          theme={theme}
          modality={modality}
          startDate={startDate}
          variant={variant}
        />

        <div className="flex flex-1 flex-col gap-3 p-5 pb-6">
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground min-h-[2.5rem]">
            {title}
          </h3>

          <div className="flex items-center gap-5 text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{hours} horas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm">
                {classes} {classes === 1 ? "clase" : "clases"}
              </span>
            </div>
          </div>

          {showDate && day && month && day !== "" && (
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                Inicia {day} de {month}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
