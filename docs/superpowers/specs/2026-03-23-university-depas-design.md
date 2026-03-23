# University Depas — Website Design Spec
**Date:** 2026-03-23
**Status:** Approved by user

---

## Overview

A modern, single-page marketing website for **University Depas** — a real estate brand offering apartments (departamentos) and lofts for sale and rent across three towers: Torre Aurum, Torre Perseo, and Torre Maya.

The goal is to replace the current outdated Google Sites page with a professional, mobile-friendly site that drives inquiries and appointment bookings.

---

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js (App Router) | Server-side contact form handling, Vercel deployment |
| Styling | Tailwind CSS | Utility-first, easy to maintain |
| UI Components | shadcn/ui | Clean, accessible, professional components |
| Carousel | Embla Carousel | Lightweight, touch-friendly, no jQuery |
| Email notifications | Resend | Reliable transactional email, free tier available |
| WhatsApp notifications | CallMeBot | Free, no Business API account needed |
| Appointment scheduling | Calendly embed (free plan) | Syncs with Google Calendar, zero backend needed |
| Deployment | Vercel (free Hobby plan) | One-click deploy, HTTPS, fast global CDN |

---

## Design Direction

- **Style:** Clean & Professional
- **Background:** White / light gray (`#f8fafc`)
- **Primary color:** Navy blue (`#1e3a5f`)
- **Accent color:** Blue (`#2563eb`)
- **Typography:** Geist Sans (modern, readable)
- **Language:** Spanish throughout
- **Mood:** Trustworthy, modern, aspirational — not flashy

---

## Section Anchors

Each section has a defined `id` for smooth-scroll navigation:

| Section | Anchor ID |
|---------|-----------|
| Hero | `#inicio` |
| Property Carousel | `#propiedades` |
| Property Types | `#tipos` |
| Towers | `#torres` |
| Amenities | `#amenidades` |
| Schedule | `#agendar` |
| Contact | `#contacto` |

---

## Page Structure (Single Page, Top → Bottom)

### 1. Sticky Navigation Bar
- Logo: "UNIVERSITY DEPAS" wordmark (left)
- Nav links (right): Inicio · Propiedades · Torres · Amenidades · Agendar Cita · Contacto
- Each link smooth-scrolls to its anchor ID (see table above)
- Collapses to hamburger menu on mobile (shadcn/ui Sheet component)

### 2. Hero Section (`#inicio`)
- Full-width gradient background (navy `#1e3a5f` → blue `#2563eb`)
- Headline: *"Tu hogar cerca de la universidad"*
- Subheadline: *"Departamentos y lofts en venta y renta · Torres Aurum, Perseo & Maya"*
- Two CTAs:
  - **"Ver Propiedades"** (primary, scrolls to `#propiedades`)
  - **"Contáctanos"** (secondary outline, scrolls to `#contacto`)
- Background: hero image of the property overlaid with gradient (client provides image; placeholder used during development)

### 3. Property Carousel Section (`#propiedades`)
- Section title: "Nuestras Propiedades"
- Auto-playing image carousel built with **Embla Carousel**
- **Data source:** A local TypeScript file `src/data/properties.ts` exports a typed array of property objects. Developers populate this with placeholder data; client updates before launch.
- **Property data shape:**
  ```ts
  type Property = {
    id: string
    tower: 'Aurum' | 'Perseo' | 'Maya'
    type: 'Departamento' | 'Loft'
    image: string        // path under /public/images/
    beds: number
    baths: number
    features: string[]   // e.g. ['Cocina equipada', 'Estacionamiento']
    price: string | null // null = show "Consultar precio"
  }
  ```
- Each slide renders: photo, `"{tower} — {type}"` title, bed/bath icons, feature list, price (or "Consultar precio" if `price` is null), and a "Más información" button (scrolls to `#contacto`)
- Navigation: previous/next arrows + dot indicators
- Touch/swipe support on mobile (Embla handles this)
- Placeholder images used during development (grey rectangles with tower name)

### 4. Property Types Summary Section (`#tipos`)
- Section title: "Tipos de Propiedad"
- Two compact summary cards (high-level overview; carousel above is the main showcase):
  - **Departamento**: 3 recámaras · 2 baños · Sala-comedor · Cocina equipada · Cuarto de servicio · Estacionamiento · Desde $1,400,000 MXN
  - **Loft**: 1 recámara · 1 baño · Sala-comedor integrado · *Consultar precio*

### 5. Our Towers Section (`#torres`)
- Section title: "Nuestras Torres"
- Three cards side by side (stacks vertically on mobile):
  - **Torre Aurum** | **Torre Perseo** | **Torre Maya**
- Each card: photo, tower name, brief description (placeholder text during dev), "Ver disponibilidad" button
- **"Ver disponibilidad" scrolls to `#agendar`** (the Calendly scheduling section)
- Photos provided by client; grey placeholder used during development

### 6. Amenities Section (`#amenidades`)
- Section title: "Amenidades"
- Amenities are **site-wide** (same for all towers) — not per-tower
- Icon + label pill grid (2–3 columns on mobile, 4–5 on desktop)
- Placeholder amenities during development: Alberca 🏊, Gimnasio 🏋️, Estacionamiento 🅿️, Seguridad 24/7 🛡️, WiFi 📶
- Client provides final amenity list before launch; updating `src/data/amenities.ts` is all that's needed

