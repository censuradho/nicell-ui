import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect, useState } from 'react'
import config from '@/lib/quote.config.json'
import { useSearchParams } from 'next/navigation'

// ── schema ────────────────────────────────────────────────────────────────────

export const quoteSchema = z.object({
  categoryId:  z.string().min(1, 'Selecione uma categoria'),
  brand:       z.string().min(1, 'Selecione uma marca'),
  problemIds:  z.array(z.string()).min(1, 'Selecione ao menos um problema'),
  model:       z.string().optional(),
  description: z.string().min(1, 'Descreva o problema'),
  name:        z.string().min(1, 'Informe seu nome'),
  phone:       z
    .string()
    .refine(val => val !== '', {
      message: 'Campo obrigatório.',
    })
    .refine(val => /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(val), {
      message: 'Formato inválido. Ex.: (11) 99999-9999',
    }),
})

export type QuoteFormValues = z.infer<typeof quoteSchema>

// ── derived types ─────────────────────────────────────────────────────────────

type Category = typeof config.categories[number]
type Problem  = Category['problems'][number]
type Discount = typeof config.discounts[number]

// ── helpers ───────────────────────────────────────────────────────────────────

export function brl(n: number) {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function applyDiscount(count: number): Discount | undefined {
  return [...config.discounts].reverse().find(d => count >= d.minItems)
}

// fields to validate per step before advancing
const STEP_FIELDS: Partial<Record<number, (keyof QuoteFormValues)[]>> = {
  1: ['categoryId'],
  2: ['brand'],
  3: ['problemIds'],
  5: ['phone'],
}

// ── hook ──────────────────────────────────────────────────────────────────────

export function useQuoteForm() {
  const TOTAL_STEPS = 5
  const searchParams = useSearchParams()
  const defaultCategory = searchParams.get('categoria')
  const [step, setStep] = useState(1)

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      categoryId:  defaultCategory || '',
      brand:       '',
      problemIds:  [],
      model:       '',
      description: '',
      name:        '',
      phone:       '',
    },
    mode: 'onTouched',
  })

  const { watch, setValue, trigger, reset: resetForm, formState: { errors } } = form

  // watched values
  const categoryId  = watch('categoryId')
  const brand       = watch('brand')
  const problemIds  = watch('problemIds')
  const model       = watch('model') ?? ''
  const description = watch('description') ?? ''
  const name        = watch('name') ?? ''
  const phone       = watch('phone') ?? ''

  // derived objects from config
  const category = config.categories.find(c => c.id === categoryId) ?? null
  const problems: Problem[] = category?.problems.filter(p => problemIds.includes(p.id)) ?? []

  // price calculation
  const discount    = applyDiscount(problems.length)
  const rawMin      = problems.reduce((s, p) => s + p.minPrice, 0)
  const rawMax      = problems.reduce((s, p) => s + p.maxPrice, 0)
  const totalMin    = discount ? Math.round(rawMin * (1 - discount.rate)) : rawMin
  const totalMax    = discount ? Math.round(rawMax * (1 - discount.rate)) : rawMax
  const longestTime = problems.at(-1)?.estimatedTime ?? ''

  // ── navigation ──

  function scrollToForm() {
    document.getElementById('orcamento')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function goNext() {
    const fields = STEP_FIELDS[step]
    if (fields) {
      const valid = await trigger(fields)
      if (!valid) return
    }
    setStep(s => Math.min(s + 1, TOTAL_STEPS))
    scrollToForm()
  }

  function goBack() {
    setStep(s => Math.max(s - 1, 1))
    scrollToForm()
  }

  function goTo(n: number) {
    setStep(n)
    scrollToForm()
  }

  // ── selection setters ──

  function selectCategory(cat: Category) {
    setValue('categoryId', cat.id, { shouldValidate: step === 1 })
    setValue('brand', '', { shouldDirty: false })
    setValue('problemIds', [], { shouldDirty: false })
  }

  function selectBrand(b: string) {
    setValue('brand', b, { shouldValidate: step === 2 })
  }

  function toggleProblem(p: Problem) {
    const next = problemIds.includes(p.id)
      ? problemIds.filter(id => id !== p.id)
      : [...problemIds, p.id]
    setValue('problemIds', next, { shouldValidate: step === 3 })
  }

  function reset() {
    resetForm()
    setStep(1)
    scrollToForm()
  }

  async function handleSendWhatsApp() {
    const valid = await trigger(['name', 'phone'])
    if (!valid) return
    window.open(buildWhatsAppHref(), '_blank', 'noopener,noreferrer')
  }

  function buildWhatsAppHref() {
    const probList = problems.map(p => `• ${p.label}`).join('\n')
    const msg = encodeURIComponent(
      `Olá! Sou ${name || 'Cliente'} e gostaria de confirmar um orçamento gerado no site.\n\n` +
      `📦 Aparelho: ${category?.label}${brand ? ' · ' + brand : ''}\n` +
      (model ? `📱 Modelo: ${model}\n` : '') +
      `\n🔧 Serviços:\n${probList}\n\n` +
      `💰 Estimativa: ${brl(totalMin)} – ${brl(totalMax)}\n` +
      `⏱ Prazo: ${longestTime}\n` +
      (description ? `\n📝 Detalhes: ${description}\n` : '') +
      (phone ? `\nMeu WhatsApp: ${phone}` : ''),
    )
    return `https://wa.me/${config.whatsapp}?text=${msg}`
  }

  useEffect(() => {
    const cat = defaultCategory
      ? config.categories.find(c => c.id === defaultCategory)
      : null

    resetForm({
      categoryId:  cat?.id ?? '',
      brand:       '',
      problemIds:  [],
      model:       '',
      description: '',
      name:        '',
      phone:       '',
    })
    setTimeout(() => {
      setStep(cat ? 2 : 1)
      if (cat) scrollToForm()
    }, 0)
    // eslint-disable-next-line
  }, [defaultCategory])
    
  return {
    form,
    errors,
    step,
    TOTAL_STEPS,
    // selections (derived objects)
    category,
    brand,
    problems,
    problemIds,
    categoryId,
    // navigation
    goNext,
    goBack,
    goTo,
    // setters
    selectCategory,
    selectBrand,
    toggleProblem,
    reset,
    // price
    discount,
    rawMin,
    rawMax,
    totalMin,
    totalMax,
    longestTime,
    // result
    buildWhatsAppHref,
    handleSendWhatsApp,
  }
}
