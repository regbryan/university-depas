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
