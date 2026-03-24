'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Phone, MapPin } from 'lucide-react'
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


export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [propiedad, setPropiedad] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget

    const payload = {
      access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
      subject: `Nueva consulta — ${propiedad} | University Depas`,
      from_name: (form.elements.namedItem('nombre') as HTMLInputElement).value,
      replyto: (form.elements.namedItem('correo') as HTMLInputElement).value,
      name: (form.elements.namedItem('nombre') as HTMLInputElement).value,
      phone: (form.elements.namedItem('telefono') as HTMLInputElement).value,
      email: (form.elements.namedItem('correo') as HTMLInputElement).value,
      propiedad,
      mensaje: (form.elements.namedItem('mensaje') as HTMLTextAreaElement).value || '(sin mensaje)',
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      setStatus(json.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#2563eb] text-xs font-bold tracking-[4px] uppercase mb-3">
            Estamos para ayudarte
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-3">
            Contáctanos
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Respondemos rápido — sin compromiso.
          </p>
        </div>

        {/* 2-column layout */}
        <div className="grid lg:grid-cols-5 gap-10">

          {/* Left — contact form (3/5) */}
          <div className="lg:col-span-3">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">¡Mensaje enviado!</h3>
                <p className="text-slate-500 mb-6">Te contactaremos a la brevedad.</p>
                <Button variant="outline" onClick={() => { setStatus('idle'); setPropiedad('') }}>
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombre">Nombre *</Label>
                    <Input id="nombre" name="nombre" required placeholder="Tu nombre completo" />
                  </div>
                  <div>
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input id="telefono" name="telefono" required placeholder="222 000 0000" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="correo">Correo electrónico *</Label>
                  <Input id="correo" name="correo" type="email" required placeholder="tu@correo.com" />
                </div>
                <div>
                  <Label htmlFor="propiedad">Propiedad de interés *</Label>
                  <Select onValueChange={setPropiedad} required>
                    <SelectTrigger id="propiedad">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Departamento en Venta">Departamento en Venta</SelectItem>
                      <SelectItem value="Loft en Renta">Loft en Renta</SelectItem>
                      <SelectItem value="No estoy seguro">No estoy seguro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea
                    id="mensaje"
                    name="mensaje"
                    placeholder="¿Tienes alguna pregunta o comentario?"
                    rows={4}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm" role="alert">
                    Ocurrió un error. Por favor intenta de nuevo o llámanos directamente.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={status === 'loading' || !propiedad}
                  className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold py-3"
                >
                  {status === 'loading' ? 'Enviando...' : 'Enviar mensaje →'}
                </Button>
              </form>
            )}
          </div>

          {/* Right — contact details (2/5) */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Advisor profile */}
            <div className="bg-slate-50 rounded-2xl p-6 flex items-center gap-5">
              <div className="relative w-20 h-20 rounded-full overflow-hidden bg-slate-200 shrink-0 ring-4 ring-[#2563eb]/10">
                <Image
                  src="/images/jenniferheadshot.png"
                  alt="Jennifer Ordonez"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="text-[#1e3a5f] font-bold text-base">Jennifer Ordonez</p>
                <p className="text-slate-400 text-xs mb-3">Asesora de Ventas</p>
                <a
                  href="tel:2225473035"
                  className="inline-flex items-center gap-1.5 text-[#2563eb] hover:text-[#1d4ed8] font-semibold text-sm transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  222 547 3035
                </a>
              </div>
            </div>

            {/* Address + WhatsApp */}
            <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#2563eb]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-[#2563eb]" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-0.5">Dirección</p>
                  <p className="text-[#1e3a5f] font-semibold text-sm leading-snug">
                    Av. 19 Pte. 2118<br />Rivera de Santiago, Puebla
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/522225473035"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escribir por WhatsApp
              </a>
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}
