const row1 = [
  { name: 'Apple',        logo: '/logos/apple.svg' },
  { name: 'Samsung',      logo: '/logos/samsung.svg' },
  { name: 'Xiaomi',       logo: '/logos/xiaomi.svg' },
  { name: 'Motorola',     logo: '/logos/motorola.svg' },
  { name: 'LG',           logo: '/logos/lg.svg' },
  { name: 'Realme',       logo: '/logos/realme.svg' },
  { name: 'OnePlus',      logo: '/logos/oneplus.svg' },
  { name: 'Huawei',       logo: '/logos/huawei.svg' },
  { name: 'Nokia',        logo: '/logos/nokia.svg' },
]

const row2 = [
  { name: 'Asus',         logo: '/logos/asus.svg' },
  { name: 'Dell',         logo: '/logos/dell.svg' },
  { name: 'Lenovo',       logo: '/logos/lenovo.svg' },
  { name: 'HP',           logo: '/logos/hp.svg' },
  { name: 'PlayStation',  logo: '/logos/playstation.svg' },
  { name: 'Xbox',         logo: '/logos/xbox.svg' },
  { name: 'Nintendo',     logo: '/logos/nintendo.svg' },
  { name: 'Acer',         logo: '/logos/acer.svg' },
  { name: 'Positivo',     logo: '/logos/positivo.svg' },
  { name: 'Vaio',         logo: '/logos/vaio.svg' },
]

function BrandPill({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex-shrink-0 inline-flex items-center justify-center bg-white rounded-2xl w-40 h-24 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-transparent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-outline cursor-default">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt={name}
        className="h-10 w-auto max-w-28 object-contain"
      />
    </div>
  )
}

function MarqueeRow({ brands, reverse }: { brands: typeof row1; reverse?: boolean }) {
  return (
    <div
      className="relative overflow-hidden group"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        className={`flex ${reverse ? 'animate-marquee-right' : 'animate-marquee-left'} group-hover:[animation-play-state:paused]`}
      >
        {/* duas cópias idênticas com pr-4 para alinhar exatamente o -50% */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-4 pr-4">
            {brands.map((brand) => (
              <BrandPill key={brand.name} {...brand} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function BrandsSection() {
  return (
    <section className="bg-card py-24 overflow-hidden" id="marcas">
      <div className="container text-center mb-12">
        <h2 className="text-[40px] font-semibold tracking-tight mb-3">
          Atendemos todas as marcas.
        </h2>
        <p className="text-xl text-card-foreground max-w-[680px] mx-auto">
          Da Apple à Xiaomi. Do PlayStation ao Xbox. Peças originais e garantia em todo serviço.
        </p>
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 text-[13px] font-medium shadow-[0_1px_3px_rgba(0,0,0,0.04)] mt-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34c759] flex-shrink-0" />
          <span><strong className="text-primary">+50 marcas</strong> atendidas com garantia</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <MarqueeRow brands={row1} />
        <MarqueeRow brands={row2} reverse />
      </div>
    </section>
  )
}
