export function Location() {
  return (
    <section id="ubicacion" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#1e3a5f] mb-3">Nuestra Ubicación</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Av. 19 Pte. 2118, Rivera de Santiago, Puebla — a minutos de la universidad.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-72 sm:h-96 md:h-[420px]">
          <iframe
            title="Ubicación University Depas"
            src="https://maps.google.com/maps?q=Av+19+Pte+2118,+Rivera+de+Santiago,+72410+Heroica+Puebla+de+Zaragoza,+Pue.,+Mexico&output=embed&z=16"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-600 text-sm">
          <span>📍 Av 19 Pte 2118, Rivera de Santiago, 72410 Puebla, Pue.</span>
          <a
            href="https://maps.google.com/maps?q=Av+19+Pte+2118,+Rivera+de+Santiago,+72410+Heroica+Puebla+de+Zaragoza,+Pue.,+Mexico"
            target="_blank"
            rel="noreferrer"
            className="text-[#2563eb] hover:underline font-medium"
          >
            Abrir en Google Maps →
          </a>
        </div>
      </div>
    </section>
  )
}
