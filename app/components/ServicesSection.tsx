import { Gamepad2, HardDrive, Laptop, Shield, Smartphone, Truck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { FadeIn } from "./FadeIn";

interface Service {
  icon: LucideIcon
  category?: string
  tag: string
  title: string
  description: string
  price?: string
  linkLabel: string
  accent: string
  accentBg: string
}


const services: Service[] = [
  {
    icon: Smartphone,
    category: 'celular',
    tag: 'Reparo',
    title: 'Reparo de Celulares',
    description: 'Troca de tela, bateria, conector de carga, traseira de vidro, alto-falante, câmera e placa lógica. iPhone, Samsung, Xiaomi, Motorola e mais.',
    price: 'R$ 120',
    linkLabel: 'Orçamento',
    accent: '#0071e3',
    accentBg: 'rgba(0,113,227,0.08)',
  },
  {
    icon: Laptop,
    tag: 'Software',
    title: 'Formatação de PC',
    category: 'computador',
    description: 'Instalação limpa do Windows, drivers atualizados, pacote essencial e backup dos seus arquivos — tudo em até 24h.',
    price: 'R$ 120',
    linkLabel: 'Orçamento',
    accent: '#5e5ce6',
    accentBg: 'rgba(94,92,230,0.08)',
  },
  {
    icon: HardDrive,
    tag: 'Hardware',
    title: 'Upgrade de HD para SSD',
    category: 'computador',
    description: 'Seu computador até 10x mais rápido. Clonagem do sistema sem perder seus arquivos e instalação de SSDs de marcas premium.',
    price: 'R$ 280',
    linkLabel: 'Orçamento',
    accent: '#34c759',
    accentBg: 'rgba(52,199,89,0.10)',
  },
  {
    icon: Gamepad2,
    tag: 'Consoles',
    title: 'Manutenção de Consoles',
    description: 'PS5, PS4, Xbox Series e One. Limpeza completa, troca de pasta térmica, conserto de HDMI, fonte e leitor de disco.',
    price: 'R$ 160',
    linkLabel: 'Orçamento',
    accent: '#ff9500',
    accentBg: 'rgba(255,149,0,0.10)',
  },
  {
    icon: Shield,
    tag: 'Incluso',
    title: 'Garantia de 90 dias',
    description: 'Todo serviço acompanha 90 dias de garantia em peças e mão de obra. Confiança que você sente.',
    linkLabel: 'Saiba mais',
    accent: '#ff2d55',
    accentBg: 'rgba(255,45,85,0.08)',
  },
  {
    icon: Truck,
    tag: 'Grátis',
    title: 'Entrega em domicílio',
    description: 'Serviços acima de R$ 200? Entregamos o aparelho pronto direto na sua porta, sem custo adicional.',
    linkLabel: 'Gerar orçamento',
    accent: '#ff9500',
    accentBg: 'rgba(255,149,0,0.10)',
  },
]

export function ServicesSection() {
  return (
    <section className="py-20 px-4">
      <div className="container">
        <FadeIn className="text-center mb-14">
          <h2 className="text-[40px] font-semibold tracking-tight mb-3">
            O que fazemos.
          </h2>
          <p className="text-xl text-card-foreground max-w-170 mx-auto">
            Equipe especializada, peças originais e diagnóstico transparente.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="group relative bg-card rounded-2xl p-7 flex flex-col overflow-hidden border border-transparent cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)] hover:bg-white hover:border-outline"
                style={{ '--accent': service.accent, '--accent-bg': service.accentBg } as CSSProperties}
              >
                {/* top accent bar */}
                <div className="absolute top-0 left-6 right-6 h-[3px] rounded-b-[3px] bg-[var(--accent)] opacity-0 scale-x-[0.3] origin-center transition-all duration-300 group-hover:opacity-100 group-hover:scale-x-100" />

                <div className="flex items-start justify-between mb-5">
                  <div className="w-[52px] h-[52px] rounded-[14px] bg-white shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.08] group-hover:-rotate-3">
                    <Icon size={26} color={service.accent} />
                  </div>
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.6px] px-[10px] py-[5px] rounded-full leading-none"
                    style={{ color: service.accent, background: service.accentBg }}
                  >
                    {service.tag}
                  </span>
                </div>

                <h3 className="text-xl font-semibold tracking-tight mb-2">{service.title}</h3>
                <p className="text-sm text-card-foreground leading-[1.55] mb-5 flex-1">{service.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-outline">
                  {service.price ? (
                    <div className="flex flex-col leading-none">
                      <span className="text-[11px] text-card-foreground uppercase tracking-[0.5px] mb-1">A partir de</span>
                      <span className="text-base font-semibold">{service.price}</span>
                    </div>
                  ) : (
                    <div />
                  )}
                  <Link
                    href={service.category
                      ? `/?categoria=${encodeURIComponent(service.category)}#orcamento`
                      : '/#orcamento'}
                    className="text-sm font-medium flex items-center gap-1 transition-all duration-300 group-hover:gap-2"
                    style={{ color: service.accent }}
                    replace
                  >
                    {service.linkLabel} ›
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
