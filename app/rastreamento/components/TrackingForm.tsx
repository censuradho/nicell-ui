'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { api } from '@/services/api'
import { ServiceOrderTrackingResponse } from '@/services/types'

const schema = z.object({
  codigo: z
    .string()
    .min(1, 'Informe o número da OS')
    .regex(/^NI-[A-Z0-9]{8}$/, 'Formato inválido. Ex.: NI-3A66ZOMT'),
})

type FormData = z.infer<typeof schema>

type Status = 'idle' | 'loading' | 'not-found'

export function TrackingForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [trackingData, setTrackingData] = useState<ServiceOrderTrackingResponse | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData ) {
    try {
      setStatus('loading')
      const response = await api.get<ServiceOrderTrackingResponse>(`/service-orders/track/${data.codigo}`)
      setTrackingData(response)
      setStatus('idle')
    } catch (error) {
      setStatus('not-found')
    }
  }

  return (
    <>
      {!trackingData && (
        <div className="min-h-[calc(100vh-86px)] flex flex-col items-center justify-center gap-6 px-4">
          <h1 className="text-base sm:text-lg md:text-xl text-card-foreground">Rastreamento</h1>
          <h2 className="text-5xl text-center font-bold">Acompanhe seu reparo.</h2>
          <p className="text-2xl text-center">Digite o numero da OS para ver o status em tempo real.</p>
          <div className="w-full max-w-[780px] items-center flex flex-col gap-2 bg-background rounded-2xl p-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex items-start gap-4"
              noValidate
            >
              <Input
                aria-label="Número da OS"
                placeholder="NI-3A66ZOMT"
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
          Exemplos: NI-3A66ZOMT  |  NI-B12FKR9X  |  NI-7QWE4521
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
        </div>
      )}
    </>
  )
}
