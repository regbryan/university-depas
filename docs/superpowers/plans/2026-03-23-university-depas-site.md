# University Depas Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page Next.js marketing website for University Depas with property carousel, Calendly scheduling, and a contact form that notifies via email (Resend) and WhatsApp (CallMeBot).

**Architecture:** Single Next.js App Router page (`app/page.tsx`) assembles nine section components top-to-bottom. All property and amenity content lives in typed data files (`src/data/`). The contact form posts to a Next.js API route that triggers Resend email and CallMeBot WhatsApp notification. Calendly is embedded via `@calendly/react-calendly`.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS, shadcn/ui, Embla Carousel, Resend, CallMeBot, `@calendly/react-calendly`, Vitest + React Testing Library

---

## File Map

| File | Responsibility |
|------|---------------|
| `src/app/layout.tsx` | Root layout: Geist font, metadata, `<html>` shell |
| `src/app/globals.css` | Tailwind base + CSS variables |
| `src/app/page.tsx` | Page assembly — renders all section components |
| `src/app/api/contact/route.ts` | POST handler: validates input, calls contact lib |
| `src/lib/contact.ts` | `sendEmail()` via Resend + `sendWhatsApp()` via CallMeBot |
| `src/data/properties.ts` | `Property` type + exported array of property objects |
| `src/data/amenities.ts` | `Amenity` type + exported array of amenity objects |
| `src/components/nav.tsx` | Sticky nav bar with smooth-scroll links + mobile hamburger |
| `src/components/hero.tsx` | Full-width gradient hero with headline + CTAs |
| `src/components/property-carousel.tsx` | Embla Carousel showing all properties |
| `src/components/property-types.tsx` | Two-card summary (Departamento / Loft) |
| `src/components/towers.tsx` | Three tower cards (Aurum, Perseo, Maya) |
| `src/components/amenities.tsx` | Icon + label pill grid |
| `src/components/schedule.tsx` | Calendly inline widget + dev fallback |
| `src/components/contact.tsx` | Contact form + direct contact (QR, phones, socials) |
| `src/components/footer.tsx` | Logo, socials, copyright |
| `src/__tests__/contact.test.ts` | Unit tests for `sendEmail` and `sendWhatsApp` |
| `src/__tests__/api-contact.test.ts` | Integration tests for `POST /api/contact` |
| `.env.local.example` | Template of required env vars (committed, no secrets) |

---

## Task 1: Project Bootstrap

**Files:**
- Create: entire Next.js project in the current directory
- Create: `.env.local.example`

- [ ] **Step 1: Scaffold Next.js project**

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-git
```

Accept all defaults. Say **yes** to Turbopack when prompted.

- [ ] **Step 2: Install dependencies**

```bash
npm install embla-carousel-react embla-carousel-autoplay \
  resend \
  @calendly/react-calendly \
  lucide-react \
  clsx tailwind-merge
```

- [ ] **Step 3: Install shadcn/ui**

```bash
npx shadcn@latest init
```

When prompted, choose:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**

Then add the components we need:

```bash
npx shadcn@latest add button input textarea label select sheet
```

- [ ] **Step 4: Install Vitest + React Testing Library**

```bash
npm install -D vitest @vitejs/plugin-react \
  @testing-library/react @testing-library/jest-dom \
  @testing-library/user-event jsdom
```

- [ ] **Step 5: Configure Vitest**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

Create `src/__tests__/setup.ts`:

```ts
import '@testing-library/jest-dom'
```

Add to `package.json` scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 6: Create env var template**

Create `.env.local.example`:

```bash
# Resend — https://resend.com
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_TO_EMAIL=yenifer@example.com

# CallMeBot — https://www.callmebot.com/blog/free-api-whatsapp-messages/
# One-time setup: send "I allow callmebot to send me messages" to +34 644 597 845 on WhatsApp
CALLMEBOT_PHONE=521XXXXXXXXXX
CALLMEBOT_API_KEY=XXXXXXX

