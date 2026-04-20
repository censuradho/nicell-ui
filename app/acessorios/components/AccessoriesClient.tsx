'use client'

import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAccessories, type SortKey } from '../hooks/useAccessories'
import { ProductCard } from './ProductCard'
import catalog from '@/lib/accessories.config.json'

const FILTER_CHIPS = [
  { value: 'all',       label: 'Todos' },
  { value: 'pelicula',  label: 'Películas' },
  { value: 'capinha',   label: 'Capinhas' },
  { value: 'carregador',label: 'Carregadores' },
  { value: 'audio',     label: 'Áudio e Som' },
  { value: 'cabo',      label: 'Cabos' },
  { value: 'suporte',   label: 'Suportes' },
]

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured',   label: 'Em destaque' },
  { value: 'price-asc',  label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'rating',     label: 'Melhor avaliados' },
  { value: 'reviews',    label: 'Mais vendidos' },
]

export function AccessoriesClient({ initialCat }: { initialCat?: string }) {
  const {
    filter, setFilter,
    search, setSearch,
    sort,   setSort,
    filtered, visible,
    hasMore, sentinelRef,
  } = useAccessories(initialCat ?? 'all')

  const resultLabel = filtered.length === 0
    ? 'Nenhum produto encontrado'
    : `${filtered.length} ${filtered.length === 1 ? 'produto encontrado' : 'produtos encontrados'}`

  return (
    <div className="container px-4">

      {/* ── toolbar ── */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <label className="sr-only" htmlFor="accessory-search">Buscar acessório</label>
        <div className="relative flex-1 min-w-60">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-card-foreground pointer-events-none" aria-hidden="true" />
          <input
            id="accessory-search"
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar acessório..."
            className="w-full pl-10 pr-4 py-3 border border-outline rounded-full text-base bg-white outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-card-foreground/60"
          />
        </div>
        <label className="sr-only" htmlFor="accessory-sort">Ordenar por</label>
        <select
          id="accessory-sort"
          value={sort}
          onChange={e => setSort(e.target.value as SortKey)}
          className="px-5 py-3 border border-outline rounded-full bg-white text-sm text-foreground outline-none cursor-pointer transition focus:border-primary"
        >
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* ── filter chips ── */}
      <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-2 mb-8">
        {FILTER_CHIPS.map(chip => (
          <button
            key={chip.value}
            type="button"
            onClick={() => setFilter(chip.value)}
            aria-pressed={filter === chip.value}
            className={cn(
              'px-5 py-2.5 rounded-full text-sm font-medium transition-all',
              filter === chip.value
                ? 'bg-foreground text-white'
                : 'bg-[#f5f5f7] text-foreground hover:bg-outline',
            )}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* ── results meta ── */}
      <p className="text-sm text-card-foreground mb-4" aria-live="polite">
        {resultLabel}
      </p>

      {/* ── product grid ── */}
      {filtered.length === 0 ? (
        <div className="col-span-full text-center py-20 text-card-foreground">
          <p className="text-5xl mb-4" aria-hidden="true">🔎</p>
          <p className="text-xl font-semibold text-foreground mb-1">Nada por aqui</p>
          <p>Tente outra busca ou remova os filtros aplicados.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-20">
            {visible.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* sentinel for IntersectionObserver */}
          <div ref={sentinelRef} aria-hidden="true" className="h-px" />

          {hasMore && (
            <p className="text-center text-sm text-card-foreground pb-10">
              Carregando mais produtos…
            </p>
          )}
        </>
      )}
    </div>
  )
}
