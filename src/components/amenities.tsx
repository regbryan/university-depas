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
              <span className="text-xl" aria-hidden="true">{a.emoji}</span>
              <span>{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
