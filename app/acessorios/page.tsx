import { Footer } from '@/components/Footer'
import { Header } from '../components/Header'
import { PageHero } from './components/PageHero'
import { AccessoriesClient } from './components/AccessoriesClient'

export const metadata = {
  title: 'Acessórios — NiCell',
  description: 'Películas, capinhas, carregadores, fones e caixas de som Bluetooth — selecionados pra durar.',
}

interface Props {
  searchParams: Promise<{ cat?: string; brand?: string }>
}

export default async function AccessoriesPage({ searchParams }: Props) {
  const { cat, brand } = await searchParams

  return (
    <main>
      <Header />
      <PageHero />
      <AccessoriesClient initialCat={cat} initialBrand={brand} />
      <Footer />
    </main>
  )
}
