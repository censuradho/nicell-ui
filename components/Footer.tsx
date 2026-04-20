import { appSettings } from "@/config/app"
import { generateWhatsAppLink } from "@/utils/generateWhatsAppLink"
import { applyPhoneMask } from "@/utils/masks"

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
      { label: 'Apple',     href: '/acessorios?brand=apple' },
      { label: 'Samsung',   href: '/acessorios?brand=samsung' },
      { label: 'Xiaomi',    href: '/acessorios?brand=xiaomi' },
      { label: 'Motorola',  href: '/acessorios?brand=motorola' },
      { label: 'Ver todas', href: '/acessorios' },
    ],
  },
  {
    heading: 'Atendimento',
    links: [
      { label: 'Orçamento online',        href: '#orcamento' },
      { label: 'WhatsApp',                href: generateWhatsAppLink('Olá, gostaria de mais informações.') },
      { label: applyPhoneMask(appSettings.phone),          href: `tel:${appSettings.phone}` },
      { label: 'contato@nicell.com.br',   href: `mailto:${appSettings.email}` },
    ],
  },
  {
    heading: 'A NiCell',
    links: [
      { label: 'Sobre nós',               href: '#' },
      { label: 'Garantia',                href: '/garantia' },
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
        <p className="text-xs leading-relaxed pb-2">
          {disclaimer}
        </p>

        {/* endereço */}
        <address className="not-italic text-xs text-card-foreground mb-4 flex items-center gap-2">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block align-middle text-primary" viewBox="0 0 24 24"><path d="M12 21c-4.8-4.8-8-7.2-8-11A8 8 0 0 1 20 10c0 3.8-3.2 6.2-8 11Z"/><circle cx="12" cy="10" r="3"/></svg>
          Av. Edgar Píres de Castro, 886 – Hípica, Porto Alegre/RS – 90050-321
        </address>

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
