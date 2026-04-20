import { AnchorButton } from "@/components/AnchorButton";

export function AccessoriesSection() {
  return (
    <section className="py-10">
      <div className="container">
        <div
          className="group relative overflow-hidden rounded-[22px] bg-[#1d1d1f] grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-7 py-10 md:px-12.5 md:py-15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
        >
          {/* gradiente decorativo */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 80% 20%, rgba(0,113,227,0.18) 0, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,149,0,0.12) 0, transparent 50%)',
            }}
          />

          <div className="relative z-10">
            <p className="text-[13px] font-medium uppercase tracking-[0.5px] text-[#a1a1a6] mb-2">
              Loja
            </p>
            <h2 className="text-[28px] md:text-[36px] font-semibold tracking-tight leading-[1.15] text-white mb-3">
              Acessórios para o seu dia a dia.
            </h2>
            <p className="text-[17px] text-[#c7c7cc] leading-relaxed mb-6">
              Películas, capinhas, carregadores, fones e caixas de som Bluetooth — selecionados pra durar.
            </p>
            <AnchorButton variant="white" href="/acessorios">
              Ver loja completa
            </AnchorButton>
          </div>

          <div className="relative z-10 flex items-center justify-center md:justify-end gap-6">
            <span className="text-[64px] leading-none select-none">🔋</span>
            <span className="text-[80px] leading-none select-none">📱</span>
            <span className="text-[64px] leading-none select-none">🎧</span>
          </div>
        </div>
      </div>
    </section>
  )
}
