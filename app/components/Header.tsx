import { AnchorButton } from "@/components/AnchorButton";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

const navigation = [
  { label: 'Celulares', href: '#celulares' },
  { label: 'Computadores', href: '#computadores' },
  { label: 'Games', href: '#games' },
  { label: 'Marcas', href: '#marcas' },
  { label: 'Orçamento', href: '#orcamento' },
  { label: 'Contato', href: '#contato' },
  { label: 'Acessórios', href: '/acessorios' },
]

export function Header() {
  return (
    <header className="border-y border-outline bg-background-glass backdrop-blur-sm sticky top-0 z-50">
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
          </ul>
        </nav>

        <AnchorButton
          href="/#orcamento"
          size="sm"
          className="hidden lg:flex"
        >
          Orçamento online
        </AnchorButton>

        <MobileMenu navigation={navigation} />
      </div>
    </header>
  )
}
