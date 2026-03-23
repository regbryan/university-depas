'use client'

import { InlineWidget } from 'react-calendly'

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL

export function Schedule() {
  return (
    <section id="agendar" className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-[#1e3a5f] mb-4">Agenda tu Visita</h2>
        <p className="text-slate-500 mb-10 max-w-xl mx-auto">
          ¿Quieres conocer nuestras propiedades? Agenda una cita con nosotros — es rápido y sencillo.
        </p>

        {calendlyUrl ? (
          <InlineWidget
            url={calendlyUrl}
            styles={{ height: '700px', minWidth: '320px' }}
          />
        ) : (
          <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-12 text-slate-400">
            <p className="font-medium mb-2">Widget de Calendly</p>
            <p className="text-sm">
              Configura tu cuenta en{' '}
              <a href="https://calendly.com" className="underline" target="_blank" rel="noreferrer">
                calendly.com
              </a>{' '}
              y agrega <code>NEXT_PUBLIC_CALENDLY_URL</code> a las variables de entorno.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
