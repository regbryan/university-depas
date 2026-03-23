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
