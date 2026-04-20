'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { AnchorButton } from '@/components/AnchorButton'

interface NavItem {
  label: string
  href: string
}

export function MobileMenu({ navigation }: { navigation: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 cursor-pointer"
        aria-label="Menu"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-outline z-50">
          <div className="container py-5 flex flex-col gap-5 px-4">
            <nav>
              <ul className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <AnchorButton href="/#orcamento" size="sm" className="self-start">
              Orçamento online
            </AnchorButton>
          </div>
        </div>
      )}
    </div>
  )
}
