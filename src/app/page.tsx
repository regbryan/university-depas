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
    <main aria-label="University Depas">
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
