import Image from 'next/image'
import { Phone } from 'lucide-react'

const advisors = [
  {
    name: 'Jennifer Ordonez',
    title: 'Asesora de Ventas',
    phone: '2225473035',
    phoneFormatted: '222 547 3035',
    image: '/images/jennifer.jpg',
  },
]

export function Team() {
  return (
    <section id="asesores" className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">

        <div className="text-center mb-12">
          <p className="text-[#2563eb] text-xs font-bold tracking-[4px] uppercase mb-3">
            Estamos para ti
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-3">
            Conoce a tus Asesoras
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Expertas en University Depas — te guiamos en cada paso del proceso.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {advisors.map((a) => (
            <div
              key={a.name}
              className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-sm border border-slate-200 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              {/* Headshot */}
              <div className="relative w-28 h-28 rounded-full overflow-hidden bg-slate-200 mb-5 ring-4 ring-[#2563eb]/10">
                <Image
                  src={a.image}
                  alt={a.name}
                  fill
                  className="object-cover object-top"
                  onError={undefined}
                />
                {/* Fallback initials shown via CSS if image missing */}
              </div>

              {/* Info */}
              <h3 className="text-[#1e3a5f] font-bold text-lg mb-0.5">{a.name}</h3>
              <p className="text-slate-400 text-sm mb-5">{a.title}</p>

              {/* CTA */}
              <a
                href={`tel:${a.phone}`}
                className="inline-flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#2563eb] text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
              >
                <Phone className="h-4 w-4" />
                {a.phoneFormatted}
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
