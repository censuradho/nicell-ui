import { AnchorButton } from "@/components/AnchorButton";
import { TiltImage } from "./TiltImage";

export function AboveTheFold () {
  return (
    <section className="container px-6 pt-15 pb-10 h-[calc(100vh-86px)] flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <span className="text-lg text-card-foreground">Assistência Técnica Premium</span>
        <h1 className="font-bold mt-2 text-[56px] mb-4 text-center leading-16">
        Conserto rápido.<br />Confiança que dura.
        </h1>
        <p className="mt-4 text-3xl max-w-[740px] text-center">
        Celulares, computadores e consoles em um só lugar. Diagnóstico gratuito e orçamento em segundos.
        </p>
        <div className="flex items-center gap-4 mt-8 mb-10">
          <AnchorButton>
          Gerar orçamento
          </AnchorButton>
          <AnchorButton variant="text">
          Conheça nossos serviços
          </AnchorButton>
        </div>
        <div className="container">
          <TiltImage />
        </div>
      </div>
    </section>
  )
}
