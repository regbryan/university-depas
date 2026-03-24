import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] flex items-center justify-center text-white"
      style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)' }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-blue-200 text-sm font-semibold tracking-[3px] uppercase mb-4">
          Departamentos y Lofts
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Tu hogar cerca de<br className="hidden md:block" /> la universidad
        </h1>
        <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Departamentos y lofts en venta y renta · Torres Aurum, Perseo &amp; Maya
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-[#1e3a5f] hover:bg-blue-50 font-bold text-base px-8"
          >
            <a href="#propiedades">Ver Propiedades</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white text-white bg-transparent hover:bg-white/10 text-base px-8"
          >
            <a href="#contacto">Contáctanos</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
