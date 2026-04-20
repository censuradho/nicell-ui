'use client'

import config from '@/lib/quote.config.json'
import { Input } from '@/components/Input'
import { Textarea } from '@/components/Textarea'
import { cn } from '@/lib/utils'
import {
  Battery, BatteryLow, Bug, Camera, CheckCircle2,
  CircuitBoard, Disc, Droplets, Gamepad, Gamepad2,
  Gauge, HardDrive, Keyboard, Laptop, MemoryStick,
  Monitor, Plug, PowerOff, RectangleEllipsis, Smartphone,
  Square, Thermometer, Tv, Volume2, Wind, Zap,
  type LucideIcon,
} from 'lucide-react'
import { brl, useQuoteForm } from '@/app/hooks/useQuoteForm'
import { InputMask } from '@/components/InputMask'
import { Button } from '@/components/Button'

const ICONS: Record<string, LucideIcon> = {
  Battery, BatteryLow, Bug, Camera, CircuitBoard, Disc, Droplets,
  Gamepad, Gamepad2, Gauge, HardDrive, Keyboard, Laptop, MemoryStick,
  Monitor, Plug, PowerOff, RectangleEllipsis, Smartphone, Square,
  Thermometer, Tv, Volume2, Wind, Zap,
}

type Category = typeof config.categories[number]
type Problem  = Category['problems'][number]

function DynIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = ICONS[name]
  return Icon ? <Icon size={size} aria-hidden="true" /> : null
}

// ── sub-components ────────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Etapa ${current} de ${total}`}
      className="flex gap-2 mb-8"
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={cn(
            'flex-1 h-1 rounded-full transition-colors duration-300',
            i + 1 < current  ? 'bg-[#34c759]' :
              i + 1 === current ? 'bg-primary'   : 'bg-outline',
          )}
        />
      ))}
    </div>
  )
}

function OptionCard({
  selected, onClick, icon, label, description, selectionRole = 'radio',
}: {
  selected: boolean
  onClick: () => void
  icon?: string
  label: string
  description?: string
  selectionRole?: 'radio' | 'checkbox'
}) {
  return (
    <button
      type="button"
      role={selectionRole}
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 text-left p-4 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-0.5',
        selected
          ? 'border-primary bg-primary/5'
          : 'border-outline bg-white hover:border-card-foreground/30',
      )}
    >
      {icon && (
        <span className="flex-shrink-0 text-card-foreground" aria-hidden="true">
          <DynIcon name={icon} />
        </span>
      )}
      <span className="flex flex-col">
        <span className="text-base font-medium leading-snug">{label}</span>
        {description && (
          <span className="text-sm text-card-foreground mt-0.5">{description}</span>
        )}
      </span>
    </button>
  )
}

function StepHeader({ step, total, question, hint, id }: {
  step: number; total: number; question: string; hint: string; id: string
}) {
  return (
    <>
      <p className="text-sm font-medium text-card-foreground uppercase tracking-wide mb-2" aria-hidden="true">
        Etapa {step} de {total}
      </p>
      <h3 id={id} className="text-[28px] font-semibold tracking-tight mb-1">{question}</h3>
      <p className="text-base text-card-foreground mb-7">{hint}</p>
    </>
  )
}

function NavRow({ onBack, onNext, nextLabel = 'Continuar', nextDisabled }: {
  onBack?: () => void
  onNext: () => void
  nextLabel?: string
  nextDisabled?: boolean
}) {
  return (
    <div className="flex items-center justify-between mt-8">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="text-primary text-base hover:underline"
        >
          ‹ Voltar
        </button>
      ) : <div />}
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        aria-disabled={nextDisabled}
        className="bg-primary text-primary-foreground text-base font-medium px-7 py-3 rounded-full transition-colors hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {nextLabel}
      </button>
    </div>
  )
}

// ── main component ────────────────────────────────────────────────────────────

