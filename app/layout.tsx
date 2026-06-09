import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Inter, Source_Sans_3 } from 'next/font/google'

// Professional sans-serif fonts for corporate aesthetic
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700']
})
const sourceSans = Source_Sans_3({ 
  subsets: ['latin'], 
  variable: '--font-source-sans',
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: "RE/MAX Campus - Plataforma de Formación",
  description: "Impulsa tu carrera en Real Estate con las mejores herramientas y formación de la red RE/MAX",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${sourceSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
