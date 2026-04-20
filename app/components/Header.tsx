import { AnchorButton } from "@/components/AnchorButton";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

const navigation = [
  { label: 'Marcas', href: '/#marcas' },
  { label: 'Contato', href: '/#contato' },
  { label: 'Acessórios', href: '/acessorios' },
  { label: 'Rastreamento', href: '/rastreamento' },
]

export function Header() {
  return (
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
          </ul>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <AnchorButton href="/login" variant="text" size="sm">
            Login
          </AnchorButton>
          <AnchorButton href="/#orcamento" size="sm">
            Orçamento online
          </AnchorButton>
        </div>

        <MobileMenu navigation={navigation} />
      </div>
    </header>
  )
}
