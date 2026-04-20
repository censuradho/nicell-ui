'use client'

import { useEffect, useRef, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAccessories, type SortKey } from '../hooks/useAccessories'
import { ProductCard } from './ProductCard'
import catalog from '@/lib/accessories.config.json'

const FILTER_CHIPS = [
  { value: 'all',        label: 'Todos' },
  { value: 'pelicula',   label: 'Películas' },
  { value: 'capinha',    label: 'Capinhas' },
  { value: 'carregador', label: 'Carregadores' },
  { value: 'audio',      label: 'Áudio e Som' },
  { value: 'cabo',       label: 'Cabos' },
  { value: 'suporte',    label: 'Suportes' },
]

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured',   label: 'Em destaque' },
  { value: 'price-asc',  label: 'Menor preço' },
  { value: 'price-desc', label: 'Maior preço' },
  { value: 'rating',     label: 'Melhor avaliados' },
  { value: 'reviews',    label: 'Mais vendidos' },
]

const BRAND_CHIPS = [
  { value: 'all', label: 'Todas as marcas' },
  ...Object.entries(catalog.brands).map(([value, label]) => ({ value, label })),
]

function ChipRow({ children, className, 'aria-label': ariaLabel }: { children: React.ReactNode; className?: string; 'aria-label'?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [fadeLeft,  setFadeLeft]  = useState(false)
  const [fadeRight, setFadeRight] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    function update() {
      setFadeLeft(el!.scrollLeft > 1)
      setFadeRight(el!.scrollLeft + el!.clientWidth < el!.scrollWidth - 1)
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => { el.removeEventListener('scroll', update); ro.disconnect() }
  }, [])

  const mask = [
    fadeLeft  ? 'transparent, black 16px' : 'black, black',
    fadeRight ? 'black calc(100% - 16px), transparent' : 'black, black',
  ].join(', ')
  const maskImage = `linear-gradient(to right, ${mask})`

  return (
    <div
      ref={ref}
      role="group"
      aria-label={ariaLabel}
      className={cn('flex gap-2 overflow-x-auto pb-0.5', className)}
      style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', maskImage, WebkitMaskImage: maskImage } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

interface FilterModalProps {
  open: boolean
  onClose: () => void
  filter: string
  setFilter: (v: string) => void
  brand: string
  setBrand: (v: string) => void
  search: string
  setSearch: (v: string) => void
  resultCount: number
}

function FilterModal({ open, onClose, filter, setFilter, brand, setBrand, search, setSearch, resultCount }: FilterModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Filtros"
      className="fixed inset-0 z-[100] flex flex-col bg-white"
    >
      {/* header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-outline shrink-0">
        <span className="text-base font-semibold">Filtros</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar filtros"
          className="p-2 -mr-2 rounded-full hover:bg-outline transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* body */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-card-foreground pointer-events-none"
            aria-hidden="true"
          />
          <label className="sr-only" htmlFor="modal-search">Buscar acessório</label>
          <input
            id="modal-search"
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar acessório..."
            className="w-full pl-10 pr-4 py-2.5 border border-outline rounded-full text-base bg-white outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-card-foreground/60"
          />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-card-foreground mb-3">
            Categoria
          </p>
          <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-2">
            {FILTER_CHIPS.map(chip => (
              <button
                key={chip.value}
                type="button"
                onClick={() => setFilter(chip.value)}
                aria-pressed={filter === chip.value}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all',
                  filter === chip.value
                    ? 'bg-foreground text-white'
                    : 'bg-[#f5f5f7] text-foreground hover:bg-outline',
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-card-foreground mb-3">
            Marca
          </p>
          <div role="group" aria-label="Filtrar por marca" className="flex flex-wrap gap-2">
            {BRAND_CHIPS.map(chip => (
              <button
                key={chip.value}
                type="button"
                onClick={() => setBrand(chip.value)}
                aria-pressed={brand === chip.value}
                className={cn(
                  'px-4 py-1.5 rounded-full text-xs font-medium border transition-all',
                  brand === chip.value
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-outline bg-white text-card-foreground hover:border-foreground/30',
                )}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="px-4 py-4 border-t border-outline shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-primary text-primary-foreground text-sm font-medium py-3 rounded-full transition hover:bg-primary/90"
        >
          {resultCount === 0
            ? 'Nenhum produto'
            : `Ver ${resultCount} ${resultCount === 1 ? 'produto' : 'produtos'}`}
        </button>
      </div>
    </div>
  )
}

export function AccessoriesClient({ initialCat, initialBrand }: { initialCat?: string; initialBrand?: string }) {
  const {
    filter, setFilter,
    brand,  setBrand,
    search, setSearch,
    sort,   setSort,
    filtered, visible,
    hasMore, sentinelRef,
  } = useAccessories(initialCat ?? 'all', initialBrand ?? 'all')

  const [showFilters, setShowFilters] = useState(false)

  const activeFilterCount = (filter !== 'all' ? 1 : 0) + (brand !== 'all' ? 1 : 0) + (search.trim() !== '' ? 1 : 0)

  const resultLabel = filtered.length === 0
    ? 'Nenhum produto encontrado'
    : `${filtered.length} ${filtered.length === 1 ? 'produto encontrado' : 'produtos encontrados'}`

  return (
    <div>
      {/* ── sticky filter bar ── */}
      <div className="sticky top-[43px] z-40 bg-white/90 backdrop-blur-sm border-b border-outline">
        <div className="container px-4 pt-4 pb-3 space-y-3">

          {/* toolbar — desktop only: search + sort */}
          <div className="hidden lg:flex items-center gap-3">
            <label className="sr-only" htmlFor="accessory-search">Buscar acessório</label>
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-card-foreground pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="accessory-search"
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar acessório..."
                className="w-full pl-10 pr-4 py-2.5 border border-outline rounded-full text-base bg-white outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-card-foreground/60"
              />
            </div>
            {/* sort — visible only on desktop */}
            <label className="sr-only" htmlFor="accessory-sort">Ordenar por</label>
            <select
              id="accessory-sort"
              value={sort}
              onChange={e => setSort(e.target.value as SortKey)}
              className="hidden lg:block px-5 py-2.5 border border-outline rounded-full bg-white text-sm text-foreground outline-none cursor-pointer transition focus:border-primary"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* mobile row: "Mostrar filtros" + sort select */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setShowFilters(true)}
              className="relative flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-outline rounded-full bg-white text-sm font-medium text-foreground transition hover:border-foreground/30"
            >
              <SlidersHorizontal size={15} aria-hidden="true" />
              Mostrar filtros
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold px-1">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <label className="sr-only" htmlFor="accessory-sort-mobile">Ordenar por</label>
            <select
              id="accessory-sort-mobile"
              value={sort}
              onChange={e => setSort(e.target.value as SortKey)}
              className="px-4 py-2.5 border border-outline rounded-full bg-white text-sm text-foreground outline-none cursor-pointer transition focus:border-primary"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* chip rows — desktop only */}
          <ChipRow aria-label="Filtrar por categoria" className="hidden lg:flex">
            {FILTER_CHIPS.map(chip => (
              <button
                key={chip.value}
                type="button"
                onClick={() => setFilter(chip.value)}
                aria-pressed={filter === chip.value}
                className={cn(
                  'shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all',
                  filter === chip.value
                    ? 'bg-foreground text-white'
                    : 'bg-[#f5f5f7] text-foreground hover:bg-outline',
                )}
              >
                {chip.label}
              </button>
            ))}
          </ChipRow>

          <ChipRow aria-label="Filtrar por marca" className="hidden lg:flex">
            {BRAND_CHIPS.map(chip => (
              <button
                key={chip.value}
                type="button"
                onClick={() => setBrand(chip.value)}
                aria-pressed={brand === chip.value}
                className={cn(
                  'shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border transition-all',
                  brand === chip.value
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-outline bg-white text-card-foreground hover:border-foreground/30',
                )}
              >
                {chip.label}
              </button>
            ))}
          </ChipRow>

        </div>
      </div>

      {/* ── content ── */}
      <div className="container px-4 pt-6">
        <p className="text-sm text-card-foreground mb-4" aria-live="polite">
          {resultLabel}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-card-foreground">
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

            <div ref={sentinelRef} aria-hidden="true" className="h-px" />

            {hasMore && (
              <p className="text-center text-sm text-card-foreground pb-10">
                Carregando mais produtos…
              </p>
            )}
          </>
        )}
      </div>

      {/* ── mobile filter modal ── */}
      <FilterModal
        open={showFilters}
        onClose={() => setShowFilters(false)}
        filter={filter}
        setFilter={setFilter}
        brand={brand}
        setBrand={setBrand}
        search={search}
        setSearch={setSearch}
        resultCount={filtered.length}
      />
    </div>
  )
}
