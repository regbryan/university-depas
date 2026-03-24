'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { amenities } from '@/data/amenities'

const gymPhotos = [
  { src: '/images/Gym.jpg', alt: 'Gimnasio equipado' },
  { src: '/images/Fitness.jpg', alt: 'Área de fitness' },
  { src: '/images/Treadmills.jpg', alt: 'Cardio — caminadoras' },
  { src: '/images/Benchpress.jpg', alt: 'Pesas libres' },
  { src: '/images/BoxingGym.jpg', alt: 'Zona de boxeo' },
  { src: '/images/Spinningclass.jpg', alt: 'Clase de spinning' },
]

export function Amenities() {
  const pillsRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = pillsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="amenidades" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#2563eb] text-xs font-bold tracking-[4px] uppercase mb-3">
            Todo lo que necesitas
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f]">Amenidades</h2>
        </div>

        {/* Gym photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-14">
          {gymPhotos.map((photo, i) => (
            <div
              key={photo.src}
              className={`relative overflow-hidden rounded-xl bg-slate-200 ${
                i === 0 ? 'col-span-2 md:col-span-1 row-span-2' : ''
              }`}
              style={{ aspectRatio: i === 0 ? '4/5' : '4/3' }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        {/* Pill badges — staggered reveal */}
        <div ref={pillsRef} className="flex flex-wrap justify-center gap-3">
          {amenities.map((a, i) => (
            <div
              key={a.label}
              className={`flex items-center gap-2 bg-white border border-slate-200 rounded-full px-5 py-2.5 text-slate-700 font-medium shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#2563eb] ${
                visible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="text-xl" aria-hidden="true">{a.emoji}</span>
              <span className="text-sm">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