# Calendly — paste the full event URL from your Calendly dashboard
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/universitydepas/visita
```

Copy to `.env.local` (not committed):

```bash
cp .env.local.example .env.local
```

- [ ] **Step 7: Verify the project starts**

```bash
npm run dev
```

Expected: Next.js dev server running at http://localhost:3000 with the default Next.js page.

- [ ] **Step 8: Commit**

```bash
git init
git add .
git commit -m "chore: bootstrap Next.js project with Tailwind, shadcn/ui, Embla, Vitest"
```

---

## Task 2: Data Layer

**Files:**
- Create: `src/data/properties.ts`
- Create: `src/data/amenities.ts`

- [ ] **Step 1: Write failing test for property data shape**

Create `src/__tests__/data.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { properties } from '@/data/properties'
import { amenities } from '@/data/amenities'

describe('properties data', () => {
  it('exports a non-empty array', () => {
    expect(properties.length).toBeGreaterThan(0)
  })

  it('every property has required fields', () => {
    for (const p of properties) {
      expect(p.id).toBeTruthy()
      expect(['Aurum', 'Perseo', 'Maya']).toContain(p.tower)
      expect(['Departamento', 'Loft']).toContain(p.type)
      expect(typeof p.beds).toBe('number')
      expect(typeof p.baths).toBe('number')
      expect(Array.isArray(p.features)).toBe(true)
      // price is string or null
      expect(p.price === null || typeof p.price === 'string').toBe(true)
    }
  })
})

describe('amenities data', () => {
  it('exports a non-empty array', () => {
    expect(amenities.length).toBeGreaterThan(0)
  })

  it('every amenity has label and emoji', () => {
    for (const a of amenities) {
      expect(a.label).toBeTruthy()
      expect(a.emoji).toBeTruthy()
    }
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npm test
```

Expected: FAIL — `Cannot find module '@/data/properties'`

- [ ] **Step 3: Create `src/data/properties.ts`**

```ts
export type Property = {
  id: string
  tower: 'Aurum' | 'Perseo' | 'Maya'
  type: 'Departamento' | 'Loft'
  image: string
  beds: number
  baths: number
  features: string[]
  price: string | null
}

export const properties: Property[] = [
  {
    id: 'aurum-depa-1',
    tower: 'Aurum',
    type: 'Departamento',
    image: '/images/placeholder.jpg',
    beds: 3,
    baths: 2,
    features: ['Cocina equipada', 'Cuarto de servicio', 'Estacionamiento'],
    price: 'Desde $1,400,000 MXN',
  },
  {
    id: 'aurum-loft-1',
    tower: 'Aurum',
    type: 'Loft',
    image: '/images/placeholder.jpg',
    beds: 1,
    baths: 1,
    features: ['Sala-comedor integrado'],
    price: null,
  },
  {
    id: 'perseo-depa-1',
    tower: 'Perseo',
    type: 'Departamento',
    image: '/images/placeholder.jpg',
    beds: 3,
    baths: 2,
    features: ['Cocina equipada', 'Cuarto de servicio', 'Estacionamiento'],
    price: 'Desde $1,400,000 MXN',
  },
  {
    id: 'perseo-loft-1',
    tower: 'Perseo',
    type: 'Loft',
    image: '/images/placeholder.jpg',
    beds: 1,
    baths: 1,
    features: ['Sala-comedor integrado'],
    price: null,
  },
  {
    id: 'maya-depa-1',
    tower: 'Maya',
    type: 'Departamento',
    image: '/images/placeholder.jpg',
    beds: 3,
    baths: 2,
    features: ['Cocina equipada', 'Cuarto de servicio', 'Estacionamiento'],
    price: 'Desde $1,400,000 MXN',
  },
  {
    id: 'maya-loft-1',
    tower: 'Maya',
    type: 'Loft',
    image: '/images/placeholder.jpg',
    beds: 1,
    baths: 1,
    features: ['Sala-comedor integrado'],
    price: null,
  },
]
```

- [ ] **Step 4: Create `src/data/amenities.ts`**

```ts
export type Amenity = {
  emoji: string
  label: string
}

export const amenities: Amenity[] = [
  { emoji: '🏊', label: 'Alberca' },
  { emoji: '🏋️', label: 'Gimnasio' },
  { emoji: '🅿️', label: 'Estacionamiento' },
  { emoji: '🛡️', label: 'Seguridad 24/7' },
  { emoji: '📶', label: 'WiFi' },
]
```

- [ ] **Step 5: Add a placeholder image**

```bash
mkdir -p public/images
```

Download or copy any grey placeholder image to `public/images/placeholder.jpg`. You can generate one:

```bash
# Using ImageMagick if available:
convert -size 800x500 xc:#cbd5e1 public/images/placeholder.jpg
# Or just copy any JPG there — it's temporary until client provides real photos
```

- [ ] **Step 6: Run tests — expect PASS**

```bash
npm test
```

Expected: PASS — all data shape tests green.

- [ ] **Step 7: Commit**

```bash
git add src/data/ src/__tests__/data.test.ts public/images/
git commit -m "feat: add typed property and amenity data with placeholder images"
```

---

## Task 3: Contact Library + API Route

**Files:**
- Create: `src/lib/contact.ts`
- Create: `src/app/api/contact/route.ts`
- Create: `src/__tests__/contact.test.ts`
- Create: `src/__tests__/api-contact.test.ts`

- [ ] **Step 1: Write failing unit tests for contact library**

Create `src/__tests__/contact.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Resend before importing contact lib
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ data: { id: 'test-id' }, error: null }),
    },
  })),
}))

