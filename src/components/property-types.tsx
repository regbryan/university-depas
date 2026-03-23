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
