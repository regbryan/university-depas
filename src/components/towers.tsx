import Image from 'next/image'
import { Button } from '@/components/ui/button'

const towers = [
  {
    name: 'Aurum',
    description: 'Diseño moderno y acabados de lujo en el corazón de la zona universitaria.',
  },
  {
    name: 'Perseo',
    description: 'Espacios amplios con iluminación natural y vistas privilegiadas.',
  },
  {
    name: 'Maya',
    description: 'Comodidad y seguridad para vivir cerca de tu universidad.',
  },
]

export function Towers() {
  return (
    <section id="torres" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#1e3a5f] text-center mb-10">
          Nuestras Torres
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {towers.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200"
            >
              <div className="relative h-48 bg-slate-200">
                <Image
                  src="/images/placeholder.jpg"
                  alt={`Torre ${t.name}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">Torre {t.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{t.description}</p>
                <Button asChild className="w-full bg-[#2563eb] hover:bg-[#1d4ed8]">
                  <a href="#agendar">Ver disponibilidad</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