// Mock fetch for CallMeBot
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

import { sendEmail, sendWhatsApp } from '@/lib/contact'

beforeEach(() => {
  vi.clearAllMocks()
  mockFetch.mockResolvedValue({ ok: true })
  process.env.RESEND_API_KEY = 'test-key'
  process.env.RESEND_TO_EMAIL = 'test@example.com'
  process.env.CALLMEBOT_PHONE = '521XXXXXXXXXX'
  process.env.CALLMEBOT_API_KEY = '123456'
})

describe('sendEmail', () => {
  it('sends an email with form data', async () => {
    const result = await sendEmail({
      nombre: 'Juan',
      telefono: '2211234567',
      correo: 'juan@example.com',
      propiedad: 'Departamento',
      mensaje: 'Me interesa',
    })
    expect(result).toBe(true)
  })

  it('returns false if Resend returns an error', async () => {
    const { Resend } = await import('resend')
    vi.mocked(Resend).mockImplementationOnce(() => ({
      emails: {
        send: vi.fn().mockResolvedValue({ data: null, error: { message: 'fail' } }),
      },
    }) as any)
    const result = await sendEmail({
      nombre: 'Juan',
      telefono: '2211234567',
      correo: 'juan@example.com',
      propiedad: 'Loft',
      mensaje: '',
    })
    expect(result).toBe(false)
  })
})

describe('sendWhatsApp', () => {
  it('calls CallMeBot API with encoded message', async () => {
    await sendWhatsApp('Juan', 'Departamento')
    expect(mockFetch).toHaveBeenCalledOnce()
    const url = mockFetch.mock.calls[0][0] as string
    expect(url).toContain('api.callmebot.com')
    expect(url).toContain('521XXXXXXXXXX')
  })

  it('does not throw if CallMeBot fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('network error'))
    await expect(sendWhatsApp('Juan', 'Loft')).resolves.not.toThrow()
  })
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npm test src/__tests__/contact.test.ts
```

Expected: FAIL — `Cannot find module '@/lib/contact'`

- [ ] **Step 3: Create `src/lib/contact.ts`**

```ts
import { Resend } from 'resend'

type ContactFormData = {
  nombre: string
  telefono: string
  correo: string
  propiedad: string
  mensaje: string
}

export async function sendEmail(data: ContactFormData): Promise<boolean> {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: 'University Depas <noreply@universitydepas.com>',
    to: process.env.RESEND_TO_EMAIL!,
    subject: `Nueva consulta — ${data.propiedad}`,
    html: `
      <h2>Nueva consulta desde el sitio web</h2>
      <p><strong>Nombre:</strong> ${data.nombre}</p>
      <p><strong>Teléfono:</strong> ${data.telefono}</p>
      <p><strong>Correo:</strong> ${data.correo}</p>
      <p><strong>Propiedad de interés:</strong> ${data.propiedad}</p>
      <p><strong>Mensaje:</strong> ${data.mensaje || '(sin mensaje)'}</p>
    `,
  })
  return error === null
}

