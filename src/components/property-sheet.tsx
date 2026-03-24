'use client'

import { useEffect, useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { Bed, Bath, Building2, ChevronLeft, ChevronRight, X, MessageCircle, CalendarCheck } from 'lucide-react'
import { PopupButton } from 'react-calendly'
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet'
import type { Property } from '@/data/properties'

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? ''
const WA_NUMBER = '522225473035'

interface Props {
  property: Property | null
  open: boolean
  onClose: () => void
}

export function PropertySheet({ property, open, onClose }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [rootEl, setRootEl] = useState<HTMLElement | null>(null)

  useEffect(() => { setRootEl(document.body) }, [])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  // Reset to first slide when a new property opens
  useEffect(() => {
    if (open && emblaApi) emblaApi.scrollTo(0)
    setSelectedIndex(0)
  }, [open, property, emblaApi])

  if (!property) return null

  const waMessage = encodeURIComponent(
    `Hola Jennifer, me interesa el ${property.type} en Torre ${property.tower} (${property.price}). ¿Podrías darme más información?`
  )
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waMessage}`

  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) onClose() }}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg p-0 overflow-y-auto"
      >
        <SheetTitle className="sr-only">
          {property.type} en Torre {property.tower}
        </SheetTitle>

        {/* Photo carousel */}
        <div className="relative h-72 bg-slate-200 shrink-0">
          <div className="overflow-hidden h-full" ref={emblaRef}>
            <div className="flex h-full">
              {property.images.map((src, i) => (
                <div key={i} className="flex-[0_0_100%] min-w-0 relative h-full">
                  <Image src={src} alt={`Foto ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 z-10 transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Prev / Next */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {property.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => emblaApi?.scrollTo(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === selectedIndex ? 'bg-white w-4' : 'bg-white/50'
                    }`}
                    aria-label={`Foto ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Badges */}
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-md border ${
            property.listingType === 'Venta'
              ? 'bg-white/20 border-white/30 text-white'
              : 'bg-green-600/80 border-green-400/30 text-white'
          }`}>
            {property.listingType}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">

          {/* Price + title */}
          <div>
            <p className="text-2xl font-bold text-[#2563eb] tracking-tight">
              {property.price ?? 'Consultar precio'}
            </p>
            <h2 className="text-lg font-semibold text-[#1e3a5f] mt-0.5">
              {property.type} — Torre {property.tower}
            </h2>
          </div>

          {/* Specs row */}
          <div className="flex gap-5 text-sm text-slate-600 border-y border-slate-100 py-4">
            <span className="flex items-center gap-1.5">
              <Bed className="h-4 w-4 text-[#2563eb]" />
              {property.beds} recámara{property.beds > 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="h-4 w-4 text-[#2563eb]" />
              {property.baths} baño{property.baths > 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4 text-[#2563eb]" />
              Torre {property.tower}
            </span>
          </div>

          {/* Description */}
          {property.description && (
            <p className="text-slate-600 text-sm leading-relaxed">
              {property.description}
            </p>
          )}

          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold text-[#1e3a5f] mb-2 uppercase tracking-wide">
              Características
            </h3>
            <ul className="grid grid-cols-2 gap-1.5">
              {property.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-[#2563eb] mt-0.5 shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* CTAs */}
          <div className="space-y-3 pt-2">
            {CALENDLY_URL && rootEl ? (
              <PopupButton
                url={CALENDLY_URL}
                rootElement={rootEl}
                text="Agendar visita"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors cursor-pointer"
              />
            ) : null}

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1ebe5d] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Consultar por WhatsApp
            </a>

            <a
              href="tel:2225473035"
              className="w-full inline-flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium px-6 py-3 rounded-lg text-sm transition-colors"
            >
              <CalendarCheck className="h-4 w-4" />
              Llamar a Jennifer · 222 547 3035
            </a>
          </div>
        </div>

      </SheetContent>
    </Sheet>
  )
}
