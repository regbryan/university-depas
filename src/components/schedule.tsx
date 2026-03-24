'use client'

import { PopupButton } from 'react-calendly'
import { useEffect, useState } from 'react'

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL

const steps = [
  {
    number: '01',
    title: 'Selecciona tu fecha',
    description: 'Elige el día y hora que más te convenga — en segundos.',
  },
  {
    number: '02',
    title: 'Elige tu propiedad',
    description: 'Cuéntanos qué tipo de espacio estás buscando.',
  },
  {
    number: '03',
    title: 'Conoce al asesor',
    description: 'Te recibiremos en persona para un recorrido sin compromiso.',
  },
]

export function Schedule() {
  const [rootEl, setRootEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setRootEl(document.body)
  }, [])

  return (
    <section id="agendar" className="py-20 bg-[#1e3a5f]">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-blue-300 text-xs font-bold tracking-[4px] uppercase mb-3">
            Sin costo · Sin compromiso
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Agenda tu Visita
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto">
            Conoce nuestras propiedades en persona — es fácil y rápido.
          </p>
        </div>

        {/* 3-step process */}
        <div className="grid sm:grid-cols-3 gap-0 mb-10 relative">
          {/* Connector line — desktop only */}
          <div className="hidden sm:block absolute top-8 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-[1px] bg-white/10" />

          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-center text-center px-6 pb-8 sm:pb-0">
              {/* Step number circle */}
              <div className="w-16 h-16 rounded-full bg-[#2563eb] flex items-center justify-center mb-4 shadow-lg shadow-blue-900/40 relative z-10">
                <span className="text-white font-bold text-lg">{i + 1}</span>
              </div>
              <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-xl mb-1">¿Listo para conocernos?</p>
            <p className="text-slate-400 text-sm">
              ¿Prefieres llamar?{' '}
              <a href="tel:2225473035" className="text-white hover:underline font-medium">222 547 3035</a>
            </p>
          </div>

          {calendlyUrl && rootEl ? (
            <PopupButton
              url={calendlyUrl}
              rootElement={rootEl}
              text="Agendar mi visita →"
              className="inline-flex items-center justify-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-8 py-3 rounded-lg text-base transition-colors cursor-pointer whitespace-nowrap shadow-lg shadow-blue-900/40"
            />
          ) : (
            <a
              href="tel:2212664467"
              className="inline-flex items-center justify-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-8 py-3 rounded-lg text-base transition-colors whitespace-nowrap"
            >
              Llamar para agendar →
            </a>
          )}
        </div>

      </div>
    </section>
  )
}