export async function sendWhatsApp(nombre: string, propiedad: string): Promise<void> {
  const phone = process.env.CALLMEBOT_PHONE
  const apiKey = process.env.CALLMEBOT_API_KEY
  const message = encodeURIComponent(
    `Nueva consulta en University Depas!\nNombre: ${nombre}\nPropiedad: ${propiedad}`
  )
  try {
    await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${message}&apikey=${apiKey}`
    )
  } catch {
    // WhatsApp notification is best-effort — never throw
  }
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test src/__tests__/contact.test.ts
```

Expected: PASS — all contact library tests green.

- [ ] **Step 5: Write failing API route tests**

Create `src/__tests__/api-contact.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import { POST } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'

vi.mock('@/lib/contact', () => ({
  sendEmail: vi.fn().mockResolvedValue(true),
  sendWhatsApp: vi.fn().mockResolvedValue(undefined),
}))

function makeRequest(body: object) {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('POST /api/contact', () => {
  it('returns 200 on valid submission', async () => {
    const req = makeRequest({
      nombre: 'Ana',
      telefono: '2211234567',
      correo: 'ana@example.com',
      propiedad: 'Departamento',
      mensaje: 'Hola',
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
  })

  it('returns 400 when required fields are missing', async () => {
    const req = makeRequest({ nombre: 'Ana' })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 500 when email sending fails', async () => {
    const { sendEmail } = await import('@/lib/contact')
    vi.mocked(sendEmail).mockResolvedValueOnce(false)
    const req = makeRequest({
      nombre: 'Ana',
      telefono: '2211234567',
      correo: 'ana@example.com',
      propiedad: 'Loft',
      mensaje: '',
    })
    const res = await POST(req)
    expect(res.status).toBe(500)
  })

  it('still returns 200 when WhatsApp fails', async () => {
    const { sendWhatsApp } = await import('@/lib/contact')
    vi.mocked(sendWhatsApp).mockRejectedValueOnce(new Error('wa fail'))
    const req = makeRequest({
      nombre: 'Ana',
      telefono: '2211234567',
      correo: 'ana@example.com',
      propiedad: 'Departamento',
      mensaje: '',
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
  })
})
```

- [ ] **Step 6: Run tests — expect FAIL**

```bash
npm test src/__tests__/api-contact.test.ts
```

Expected: FAIL — `Cannot find module '@/app/api/contact/route'`

- [ ] **Step 7: Create `src/app/api/contact/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, sendWhatsApp } from '@/lib/contact'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { nombre, telefono, correo, propiedad, mensaje } = body

  if (!nombre || !telefono || !correo || !propiedad) {
    return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 })
  }

  const emailSent = await sendEmail({ nombre, telefono, correo, propiedad, mensaje: mensaje ?? '' })

  if (!emailSent) {
    return NextResponse.json({ error: 'Error al enviar el correo' }, { status: 500 })
  }

  // Best-effort WhatsApp — never blocks a 200 response
  sendWhatsApp(nombre, propiedad).catch(() => {})

  return NextResponse.json({ success: true }, { status: 200 })
}
```

- [ ] **Step 8: Run all tests — expect PASS**

```bash
npm test
```

Expected: PASS — all tests green (data + contact + API route).

- [ ] **Step 9: Commit**

```bash
git add src/lib/ src/app/api/ src/__tests__/
git commit -m "feat: add contact library and API route with Resend + CallMeBot"
```

---

## Task 4: Layout + Global Styles

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  title: 'University Depas — Departamentos y Lofts',
  description:
    'Departamentos y lofts en venta y renta cerca de la universidad. Torres Aurum, Perseo y Maya.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={GeistSans.variable}>
      <body className="bg-white text-slate-900 antialiased">{children}</body>
    </html>
  )
}
```

Install geist font package if not already present:

```bash
npm install geist
```

- [ ] **Step 2: Update `src/app/globals.css`**

Keep the existing Tailwind directives. Add these CSS variables after them:

```css
@layer base {
  :root {
    --navy: #1e3a5f;
    --blue: #2563eb;
    --light: #f8fafc;
  }

  html {
    scroll-behavior: smooth;
  }
}
```

- [ ] **Step 3: Verify dev server still starts**

```bash
npm run dev
```

Expected: No errors, page loads at http://localhost:3000.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: configure layout with Geist font, metadata, smooth scroll"
```

