'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [propiedad, setPropiedad] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const data = {
      nombre: (form.elements.namedItem('nombre') as HTMLInputElement).value,
      telefono: (form.elements.namedItem('telefono') as HTMLInputElement).value,
      correo: (form.elements.namedItem('correo') as HTMLInputElement).value,
      propiedad,
      mensaje: (form.elements.namedItem('mensaje') as HTMLTextAreaElement).value,
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#1e3a5f] text-center mb-10">Contáctanos</h2>

        <div className="grid md:grid-cols-[1fr_280px] gap-10">
          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nombre">Nombre *</Label>
              <Input id="nombre" name="nombre" required placeholder="Tu nombre completo" />
            </div>
            <div>
              <Label htmlFor="telefono">Teléfono *</Label>
              <Input id="telefono" name="telefono" required placeholder="Tu número de teléfono" />
            </div>
            <div>
              <Label htmlFor="correo">Correo electrónico *</Label>
              <Input
                id="correo"
                name="correo"
                type="email"
                required
                placeholder="tu@correo.com"
              />
            </div>
            <div>
              <Label>Propiedad de interés *</Label>
              <Select onValueChange={setPropiedad} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Departamento">Departamento</SelectItem>
                  <SelectItem value="Loft">Loft</SelectItem>
                  <SelectItem value="No estoy seguro">No estoy seguro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mensaje">Mensaje</Label>
              <Textarea
                id="mensaje"
                name="mensaje"
                placeholder="¿Tienes alguna pregunta?"
                rows={4}
              />
            </div>

            {status === 'success' && (
              <p className="text-green-600 font-medium" role="status">
                ¡Mensaje enviado! Te contactaremos pronto.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-500" role="alert">
                Ocurrió un error. Por favor intenta de nuevo o llámanos directamente.
              </p>
            )}

            <Button
              type="submit"
              disabled={status === 'loading' || !propiedad}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
            </Button>
          </form>

          {/* Direct contact */}
          <div className="space-y-6">
            {/* WhatsApp QR */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
              <p className="text-green-700 font-semibold text-sm mb-3">📱 WhatsApp</p>
              {/* Placeholder until client provides QR code image */}
              <div
                className="w-24 h-24 bg-slate-200 rounded mx-auto mb-3 flex items-center justify-items-center text-xs text-slate-400"
                aria-label="Código QR de WhatsApp (pendiente)"
              >
                QR
              </div>
              <p className="text-slate-500 text-xs mb-3">Escanea para chatear</p>
              <Button asChild size="sm" className="bg-green-600 hover:bg-green-700 w-full">
                <a href="https://wa.me/521XXXXXXXXXX" target="_blank" rel="noreferrer">
                  Abrir WhatsApp
                </a>
              </Button>
            </div>

            {/* Phones */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">Teléfonos</p>
              <p className="text-slate-600 text-sm">
                Karla Moro:{' '}
                <a href="tel:2212664467" className="text-[#2563eb]">
                  2212664467
                </a>
              </p>
              <p className="text-slate-600 text-sm">
                Maylu Gil:{' '}
                <a href="tel:2224941383" className="text-[#2563eb]">
                  2224941383
                </a>
              </p>
            </div>

            {/* Social */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">Redes sociales</p>
              <div className="space-y-2">
                <a
                  href="https://facebook.com/UniversityDepasOficial"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-600 text-sm hover:text-[#2563eb]"
                >
                  <FacebookIcon className="h-4 w-4" /> University Depas Oficial
                </a>
                <a
                  href="https://instagram.com/university_depass"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-600 text-sm hover:text-[#2563eb]"
                >
                  <InstagramIcon className="h-4 w-4" /> @university_depass
                </a>
                <a
                  href="https://tiktok.com/@universitydepas"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-slate-600 text-sm hover:text-[#2563eb]"
                >
                  <span className="h-4 w-4 text-center text-xs font-bold" aria-hidden="true">TK</span>{' '}
                  @universitydepas
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
