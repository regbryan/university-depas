'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, Bed, Bath } from 'lucide-react'
import Image from 'next/image'
import { properties } from '@/data/properties'
import { Button } from '@/components/ui/button'

export function PropertyCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })])

  return (
    <section id="propiedades" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#1e3a5f] text-center mb-2">
          Nuestras Propiedades
        </h2>
        <p className="text-slate-500 text-center mb-10">
          Encuentra el espacio perfecto para ti
        </p>

        <div className="relative">
          <div className="overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="flex">
              {properties.map((p) => (
                <div
                  key={p.id}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-3"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 h-full flex flex-col">
                    <div className="relative h-52 bg-slate-200">
                      <Image
                        src={p.image}
                        alt={`Torre ${p.tower} — ${p.type}`}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-[#1e3a5f] text-white text-xs font-semibold px-2 py-1 rounded">
                        Torre {p.tower}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-[#1e3a5f] text-lg mb-1">{p.type}</h3>
                      <div className="flex gap-4 text-slate-500 text-sm mb-3">
                        <span className="flex items-center gap-1">
                          <Bed className="h-4 w-4" /> {p.beds} rec.
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="h-4 w-4" /> {p.baths} baño{p.baths > 1 ? 's' : ''}
                        </span>
                      </div>
                      <ul className="text-slate-600 text-sm space-y-1 mb-4 flex-1">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-center gap-2">
                            <span className="text-[#2563eb]">✓</span> {f}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-bold text-[#2563eb]">
                          {p.price ?? 'Consultar precio'}
                        </span>
                        <Button asChild size="sm" variant="outline">
                          <a href="#contacto">Más información</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows — hidden on touch (swipe replaces them) */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white border border-slate-200 rounded-full p-2 shadow hover:bg-slate-50 hidden md:block"
          >
            <ChevronLeft className="h-5 w-5 text-slate-600" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Siguiente"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border border-slate-200 rounded-full p-2 shadow hover:bg-slate-50 hidden md:block"
          >
            <ChevronRight className="h-5 w-5 text-slate-600" />
          </button>
        </div>
      </div>
    </section>
  )
}