---

## Task 5: Navigation Component

**Files:**
- Create: `src/components/nav.tsx`

- [ ] **Step 1: Create `src/components/nav.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Propiedades', href: '#propiedades' },
  { label: 'Torres', href: '#torres' },
  { label: 'Amenidades', href: '#amenidades' },
  { label: 'Agendar Cita', href: '#agendar' },
  { label: 'Contacto', href: '#contacto' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#inicio" className="font-bold text-lg tracking-wide text-[#1e3a5f]">
          UNIVERSITY DEPAS
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-600 hover:text-[#2563eb] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <nav className="flex flex-col gap-4 mt-8">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-slate-700 hover:text-[#2563eb] transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Add Nav to `src/app/page.tsx`**

Replace the default page content:

```tsx
import { Nav } from '@/components/nav'

export default function Home() {
  return (
    <main>
      <Nav />
      <div className="h-screen flex items-center justify-center text-slate-400">
        Sections coming soon...
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Expected: Sticky nav bar visible at top. Desktop shows all links. Mobile shows hamburger that opens a side drawer.

- [ ] **Step 4: Commit**

```bash
git add src/components/nav.tsx src/app/page.tsx
git commit -m "feat: add sticky navigation with mobile hamburger drawer"
```

---

## Task 6: Hero Section

**Files:**
- Create: `src/components/hero.tsx`

- [ ] **Step 1: Create `src/components/hero.tsx`**

```tsx
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
            className="border-white text-white hover:bg-white/10 text-base px-8"
          >
            <a href="#contacto">Contáctanos</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add Hero to page**

Update `src/app/page.tsx`:

```tsx
import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser — hero looks correct**

Expected: Full-height gradient section, centered text, two buttons visible.

- [ ] **Step 4: Commit**

```bash
git add src/components/hero.tsx src/app/page.tsx
git commit -m "feat: add hero section with gradient, headline, and CTA buttons"
```

---

## Task 7: Property Carousel

**Files:**
- Create: `src/components/property-carousel.tsx`

- [ ] **Step 1: Create `src/components/property-carousel.tsx`**

```tsx
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
                <div key={p.id} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-3">
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
                      <h3 className="font-bold text-[#1e3a5f] text-lg mb-1">
                        {p.type}
                      </h3>
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

          {/* Arrows */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white border border-slate-200 rounded-full p-2 shadow hover:bg-slate-50 hidden md:block"
          >
            <ChevronLeft className="h-5 w-5 text-slate-600" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border border-slate-200 rounded-full p-2 shadow hover:bg-slate-50 hidden md:block"
          >
            <ChevronRight className="h-5 w-5 text-slate-600" />
          </button>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page**

Update `src/app/page.tsx`:

```tsx
import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { PropertyCarousel } from '@/components/property-carousel'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <PropertyCarousel />
    </main>
  )
}
```

- [ ] **Step 3: Verify carousel in browser**

Expected: Property cards slide automatically every 4 seconds. Arrows work on desktop. Cards show tower badge, type, bed/bath icons, features, price (or "Consultar precio" for Lofts).

- [ ] **Step 4: Commit**

```bash
git add src/components/property-carousel.tsx src/app/page.tsx
git commit -m "feat: add auto-playing property carousel with Embla"
```

---

## Task 8: Property Types + Towers Sections

**Files:**
- Create: `src/components/property-types.tsx`
- Create: `src/components/towers.tsx`

- [ ] **Step 1: Create `src/components/property-types.tsx`**

```tsx
import { Home, Building2 } from 'lucide-react'

