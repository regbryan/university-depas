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
