import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center text-white overflow-hidden"
    >
      {/* Background photo */}
      <Image
        src="/images/hero.jpg"
        alt="Skyline de Puebla"
        fill
        priority
        className="object-cover object-center"
        quality={85}
      />

      {/* Dark gradient overlay — left side darker so text is readable */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(105deg, rgba(15,34,64,0.92) 0%, rgba(30,58,95,0.80) 45%, rgba(30,58,95,0.40) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 py-24 lg:py-0 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-[#2563eb]" />
            <p className="text-blue-200 text-xs font-bold tracking-[4px] uppercase">
              Puebla, México
            </p>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
            Tu hogar cerca<br />
            de la universidad
          </h1>

          <p className="text-blue-100/85 text-lg mb-4 leading-relaxed">
            Departamentos y lofts en{' '}
            <strong className="text-white font-semibold">venta y renta</strong>{' '}
            — Torres Aurum, Perseo &amp; Maya.
          </p>

          {/* Pill badges */}
          <div className="flex flex-wrap gap-2 mb-10">
            {['Torre Aurum', 'Torre Perseo', 'Torre Maya'].map((t) => (
              <span
                key={t}
                className="text-xs font-medium px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white/80 backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-base px-8 shadow-lg shadow-blue-900/40"
            >
              <a href="#propiedades">Ver Propiedades</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm text-base px-8"
            >
              <a href="#agendar">Agendar Visita</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-white font-bold text-xl">3</p>
            <p className="text-blue-200/70 text-xs uppercase tracking-wide">Torres</p>
          </div>
          <div>
            <p className="text-white font-bold text-xl">12+</p>
            <p className="text-blue-200/70 text-xs uppercase tracking-wide">Amenidades</p>
          </div>
          <div>
            <p className="text-white font-bold text-xl">24/7</p>
            <p className="text-blue-200/70 text-xs uppercase tracking-wide">Seguridad</p>
          </div>
        </div>
      </div>
    </section>
  )
}
