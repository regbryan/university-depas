'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.15 8.15 0 004.77 1.52V6.76a4.85 4.85 0 01-1-.07z" />
    </svg>
  )
}

const navLinks = [
  { label: 'Propiedades', href: '#propiedades' },
  { label: 'Amenidades', href: '#amenidades' },
  { label: 'Contacto', href: '#contacto' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0f2240]/95 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo + wordmark */}
        <a href="#inicio" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/images/UniversityDepasLogo.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            priority
          />
          <span className="text-white font-bold text-sm tracking-widest uppercase hidden sm:block">
            University Depas
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {/* Social icons */}
          <div className="flex items-center gap-3 border-r border-white/20 pr-8">
            <a href="https://facebook.com/UniversityDepasOficial" target="_blank" rel="noreferrer" aria-label="Facebook"
              className="text-white/60 hover:text-white transition-colors">
              <FaFacebook className="h-4 w-4" />
            </a>
            <a href="https://instagram.com/university_depass" target="_blank" rel="noreferrer" aria-label="Instagram"
              className="text-white/60 hover:text-white transition-colors">
              <FaInstagram className="h-4 w-4" />
            </a>
            <a href="https://tiktok.com/@universitydepas" target="_blank" rel="noreferrer" aria-label="TikTok"
              className="text-white/60 hover:text-white transition-colors">
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}
              className="text-sm text-white/80 hover:text-white transition-colors font-medium">
              {l.label}
            </a>
          ))}
          <Button asChild size="sm"
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-5 rounded-lg">
            <a href="#agendar">Agendar Cita</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0f2240]/97 backdrop-blur-md border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-base text-white/80 hover:text-white transition-colors font-medium">
              {l.label}
            </a>
          ))}
          <Button asChild className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold w-full mt-1">
            <a href="#agendar" onClick={() => setOpen(false)}>Agendar Cita</a>
          </Button>
          <div className="flex items-center gap-5 pt-2 border-t border-white/10">
            <a href="https://facebook.com/UniversityDepasOficial" target="_blank" rel="noreferrer"
              aria-label="Facebook" className="text-white/60 hover:text-white transition-colors">
              <FaFacebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com/university_depass" target="_blank" rel="noreferrer"
              aria-label="Instagram" className="text-white/60 hover:text-white transition-colors">
              <FaInstagram className="h-5 w-5" />
            </a>
            <a href="https://tiktok.com/@universitydepas" target="_blank" rel="noreferrer"
              aria-label="TikTok" className="text-white/60 hover:text-white transition-colors">
              <TikTokIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
