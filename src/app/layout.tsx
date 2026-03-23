import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  title: 'University Depas — Departamentos y Lofts',
  description:
    'Departamentos y lofts en venta y renta cerca de la universidad. Torres Aurum, Perseo y Maya.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={GeistSans.variable}>
      <body className="bg-white text-slate-900 antialiased">{children}</body>
    </html>
  )
}
