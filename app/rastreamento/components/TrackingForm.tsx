'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

const schema = z.object({
  codigo: z
    .string()
    .min(1, 'Informe o número da OS')
    .regex(/^NC-[A-Za-z0-9]+$/i, 'Formato inválido. Ex.: NC-841203'),
})

type FormData = z.infer<typeof schema>

type Status = 'idle' | 'loading' | 'not-found'

export function TrackingForm() {
  const [status, setStatus] = useState<Status>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(/* data: FormData */) {
    setStatus('loading')
    // TODO: substituir pela chamada real à API
    await new Promise(r => setTimeout(r, 1200))
    setStatus('not-found')
  }

  return (
    <div className="w-full max-w-[480px] items-center flex flex-col gap-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex items-start gap-4"
        noValidate
      >
        <Input
          aria-label="Número da OS"
          placeholder="NC-841203"
          autoComplete="off"
          autoCapitalize="characters"
          errorMessage={errors.codigo?.message}
          {...register('codigo')}
        />
        <Button
          type="submit"
          disabled={status === 'loading'}
          className="shrink-0"
        >
          {status === 'loading' ? 'Buscando…' : 'Buscar'}
        </Button>
      </form>

      <span className="text-sm text-card-foreground pt-6">
          Exemplos: NC-841203  |  NC-293847  |  NC-574920
      </span>

      {status === 'not-found' && (
        <div
          role="alert"
          className="mt-6 flex items-center gap-2 text-sm text-destructive bg-destructive/5 border border-destructive/20 rounded-xl px-4 py-3"
        >
          <AlertCircle size={16} className="shrink-0" aria-hidden="true" />
          <span>Nenhuma OS encontrada com esse código.</span>
        </div>
      )}
    </div>
  )
}