const types = [
  {
    icon: Home,
    name: 'Departamento',
    features: ['3 recámaras', '2 baños', 'Sala-comedor', 'Cocina equipada', 'Cuarto de servicio', 'Estacionamiento'],
    price: 'Desde $1,400,000 MXN',
  },
  {
    icon: Building2,
    name: 'Loft',
    features: ['1 recámara', '1 baño', 'Sala-comedor integrado'],
    price: 'Consultar precio',
  },
]

export function PropertyTypes() {
  return (
    <section id="tipos" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#1e3a5f] text-center mb-10">
          Tipos de Propiedad
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {types.map((t) => (
            <div key={t.name} className="border border-slate-200 rounded-xl p-8">
              <t.icon className="h-8 w-8 text-[#2563eb] mb-4" />
              <h3 className="text-xl font-bold text-[#1e3a5f] mb-4">{t.name}</h3>
              <ul className="space-y-2 mb-6">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-slate-600">
                    <span className="text-[#2563eb] font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <p className="text-2xl font-bold text-[#2563eb]">{t.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/towers.tsx`**

```tsx
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const towers = [
  { name: 'Aurum', description: 'Diseño moderno y acabados de lujo en el corazón de la zona universitaria.' },
  { name: 'Perseo', description: 'Espacios amplios con iluminación natural y vistas privilegiadas.' },
  { name: 'Maya', description: 'Comodidad y seguridad para vivir cerca de tu universidad.' },
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
            <div key={t.name} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
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
```

- [ ] **Step 3: Add both to page**

```tsx
import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { PropertyCarousel } from '@/components/property-carousel'
import { PropertyTypes } from '@/components/property-types'
import { Towers } from '@/components/towers'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <PropertyCarousel />
      <PropertyTypes />
      <Towers />
    </main>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/property-types.tsx src/components/towers.tsx src/app/page.tsx
git commit -m "feat: add property types summary and towers sections"
```

---

## Task 9: Amenities + Schedule Sections

**Files:**
- Create: `src/components/amenities.tsx`
- Create: `src/components/schedule.tsx`

- [ ] **Step 1: Create `src/components/amenities.tsx`**

```tsx
import { amenities } from '@/data/amenities'

export function Amenities() {
  return (
    <section id="amenidades" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-[#1e3a5f] mb-10">Amenidades</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {amenities.map((a) => (
            <div
              key={a.label}
              className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-5 py-2.5 text-slate-700 font-medium"
            >
              <span className="text-xl">{a.emoji}</span>
              <span>{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/schedule.tsx`**

```tsx
'use client'

import { InlineWidget } from '@calendly/react-calendly'

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
```

- [ ] **Step 3: Add both to page**

```tsx
import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { PropertyCarousel } from '@/components/property-carousel'
import { PropertyTypes } from '@/components/property-types'
import { Towers } from '@/components/towers'
import { Amenities } from '@/components/amenities'
import { Schedule } from '@/components/schedule'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <PropertyCarousel />
      <PropertyTypes />
      <Towers />
      <Amenities />
      <Schedule />
    </main>
  )
}
```

- [ ] **Step 4: Verify in browser**

Expected:
- Amenities shows pill-style badges with emojis
- Schedule shows the Calendly widget if `NEXT_PUBLIC_CALENDLY_URL` is set, or a dashed placeholder box if not

- [ ] **Step 5: Commit**

```bash
git add src/components/amenities.tsx src/components/schedule.tsx src/app/page.tsx
git commit -m "feat: add amenities grid and Calendly scheduling section"
```

---

## Task 10: Contact Section

**Files:**
- Create: `src/components/contact.tsx`

- [ ] **Step 1: Create `src/components/contact.tsx`**

```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Facebook, Instagram } from 'lucide-react'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [propiedad, setPropiedad] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const data = {
      nombre: (form.elements.namedItem('nombre') as HTMLInputElement).value,
      telefono: (form.elements.namedItem('telefono') as HTMLInputElement).value,
      correo: (form.elements.namedItem('correo') as HTMLInputElement).value,
      propiedad,
      mensaje: (form.elements.namedItem('mensaje') as HTMLTextAreaElement).value,
    }
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setStatus(res.ok ? 'success' : 'error')
  }

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#1e3a5f] text-center mb-10">Contáctanos</h2>

        <div className="grid md:grid-cols-[1fr_280px] gap-10">
          {/* Contact form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nombre">Nombre *</Label>
              <Input id="nombre" name="nombre" required placeholder="Tu nombre completo" />
            </div>
            <div>
              <Label htmlFor="telefono">Teléfono *</Label>
              <Input id="telefono" name="telefono" required placeholder="Tu número de teléfono" />
            </div>
            <div>
              <Label htmlFor="correo">Correo electrónico *</Label>
              <Input id="correo" name="correo" type="email" required placeholder="tu@correo.com" />
            </div>
            <div>
              <Label>Propiedad de interés *</Label>
              <Select onValueChange={setPropiedad} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Departamento">Departamento</SelectItem>
                  <SelectItem value="Loft">Loft</SelectItem>
                  <SelectItem value="No estoy seguro">No estoy seguro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mensaje">Mensaje</Label>
              <Textarea id="mensaje" name="mensaje" placeholder="¿Tienes alguna pregunta?" rows={4} />
            </div>

            {status === 'success' && (
              <p className="text-green-600 font-medium">
                ¡Mensaje enviado! Te contactaremos pronto.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-500">
                Ocurrió un error. Por favor intenta de nuevo o llámanos directamente.
              </p>
            )}

            <Button
              type="submit"
              disabled={status === 'loading' || !propiedad}
              className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white"
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
            </Button>
          </form>

          {/* Direct contact */}
          <div className="space-y-6">
            {/* WhatsApp QR */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
              <p className="text-green-700 font-semibold text-sm mb-3">📱 WhatsApp</p>
              {/* Replace src with actual QR code image once client provides WhatsApp number */}
              <div className="w-24 h-24 bg-slate-200 rounded mx-auto mb-3 flex items-center justify-center text-xs text-slate-400">
                QR Code
              </div>
              <p className="text-slate-500 text-xs mb-3">Escanea para chatear</p>
              <Button asChild size="sm" className="bg-green-600 hover:bg-green-700 w-full">
                <a href="https://wa.me/521XXXXXXXXXX" target="_blank" rel="noreferrer">
                  Abrir WhatsApp
                </a>
              </Button>
            </div>

            {/* Phones */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">Teléfonos</p>
              <p className="text-slate-600 text-sm">Karla Moro: <a href="tel:2212664467" className="text-[#2563eb]">2212664467</a></p>
              <p className="text-slate-600 text-sm">Maylu Gil: <a href="tel:2224941383" className="text-[#2563eb]">2224941383</a></p>
            </div>

            {/* Social */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">Redes sociales</p>
              <div className="space-y-2">
                <a href="https://facebook.com/UniversityDepasOficial" target="_blank" rel="noreferrer"
                   className="flex items-center gap-2 text-slate-600 text-sm hover:text-[#2563eb]">
                  <Facebook className="h-4 w-4" /> University Depas Oficial
                </a>
                <a href="https://instagram.com/university_depass" target="_blank" rel="noreferrer"
                   className="flex items-center gap-2 text-slate-600 text-sm hover:text-[#2563eb]">
                  <Instagram className="h-4 w-4" /> @university_depass
                </a>
                <a href="https://tiktok.com/@universitydepas" target="_blank" rel="noreferrer"
                   className="flex items-center gap-2 text-slate-600 text-sm hover:text-[#2563eb]">
                  <span className="h-4 w-4 text-center text-xs font-bold">TK</span> @universitydepas
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to page**

```tsx
import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { PropertyCarousel } from '@/components/property-carousel'
import { PropertyTypes } from '@/components/property-types'
import { Towers } from '@/components/towers'
import { Amenities } from '@/components/amenities'
import { Schedule } from '@/components/schedule'
import { Contact } from '@/components/contact'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <PropertyCarousel />
      <PropertyTypes />
      <Towers />
      <Amenities />
      <Schedule />
      <Contact />
    </main>
  )
}
```

- [ ] **Step 3: Verify form in browser**

Expected: Form renders all fields. Submit button disabled until property type is selected. Fill all fields and submit — check browser network tab for POST to `/api/contact`. With real env vars set, email and WhatsApp notification should arrive.

- [ ] **Step 4: Commit**

```bash
git add src/components/contact.tsx src/app/page.tsx
git commit -m "feat: add contact section with form, WhatsApp QR, phones, and social links"
```

---

## Task 11: Footer

**Files:**
- Create: `src/components/footer.tsx`

- [ ] **Step 1: Create `src/components/footer.tsx`**

```tsx
import { Facebook, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-white py-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="font-bold text-xl tracking-wide mb-1">UNIVERSITY DEPAS</p>
        <p className="text-blue-300 text-sm mb-6">Tu hogar, nuestra misión.</p>
        <div className="flex justify-center gap-5 mb-6">
          <a href="https://facebook.com/UniversityDepasOficial" target="_blank" rel="noreferrer"
             className="text-blue-200 hover:text-white transition-colors">
            <Facebook className="h-5 w-5" />
          </a>
          <a href="https://instagram.com/university_depass" target="_blank" rel="noreferrer"
             className="text-blue-200 hover:text-white transition-colors">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="https://tiktok.com/@universitydepas" target="_blank" rel="noreferrer"
             className="text-blue-200 hover:text-white transition-colors text-xs font-bold flex items-center">
            TK
          </a>
        </div>
        <p className="text-blue-400 text-xs">
          © {new Date().getFullYear()} University Depas. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Add to page — final assembly**

```tsx
import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { PropertyCarousel } from '@/components/property-carousel'
import { PropertyTypes } from '@/components/property-types'
import { Towers } from '@/components/towers'
import { Amenities } from '@/components/amenities'
import { Schedule } from '@/components/schedule'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <PropertyCarousel />
      <PropertyTypes />
      <Towers />
      <Amenities />
      <Schedule />
      <Contact />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 3: Run all tests**

```bash
npm test
```

Expected: All tests pass.

- [ ] **Step 4: Final visual check in browser**

Scroll through the entire page and verify:
- [ ] Nav scrolls smoothly to each section
- [ ] Hero CTA buttons scroll correctly
- [ ] Carousel auto-plays and arrows work
- [ ] "Ver disponibilidad" on tower cards scrolls to `#agendar`
- [ ] Contact form shows success/error state
- [ ] No layout breaks on mobile (use browser DevTools → mobile view)

- [ ] **Step 5: Commit**

```bash
git add src/components/footer.tsx src/app/page.tsx
git commit -m "feat: add footer and complete page assembly"
```

---

## Task 12: Deploy to Vercel

- [ ] **Step 1: Create a Vercel account** (if not already done) at https://vercel.com

- [ ] **Step 2: Push project to GitHub**

```bash
# Create a new repo at github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/university-depas.git
git push -u origin main
```

- [ ] **Step 3: Import project in Vercel**

1. Go to https://vercel.com/new
2. Import the GitHub repo
3. Framework preset: **Next.js** (auto-detected)
4. Click **Deploy** — first deploy uses no env vars (Calendly widget shows placeholder, contact form returns 500 until env vars are added)

- [ ] **Step 4: Add environment variables in Vercel dashboard**

Go to Project → Settings → Environment Variables and add:

```
RESEND_API_KEY
RESEND_TO_EMAIL
CALLMEBOT_PHONE
CALLMEBOT_API_KEY
NEXT_PUBLIC_CALENDLY_URL
```

- [ ] **Step 5: Redeploy**

```bash
# Trigger a redeploy by pushing an empty commit or clicking "Redeploy" in Vercel dashboard
git commit --allow-empty -m "chore: trigger redeploy with env vars"
git push
```

- [ ] **Step 6: Verify production site**

Open the Vercel URL (e.g., `universitydepas.vercel.app`) and:
- [ ] Submit the contact form → verify email arrives at `RESEND_TO_EMAIL`
- [ ] Submit the form → verify WhatsApp message arrives
- [ ] Calendly widget loads (if URL configured)
- [ ] Site is fully responsive on mobile

---

## Done

The site is live. Share the Vercel URL with the client. When they have real photos and content, they update `src/data/properties.ts`, `src/data/amenities.ts`, and `public/images/`, then push to `main` to redeploy automatically.
