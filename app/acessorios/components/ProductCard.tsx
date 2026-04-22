'use client'

import { cn } from '@/lib/utils'
import config from '@/lib/accessories.config.json'
import Image from 'next/image'

export interface Product {
  id: string
  cat: string
  brand: string
  name: string
  icon: string
  image?: string // url da foto, opcional
  price: number
  oldPrice: number | null
  rating: number
  reviews: number
  badge?: string
}

function brl(n: number) {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function Stars({ rating }: { rating: number }) {
  const full  = Math.floor(rating)
  const half  = rating - full >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <span aria-label={`${rating} estrelas`} className="text-[#ff9500]">
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(empty)}
    </span>
  )
}

const badgeColors: Record<string, string> = {
  sale: 'bg-[#ff3b30]',
  new:  'bg-primary',
}

export function ProductCard({ product }: { product: Product }) {
  const catLabel   = (config.categories as Record<string, string>)[product.cat] ?? product.cat
  const badgeLabel = product.badge ? (config.badges as Record<string, string>)[product.badge] : null
  const installment = (product.price / 6).toLocaleString('pt-BR', { minimumFractionDigits: 2 })

  function openWhatsApp() {
    const msg = `Olá! Tenho interesse no produto: ${product.name} (${brl(product.price)}). Ainda está disponível?`
    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <article
      onClick={openWhatsApp}
      className="relative flex flex-col text-center bg-[#f5f5f7] rounded-[18px] p-6 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
    >
      {badgeLabel && (
        <span className={cn(
          'absolute top-3.5 left-3.5 text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full',
          badgeColors[product.badge!] ?? 'bg-primary',
        )}>
          {badgeLabel}
        </span>
      )}

      {/* image area */}
      <div
        className="h-36 flex items-center justify-center text-[68px] bg-white rounded-2xl mb-4"
        aria-hidden="true"
      >
        {product.image
          ? (
            <Image
              src={product.image}
              alt={product.name}
              fill={false}
              width={128}
              height={128}
              sizes="(max-width: 768px) 96px, 128px"
              className="object-contain w-auto h-32 max-h-32 max-w-full"
              style={{ width: 'auto', height: '8rem' }}
              priority={false}
            />
          )
          : product.icon}
      </div>

      {/* meta */}
      <p className="text-[11px] font-medium text-card-foreground uppercase tracking-wide mb-1">
        {catLabel}
      </p>
      <h3 className="text-[15px] font-semibold leading-snug min-h-[38px] mb-2">
        {product.name}
      </h3>
      <p className="text-xs text-card-foreground mb-3">
        <Stars rating={product.rating} />
        {' '}{product.rating.toFixed(1)} · {product.reviews} avaliações
      </p>

      {/* price */}
      <div className="mt-auto mb-3">
        <span className="text-lg font-semibold">{brl(product.price)}</span>
        {product.oldPrice && (
          <span className="text-xs text-card-foreground line-through ml-1.5">
            {brl(product.oldPrice)}
          </span>
        )}
        <span className="block text-[11px] text-card-foreground mt-0.5">
          ou 6x de R$ {installment} sem juros
        </span>
      </div>

      <button
        type="button"
        onClick={e => { e.stopPropagation(); openWhatsApp() }}
        className="bg-primary text-primary-foreground text-sm font-medium px-4 py-2.5 rounded-full transition hover:bg-primary/90"
      >
        Comprar
      </button>
    </article>
  )
}
