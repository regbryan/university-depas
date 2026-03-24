'use client'

import { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, Bed, Bath } from 'lucide-react'
import Image from 'next/image'
import { properties } from '@/data/properties'
import type { Property } from '@/data/properties'
import { Button } from '@/components/ui/button'
import { PropertySheet } from '@/components/property-sheet'

export function PropertyCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })])
  const [selected, setSelected] = useState<Property | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  function openSheet(property: Property) {
    setSelected(property)
    setSheetOpen(true)
  }

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
                  {/* Entire card is clickable */}
                  <button
                    onClick={() => openSheet(p)}
                    className="w-full text-left bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
                  >
                    {/* Image + overlaid badges */}
                    <div className="relative h-52 bg-slate-200 w-full">
                      <Image
                        src={p.image}
                        alt={`Torre ${p.tower} — ${p.type}`}
                        fill
                        className="object-cover"
                      />
                      {/* Frosted listing-type badge — top left */}
                      <span
                        className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-md border ${
                          p.listingType === 'Venta'
                            ? 'bg-white/20 border-white/30 text-white'
                            : 'bg-green-600/80 border-green-400/30 text-white'
                        }`}
                      >
                        {p.listingType}
                      </span>
                      {/* Tower badge — top right */}
                      <span className="absolute top-3 right-3 bg-[#1e3a5f]/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/10">
                        Torre {p.tower}
                      </span>

                      {/* "Ver más" hover overlay */}
                      <div className="absolute inset-0 bg-[#1e3a5f]/0 hover:bg-[#1e3a5f]/30 transition-colors duration-200 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 bg-white text-[#1e3a5f] text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                          Ver detalles
                        </span>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* Price — prominent */}
                      <p className="text-[#2563eb] font-bold text-xl mb-1 tracking-tight">
                        {p.price ?? 'Consultar precio'}
                      </p>

                      {/* Property name */}
                      <h3 className="font-semibold text-[#1e3a5f] text-base mb-3">{p.type}</h3>

                      {/* Features */}
                      <ul className="text-slate-600 text-sm space-y-1 mb-4 flex-1">
                        {p.features.slice(0, 3).map((f) => (
                          <li key={f} className="flex items-center gap-2">
                            <span className="text-[#2563eb]">✓</span> {f}
                          </li>
                        ))}
                        {p.features.length > 3 && (
                          <li className="text-slate-400 text-xs">+{p.features.length - 3} más...</li>
                        )}
                      </ul>

                      {/* Divider */}
                      <div className="border-t border-slate-100 pt-3 mt-auto">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-4 text-slate-500 text-sm">
                            <span className="flex items-center gap-1">
                              <Bed className="h-4 w-4" /> {p.beds} rec.
                            </span>
                            <span className="flex items-center gap-1">
                              <Bath className="h-4 w-4" /> {p.baths} baño{p.baths > 1 ? 's' : ''}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-[#2563eb] underline underline-offset-2">
                            Ver detalles →
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
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

      {/* Property detail sheet */}
      <PropertySheet
        property={selected}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
      />
    </section>
  )
}
