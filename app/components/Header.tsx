import { AnchorButton } from "@/components/AnchorButton";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";
import { LinkButton } from "@/components/LinkButton";
import { generateWhatsAppLink } from "@/utils/generateWhatsAppLink";
import { TopInfo } from "./TopInfo";

const navigation = [
  { label: 'Marcas', href: '/#marcas' },
  { label: 'Acessórios', href: '/acessorios' },
  { label: 'Rastreio', href: '/rastreio' },
]

export function Header() {
  return (
    <>
      <TopInfo />
      <header className="border-y border-outline bg-background-glass backdrop-blur-sm sticky top-0 z-50 px-4">
        <div className="container h-[43px] flex items-center justify-between">
          <Link href="/" className="text-[21px] font-semibold">
          Ni<span className="text-primary">Cell</span>
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  className="text-sm"
                  href={generateWhatsAppLink('Olá! Gostaria de saber mais sobre os serviços da NiCell.')} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                Contato
                </a>
              </li>
            </ul>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LinkButton href="/#orcamento" variant="text" size="sm">
            Orçamento online
            </LinkButton>
            <AnchorButton href="/login"  size="sm">
            Login
            </AnchorButton>
          </div>

          <MobileMenu navigation={navigation} />
        </div>
      </header>
    </>
  )
}