### 7. Schedule Appointment Section (`#agendar`)
- Section title: "Agenda tu Visita"
- Short description: *"¿Quieres conocer nuestras propiedades? Agenda una cita con nosotros — es rápido y sencillo."*
- **Calendly inline widget** embedded via `@calendly/react-calendly` package
- Widget URL stored in env var: `NEXT_PUBLIC_CALENDLY_URL` (e.g., `https://calendly.com/universitydepas/visita`)
- **Development fallback:** If `NEXT_PUBLIC_CALENDLY_URL` is not set, render a placeholder card: *"Calendly widget — configura tu cuenta en calendly.com para activar esta sección."*
- Client setup required before launch:
  1. Create free Calendly account
  2. Connect Google Calendar
  3. Create event type: "Visita a Propiedad — 30 min"
  4. Copy the event URL into the env var

### 8. Contact Section (`#contacto`)
- Section title: "Contáctanos"
- Two-column layout (stacks on mobile — form on top, direct contact below):

  **Left — Contact Form:**
  - Fields: Nombre, Teléfono, Correo electrónico, Propiedad de interés (dropdown: Departamento / Loft / No estoy seguro), Mensaje
  - Submit button: "Enviar mensaje"
  - On submit → POST to `/api/contact` → triggers email + WhatsApp notification
  - Inline success state: *"¡Mensaje enviado! Te contactaremos pronto."*
  - Inline error state: *"Ocurrió un error. Por favor intenta de nuevo o llámanos directamente."*
  - WhatsApp notification failure is silent to the user — email is the primary channel; WhatsApp is best-effort

  **Right — Direct Contact:**
  - WhatsApp QR code image (scannable, links to `wa.me/521XXXXXXXXXX`)
  - "Abrir WhatsApp" button (opens `wa.me/` link in new tab)
  - Phone numbers: Karla Moro · 2212664467 | Maylu Gil · 2224941383
  - Social links: Facebook (University Depas Oficial) · Instagram (@university_depass) · TikTok (@universitydepas)

### 9. Footer
- Logo + tagline: *"Tu hogar, nuestra misión."*
- Social media icon links
- Copyright: © 2026 University Depas. Todos los derechos reservados.

---

## Contact Form — Backend (`/api/contact`)

**Endpoint:** `POST /api/contact`
**Runtime:** Next.js Route Handler (Node.js)

**Flow:**
1. Validate form fields (all required except Mensaje)
2. Send email via **Resend** to the address in `RESEND_TO_EMAIL` env var
3. Send WhatsApp message via **CallMeBot** to the number in `CALLMEBOT_PHONE` env var using API key in `CALLMEBOT_API_KEY`
4. If Resend succeeds → return 200 (WhatsApp failure does not affect response)
5. If Resend fails → return 500

**Required environment variables:**
| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Resend API key (from resend.com dashboard) |
| `RESEND_TO_EMAIL` | Email address to receive form submissions (Yenifer's email — pending) |
| `CALLMEBOT_PHONE` | WhatsApp number for CallMeBot notifications (international format, e.g., `521XXXXXXXXXX`) |
| `CALLMEBOT_API_KEY` | CallMeBot API key (obtained by messaging the CallMeBot bot from the target number) |
| `NEXT_PUBLIC_CALENDLY_URL` | Full Calendly event URL for the scheduling widget |

**CallMeBot setup (one-time):**
1. Add CallMeBot to WhatsApp contacts
2. Send "I allow callmebot to send me messages" to +34 644 597 845
3. Receive API key by WhatsApp
4. Set `CALLMEBOT_PHONE` and `CALLMEBOT_API_KEY` in Vercel env vars

---

## Property Data (`src/data/properties.ts`)

All carousel and listing data lives here. Updating this file is all that's needed to add/edit/remove properties — no code changes elsewhere.

```ts
// Example structure
export const properties: Property[] = [
  {
    id: 'aurum-depa-1',
    tower: 'Aurum',
    type: 'Departamento',
    image: '/images/aurum-depa-1.jpg',
    beds: 3,
    baths: 2,
    features: ['Cocina equipada', 'Cuarto de servicio', 'Estacionamiento'],
    price: '$1,400,000 MXN',
  },
  // ...
]
```

---

## Mobile Behavior

- Full responsive design — single column layout on mobile
- Nav collapses to hamburger menu (shadcn/ui Sheet)
- Carousel remains full-width, arrows hidden on touch (swipe replaces them)
- Tower cards stack vertically
- Contact form goes full-width, direct contact info below
- Calendly widget adapts automatically

---

## Content Needed from Client (Before Launch)

- [ ] Photos of each tower (Aurum, Perseo, Maya) — for carousel and tower cards
- [ ] Hero background image
- [ ] Final amenity list (to replace placeholders in `src/data/amenities.ts`)
- [ ] Loft pricing (or confirm "Consultar precio")
- [ ] Rental pricing details (if different from sale price)
- [ ] Calendly account created + Google Calendar connected + event URL
- [ ] Email address to receive contact form submissions (`RESEND_TO_EMAIL`)
- [ ] WhatsApp number + complete CallMeBot setup (`CALLMEBOT_PHONE`, `CALLMEBOT_API_KEY`)
- [ ] Resend account created (free tier at resend.com) + API key

---

## Out of Scope (v1)

- Admin dashboard to manage properties
- Online payment / reservation deposit
- User accounts / login
- Multiple languages (English)
- Blog or news section
- "Construye tu casa" section (present in current site — excluded unless requested)
- Custom domain setup (Vercel provides a `.vercel.app` URL by default; client connects custom domain independently)

---

## Deployment

- Hosted on **Vercel** (free Hobby plan)
- Default URL: `universitydepas.vercel.app` (or similar auto-generated)
- Custom domain connection: out of scope for v1 — client handles via Vercel dashboard
- Automatic HTTPS
- Deploys automatically on every push to `main` branch
- All env vars set via Vercel dashboard (not committed to git)
