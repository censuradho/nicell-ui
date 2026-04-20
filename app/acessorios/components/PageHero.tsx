import Link from "next/link";

export function PageHero() {
  return (
    <section className="text-center pt-16 pb-10 px-6">
      <nav aria-label="Breadcrumb" className="text-xs text-card-foreground mb-3">
        <ol className="flex items-center justify-center gap-1.5 list-none">
          <li><Link href="/" className="hover:underline">Início</Link></li>
          <li aria-hidden="true">›</li>
          <li aria-current="page">Acessórios</li>
        </ol>
      </nav>
      <h1 className="text-[48px] font-semibold tracking-tight leading-none mb-3">
        Acessórios.
      </h1>
      <p className="text-xl text-card-foreground max-w-[620px] mx-auto">
        Películas, capinhas, carregadores, fones e caixas de som Bluetooth — selecionados pra durar.
      </p>
    </section>
  )
}