export function QuoteSection() {
  const {
    form,
    errors,
    step,
    TOTAL_STEPS,
    category,
    brand,
    problems,
    problemIds,
    categoryId,
    goNext,
    goBack,
    selectCategory,
    selectBrand,
    toggleProblem,
    reset,
    discount,
    rawMin,
    rawMax,
    totalMin,
    totalMax,
    longestTime,
    handleSendWhatsApp,
  } = useQuoteForm()

  const { register } = form
  const s = config.steps

  return (
    <section
      id="orcamento"
      aria-labelledby="orcamento-titulo"
      className="py-24"
      style={{ background: 'linear-gradient(180deg, #fafafa 0%, #f5f5f7 100%)' }}
    >
      <div className="container">
        <h2 id="orcamento-titulo" className="text-[40px] font-semibold tracking-tight text-center mb-3">
          {config.section.title}
        </h2>
        <p className="text-xl text-card-foreground text-center max-w-[680px] mx-auto mb-12">
          {config.section.subtitle}
        </p>

        <div className="max-w-[720px] mx-auto bg-white rounded-[22px] p-8 md:p-12">
          <ProgressBar current={step} total={TOTAL_STEPS} />

          {/* ── step 1: category ── */}
          {step === 1 && (
            <fieldset>
              <legend className="contents">
                <StepHeader step={1} total={TOTAL_STEPS} id="step1-q" {...s.category} />
              </legend>
              <div role="radiogroup" aria-labelledby="step1-q" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {config.categories.map(cat => (
                  <OptionCard
                    key={cat.id}
                    selected={categoryId === cat.id}
                    onClick={() => selectCategory(cat as Category)}
                    icon={cat.icon}
                    label={cat.label}
                    description={cat.description}
                  />
                ))}
              </div>
              <NavRow onNext={goNext} nextDisabled={!categoryId} />
            </fieldset>
          )}

          {/* ── step 2: brand ── */}
          {step === 2 && category && (
            <fieldset>
              <legend className="contents">
                <StepHeader step={2} total={TOTAL_STEPS} id="step2-q"
                  question={category.brandQuestion}
                  hint={s.brand.hint}
                />
              </legend>
              <div role="radiogroup" aria-labelledby="step2-q" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.brands.map(b => (
                  <OptionCard
                    key={b}
                    selected={brand === b}
                    onClick={() => selectBrand(b)}
                    label={b}
                  />
                ))}
              </div>
              <NavRow onBack={goBack} onNext={goNext} nextDisabled={!brand} />
            </fieldset>
          )}

          {/* ── step 3: problems ── */}
          {step === 3 && category && (
            <fieldset>
              <legend className="contents">
                <StepHeader step={3} total={TOTAL_STEPS} id="step3-q" {...s.problem} />
              </legend>
              <div role="group" aria-labelledby="step3-q" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.problems.map(p => (
                  <OptionCard
                    key={p.id}
                    selected={problemIds.includes(p.id)}
                    onClick={() => toggleProblem(p as Problem)}
                    icon={p.icon}
                    label={p.label}
                    selectionRole="checkbox"
                  />
                ))}
              </div>
              <NavRow onBack={goBack} onNext={goNext} nextDisabled={problemIds.length === 0} />
            </fieldset>
          )}

          {/* ── step 4: details ── */}
          {step === 4 && (
            <div>
              <StepHeader step={4} total={TOTAL_STEPS} id="step4-q" {...s.details} />
              <div className="flex flex-col gap-4">
                <Input
                  label={s.details.modelLabel}
                  placeholder={s.details.modelPlaceholder}
                  autoComplete="off"
                  errorMessage={errors.model?.message}
                  {...register('model')}
                />
                <Textarea
                  label={s.details.descriptionLabel}
                  placeholder={s.details.descriptionPlaceholder}
                  errorMessage={errors.description?.message}
                  rows={3}
                  {...register('description')}
                />
              </div>
              <NavRow onBack={goBack} onNext={goNext} nextLabel="Ver orçamento" />
            </div>
          )}

          {/* ── step 5: result ── */}
          {step === 5 && (
            <div>
              <div className="flex flex-col items-center text-center mb-8">
                <div
                  className="w-16 h-16 rounded-full bg-[#34c759] flex items-center justify-center mb-5"
                  aria-hidden="true"
                >
                  <CheckCircle2 size={32} color="white" />
                </div>
                <h3 className="text-[28px] font-semibold tracking-tight mb-2">{s.result.title}</h3>
                <p className="text-base text-card-foreground">
                  {category?.label}{brand ? ` · ${brand}` : ''}
                </p>
              </div>

              {/* price breakdown */}
              <dl className="bg-card rounded-2xl p-6 mb-5 text-left">
                {problems.map(p => (
                  <div key={p.id} className="flex justify-between py-2.5 text-sm border-b border-outline last:border-0">
                    <dt className="text-card-foreground">{p.label}</dt>
                    <dd className="font-medium">{brl(p.minPrice)} – {brl(p.maxPrice)}</dd>
                  </div>
                ))}
                {discount && (
                  <div className="flex justify-between py-2.5 text-sm border-b border-outline">
                    <dt className="text-card-foreground">{discount.label} ({Math.round(discount.rate * 100)}%)</dt>
                    <dd className="text-[#34c759] font-medium">
                      – {brl(Math.round((rawMin + rawMax) / 2 * discount.rate))}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between pt-4 mt-1 border-t-2 border-foreground">
                  <dt className="text-lg font-semibold">Estimativa total</dt>
                  <dd className="text-lg font-semibold">{brl(totalMin)} – {brl(totalMax)}</dd>
                </div>
              </dl>

              {/* meta info */}
              <dl className="bg-primary/6 rounded-xl px-5 py-4 text-sm text-left mb-6 space-y-1">
                <div className="flex gap-1.5">
                  <dt className="font-semibold">Prazo estimado:</dt>
                  <dd>{longestTime}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="font-semibold">Garantia:</dt>
                  <dd>{s.result.guarantee}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="font-semibold">Pagamento:</dt>
                  <dd>{s.result.payment}</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="font-semibold">Diagnóstico:</dt>
                  <dd>{s.result.diagnosis}</dd>
                </div>
              </dl>

              {/* contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Input
                  label="Seu nome"
                  placeholder={s.result.namePlaceholder}
                  autoComplete="name"
                  errorMessage={errors.name?.message}
                  {...register('name')}
                />
                <InputMask
                  mask="phone"
                  label="WhatsApp"
                  placeholder={s.result.phonePlaceholder}
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  errorMessage={errors.phone?.message}
                  {...register('phone')}
                />
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <Button onClick={handleSendWhatsApp} aria-label={`${s.result.whatsappCta} (abre no WhatsApp)`}>
                  {s.result.whatsappCta}
                </Button>
                <Button variant="ghost" onClick={reset}>
                  {s.result.resetCta}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}


