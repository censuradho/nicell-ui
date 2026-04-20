import { MapPin } from 'lucide-react'

const ADDRESS = {
  street: 'Av. Edgar Píres de Castro, 886',
  neighborhood: 'Hípica',
  city: 'Porto Alegre',
  state: 'RS',
  zip: '90050-321',
  mapsEmbed:
    'https://www.google.com/maps?q=Av.+Edgar+P%C3%ADres+de+Castro+886,+Porto+Alegre,+RS,+90050-321&output=embed',
}

export function LocationSection() {
  const full = `${ADDRESS.street} – ${ADDRESS.neighborhood}, ${ADDRESS.city}/${ADDRESS.state} – ${ADDRESS.zip}`

  return (
    <section
      id="localizacao"
      aria-labelledby="localizacao-titulo"
      className="py-24"
    >
      <div className="container px-4">
        <h2
          id="localizacao-titulo"
          className="text-[40px] font-semibold tracking-tight text-center mb-3"
        >
          Como chegar
        </h2>
        <p className="text-xl text-card-foreground text-center max-w-[680px] mx-auto mb-12">
          Estamos no bairro Hípica, na Av. Edgar Píres de Castro. Fácil acesso de carro, com estacionamento na rua.
        </p>

        <div className="max-w-[900px] mx-auto">
          <div className="rounded-[22px] overflow-hidden shadow-md border border-outline">
            <iframe
              title={`Mapa – ${ADDRESS.street}`}
              src={ADDRESS.mapsEmbed}
              width="100%"
              height="400"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex items-start gap-2 mt-5 text-card-foreground">
            <MapPin size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            <address className="not-italic text-sm leading-relaxed">
              {full}
            </address>
          </div>
        </div>
      </div>
    </section>
  )
}
