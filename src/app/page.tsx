import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { PropertyCarousel } from '@/components/property-carousel'
import { Amenities } from '@/components/amenities'
import { Location } from '@/components/location'
import { Schedule } from '@/components/schedule'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main aria-label="University Depas">
      <Nav />
      <Hero />
      <PropertyCarousel />
      <Amenities />
      <Location />
      <Schedule />
      <Contact />
      <Footer />
    </main>
  )
}
