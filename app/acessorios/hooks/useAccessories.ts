import { useEffect, useRef, useState } from 'react'
import catalog from '@/lib/accessories.config.json'
import type { Product } from '../components/ProductCard'

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'reviews'

const PAGE_SIZE = 10
const ALL_PRODUCTS = catalog.products as Product[]

function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = list.slice()
  switch (sort) {
    case 'price-asc':  return copy.sort((a, b) => a.price - b.price)
    case 'price-desc': return copy.sort((a, b) => b.price - a.price)
    case 'rating':     return copy.sort((a, b) => b.rating - a.rating)
    case 'reviews':    return copy.sort((a, b) => b.reviews - a.reviews)
    case 'featured':
    default:
      return copy.sort((a, b) =>
        (b.badge ? 1 : 0) - (a.badge ? 1 : 0) || b.rating - a.rating,
      )
  }
}

export function useAccessories(initialCat = 'all') {
  const [filter, _setFilter] = useState(initialCat)
  const [brand,  _setBrand]  = useState('all')
  const [search, _setSearch] = useState('')
  const [sort,   _setSort]   = useState<SortKey>('featured')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const sentinelRef = useRef<HTMLDivElement>(null)

  function setFilter(f: string)  { _setFilter(f); setVisibleCount(PAGE_SIZE) }
  function setBrand(b: string)   { _setBrand(b);  setVisibleCount(PAGE_SIZE) }
  function setSearch(s: string)  { _setSearch(s); setVisibleCount(PAGE_SIZE) }
  function setSort(s: SortKey)   { _setSort(s);   setVisibleCount(PAGE_SIZE) }

  const filtered: Product[] = (() => {
    let list = ALL_PRODUCTS
    if (filter !== 'all') list = list.filter(p => p.cat === filter)
    if (brand  !== 'all') list = list.filter(p => p.brand === brand)
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      const catLabels   = catalog.categories as Record<string, string>
      const brandLabels = catalog.brands     as Record<string, string>
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (catLabels[p.cat]     ?? '').toLowerCase().includes(q) ||
        (brandLabels[p.brand] ?? '').toLowerCase().includes(q),
      )
    }
    return sortProducts(list, sort)
  })()

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisibleCount(c => c + PAGE_SIZE) },
      { rootMargin: '300px' },
    )
    if (hasMore) observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore])

  return {
    filter, setFilter,
    brand,  setBrand,
    search, setSearch,
    sort,   setSort,
    filtered, visible,
    hasMore, sentinelRef,
  }
}
