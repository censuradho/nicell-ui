import { AnchorButton } from "@/components/AnchorButton";
import { TiltImage } from "./TiltImage";

export function AboveTheFold () {
  return (
    <section className="container px-6 pt-15 pb-10 min-h-[calc(100vh-86px)] flex items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <span className="text-base sm:text-lg md:text-xl text-card-foreground">Assistência Técnica Premium</span>
        <h1 className="font-bold mt-2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 text-center leading-tight md:leading-[4rem]">
          Conserto rápido.<br />Confiança que dura.
        </h1>
        <p className="mt-4 text-base sm:text-xl md:text-2xl lg:text-3xl w-full max-w-[740px] text-center">
          Celulares, computadores e consoles em um só lugar. Diagnóstico gratuito e orçamento em segundos.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4 mt-8 mb-10">
          <AnchorButton href="#orcamento">
          Gerar orçamento
          </AnchorButton>
          <AnchorButton variant="text" href="#servicos">
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
