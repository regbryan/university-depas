import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://university-depas.netlify.app'),
  title: 'University Depas — Departamentos y Lofts en Puebla',
  description:
    'Departamentos y lofts en venta y renta cerca de la universidad. Torres Aurum, Perseo y Maya en Puebla, México.',
  keywords: ['departamentos puebla', 'lofts puebla', 'renta departamentos puebla', 'universidad puebla', 'university depas'],
  openGraph: {
    title: 'University Depas — Departamentos y Lofts en Puebla',
    description: 'Departamentos y lofts en venta y renta cerca de la universidad en Puebla, México. Visita Torres Aurum, Perseo y Maya.',
    url: 'https://university-depas.netlify.app',
    siteName: 'University Depas',
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'University Depas — Departamentos y Lofts en Puebla',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'University Depas — Departamentos y Lofts en Puebla',
    description: 'Departamentos y lofts en venta y renta cerca de la universidad en Puebla, México.',
    images: ['/images/hero.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={GeistSans.variable}>
      <body className="bg-white text-slate-900 antialiased">{children}</body>
    </html>
  )
}
