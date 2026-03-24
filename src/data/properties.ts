export type Property = {
  id: string
  tower: 'Aurum' | 'Perseo' | 'Maya'
  type: 'Departamento' | 'Loft'
  listingType: 'Venta' | 'Renta'
  image: string
  images: string[]
  beds: number
  baths: number
  features: string[]
  price: string | null
  description?: string
}

export const properties: Property[] = [
  {
    id: 'aurum-depa-1',
    tower: 'Aurum',
    type: 'Departamento',
    listingType: 'Venta',
    image: '/images/depa-1.jpg',
    images: ['/images/depa-1.jpg', '/images/depa-2.jpg', '/images/depa-3.jpg', '/images/depa-4.jpg'],
    beds: 3,
    baths: 2,
    features: ['Cocina equipada', 'Cuarto de servicio', 'Cajón de estacionamiento', 'Sala-comedor', '2 baños completos'],
    price: 'Desde $1,400,000 MXN',
    description: 'Amplio departamento de 3 recámaras con acabados de lujo, cocina equipada y vista privilegiada. Ideal para familias que buscan comodidad y exclusividad cerca de la universidad.',
  },
  {
    id: 'aurum-loft-1',
    tower: 'Aurum',
    type: 'Loft',
    listingType: 'Renta',
    image: '/images/loft-1.jpg',
    images: ['/images/loft-1.jpg', '/images/loft-2.jpg', '/images/loft-3.jpg'],
    beds: 1,
    baths: 1,
    features: ['Sala-comedor integrado', 'Acabados modernos', 'Luz natural', 'Área de trabajo'],
    price: 'Desde $7,500/mes',
    description: 'Loft moderno de concepto abierto con diseño contemporáneo. Perfecto para estudiantes y profesionistas que buscan un espacio funcional y estiloso.',
  },
  {
    id: 'perseo-depa-1',
    tower: 'Perseo',
    type: 'Departamento',
    listingType: 'Venta',
    image: '/images/depa-2.jpg',
    images: ['/images/depa-2.jpg', '/images/depa-5.jpg', '/images/depa-6.jpg', '/images/depa-1.jpg'],
    beds: 3,
    baths: 2,
    features: ['Cocina equipada', 'Cuarto de servicio', 'Cajón de estacionamiento', 'Sala-comedor', '2 baños completos'],
    price: 'Desde $1,400,000 MXN',
    description: 'Departamento en Torre Perseo con excelente distribución y acabados de primera. A pasos de la BUAP y principales avenidas de la ciudad.',
  },
  {
    id: 'perseo-loft-1',
    tower: 'Perseo',
    type: 'Loft',
    listingType: 'Renta',
    image: '/images/loft-2.jpg',
    images: ['/images/loft-2.jpg', '/images/loft-4.jpg', '/images/loft-1.jpg'],
    beds: 1,
    baths: 1,
    features: ['Sala-comedor integrado', 'Acabados modernos', 'Luz natural', 'Área de trabajo'],
    price: 'Desde $7,500/mes',
    description: 'Loft de renta en Torre Perseo, ideal para estudiantes universitarios. Diseño moderno, espacios optimizados y ubicación inmejorable.',
  },
  {
    id: 'maya-depa-1',
    tower: 'Maya',
    type: 'Departamento',
    listingType: 'Venta',
    image: '/images/depa-3.jpg',
    images: ['/images/depa-3.jpg', '/images/depa-4.jpg', '/images/depa-5.jpg', '/images/depa-6.jpg'],
    beds: 3,
    baths: 2,
    features: ['Cocina equipada', 'Cuarto de servicio', 'Cajón de estacionamiento', 'Sala-comedor', '2 baños completos'],
    price: 'Desde $1,400,000 MXN',
    description: 'Departamento en la exclusiva Torre Maya. Espacios amplios y luminosos con los mejores acabados del desarrollo. Una inversión segura en el corazón universitario de Puebla.',
  },
  {
    id: 'maya-loft-1',
    tower: 'Maya',
    type: 'Loft',
    listingType: 'Renta',
    image: '/images/loft-3.jpg',
    images: ['/images/loft-3.jpg', '/images/loft-4.jpg', '/images/loft-2.jpg'],
    beds: 1,
    baths: 1,
    features: ['Sala-comedor integrado', 'Acabados modernos', 'Luz natural', 'Área de trabajo'],
    price: 'Desde $7,500/mes',
    description: 'Loft de renta en Torre Maya. Moderno, práctico y bien ubicado. Todo lo que necesitas para vivir cómodo cerca de la universidad.',
  },
]
