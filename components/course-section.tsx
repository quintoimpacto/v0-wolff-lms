"use client"

import { CourseCard } from "./course-card"

interface Course {
  id: string
  day: string
  month: string
  title: string
  classes: number
  hours: number
  modality: string
  coverUrl?: string
  coverAlt?: string
  theme?: "realestate" | "marketing" | "legal" | "finance" | "management" | "general"
  startDate?: string
}

interface CourseSectionProps {
  title: string
  courses: Course[]
  showDate?: boolean
  layout?: "grid" | "featured"
}

export function CourseSection({ title, courses, showDate = true, layout = "grid" }: CourseSectionProps) {
  if (layout === "featured") {
    return (
      <section className="mb-12">
        <h2 className="mb-6 text-xl font-bold text-foreground tracking-tight md:text-2xl">{title}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} showDate={showDate} variant="large" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-xl font-bold text-[#111827] tracking-tight md:text-2xl">{title}</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} showDate={showDate} />
        ))}
      </div>
    </section>
  )
}
