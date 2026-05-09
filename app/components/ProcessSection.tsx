import { ClipboardList, FileSignature, MessageCircle, ScanSearch, Truck } from "lucide-react"
import Link from "next/link"
import { FadeIn } from "./FadeIn"

const steps = [
  {
    icon: Truck,
    label: "Buscamos na sua porta",
    note: "Sem fila, sem deslocamento. Retiramos e devolvemos.",
  },
  {
    icon: ScanSearch,
    label: "Análise inicial documentada",
    note: "Fotografamos o estado do aparelho antes de qualquer intervenção.",
  },
  {
    icon: ClipboardList,
    label: "Reparo + análise final",
    note: "Ao fim do conserto, nova inspeção completa. Zero defeitos adicionais.",
  },
  {
    icon: FileSignature,
    label: "Assinatura digital + entrega",
    note: "Você assina confirmando que o aparelho voltou funcionando, como combinado.",
  },
]

export function ProcessSection() {
  return (
    <section className="py-20 px-4 bg-card">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <FadeIn>
            <h2 className="text-[40px] font-semibold tracking-tight leading-[1.1] mb-5">
              Você acompanha tudo.<br />
              <span className="text-card-foreground font-medium">Nós documentamos tudo.</span>
            </h2>
            <p className="text-base text-card-foreground leading-relaxed mb-8 max-w-115">
              Do momento que buscamos até a entrega, cada etapa fica registrada.
              Assinatura digital ao receber confirma que o aparelho voltou consertado — sem nenhum defeito adicional.
            </p>

            <div className="flex flex-col gap-3">
              <div className="bg-white rounded-2xl border border-outline p-5 flex items-start gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                <div className="w-10 h-10 rounded-xl bg-[rgba(37,211,102,0.10)] flex items-center justify-center shrink-0">
                  <MessageCircle size={20} color="#25D366" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Status pelo WhatsApp</p>
                  <p className="text-sm text-card-foreground leading-relaxed">
                    Atualizações do reparo chegam direto no seu WhatsApp — sem precisar ligar ou ir até a loja.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-outline p-5 flex items-start gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                <div className="w-10 h-10 rounded-xl bg-[rgba(0,113,227,0.08)] flex items-center justify-center shrink-0">
                  <ClipboardList size={20} color="#0071e3" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-semibold">Rastreie sua OS online</p>
                    <Link
                      href="/rastreio"
                      className="text-[11px] font-medium text-[#0071e3] whitespace-nowrap hover:underline"
                    >
                      Acessar →
                    </Link>
                  </div>
                  <p className="text-sm text-card-foreground leading-relaxed">
                    Nossa plataforma mostra cada etapa da sua ordem de serviço em tempo real — da entrada ao despacho.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="lg:pl-8">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isLast = i === steps.length - 1
              return (
                <FadeIn key={step.label} delay={i * 120}>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-xl bg-white border border-outline flex items-center justify-center shrink-0">
                        <Icon size={17} className="text-primary" />
                      </div>
                      {!isLast && (
                        <div className="w-px flex-1 bg-outline my-1 min-h-7" />
                      )}
                    </div>

                    <div className={`pt-1.5 ${isLast ? "" : "pb-7"}`}>
                      <p className="text-sm font-semibold leading-snug mb-0.5">{step.label}</p>
                      <p className="text-sm text-card-foreground leading-relaxed">{step.note}</p>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
