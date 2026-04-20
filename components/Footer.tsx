const disclaimer =
  'Os valores apresentados pelo orçamento online são estimativas baseadas em casos comuns. ' +
  'O orçamento final é confirmado após avaliação técnica do equipamento, que é gratuita e sem ' +
  'compromisso. Garantia de 90 dias em peças e serviços.'

const columns = [
  {
    heading: 'Serviços',
    links: [
      { label: 'Celulares',       href: '#celulares' },
      { label: 'Formatação',      href: '#computadores' },
      { label: 'Troca de HD/SSD', href: '#computadores' },
      { label: 'PlayStation',     href: '#games' },
      { label: 'Xbox',            href: '#games' },
    ],
  },
  {
    heading: 'Acessórios',
    links: [
      { label: 'Películas',      href: '/acessorios?cat=pelicula' },
      { label: 'Capinhas',       href: '/acessorios?cat=capinha' },
      { label: 'Carregadores',   href: '/acessorios?cat=carregador' },
      { label: 'Caixas de som',  href: '/acessorios?cat=audio' },
      { label: 'Fones',          href: '/acessorios?cat=audio' },
    ],
  },
  {
    heading: 'Marcas',
    links: [
      { label: 'Apple',     href: '#marcas' },
      { label: 'Samsung',   href: '#marcas' },
      { label: 'Xiaomi',    href: '#marcas' },
      { label: 'Motorola',  href: '#marcas' },
      { label: 'Ver todas', href: '#marcas' },
    ],
  },
  {
    heading: 'Atendimento',
    links: [
      { label: 'Orçamento online',        href: '#orcamento' },
      { label: 'WhatsApp',                href: 'https://wa.me/5511999999999' },
      { label: '(11) 9999-9999',          href: 'tel:+5511999999999' },
      { label: 'contato@nicell.com.br',   href: 'mailto:contato@nicell.com.br' },
    ],
  },
  {
    heading: 'A NiCell',
    links: [
      { label: 'Sobre nós',               href: '#' },
      { label: 'Garantia',                href: '#' },
      { label: 'Política de privacidade', href: '#' },
      { label: 'Termos de uso',           href: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer id="contato" className="bg-[#f5f5f7] text-card-foreground py-10 px-6">
      <div className="container">

        {/* disclaimer */}
        <p className="text-xs leading-relaxed pb-5 border-b border-outline">
          {disclaimer}
        </p>

        {/* nav columns */}
        <nav
          aria-label="Links do rodapé"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 py-8 border-b border-outline"
        >
          {columns.map(col => (
            <div key={col.heading}>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-3">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-card-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-5 text-xs">
          <span>Copyright © 2026 NiCell Assistência Técnica. Todos os direitos reservados.</span>
          <span>Brasil · Português</span>
        </div>

      </div>
    </footer>
  )
}
