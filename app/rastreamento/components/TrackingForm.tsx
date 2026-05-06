'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect, useEffectEvent, useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { api } from '@/services/api'
import { ServiceOrderTrackingResponse } from '@/services/types'
import { TrackingProgress } from './TrackingProgress'
import { useLocalStorage } from '@/app/hooks/useLocalStorage'
import { Icon } from '@/components/icons'
import { DEVICE_TYPE_ICONS } from '@/constants/devices'
import { OS_STATUS, OS_STATUS_LABELS } from '@/constants/serviceOrder'
import { useSearchParams } from 'next/navigation'

const schema = z.object({
  codigo: z
    .string()
    .min(1, 'Informe o número da OS')
    .regex(/^NI-[A-Z0-9]{8}$/, 'Formato inválido. Ex.: NI-3A66ZOMT'),
})

type FormData = z.infer<typeof schema>

type Status = 'idle' | 'loading' | 'not-found' | 'loading-code'

export function TrackingForm() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  const [status, setStatus] = useState<Status>('idle')
  const [codes, setCodes] = useLocalStorage<ServiceOrderTrackingResponse[]>('nicell-tracking-code', [])

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

      setCodes(prev => [...prev, response])
      setTrackingData(response)
      setStatus('idle')
    } catch (error) {
      setStatus('not-found')
    }
  }

  async function handleCodeClick(code: string) {
    setStatus('loading-code')
    window.scrollTo({ top: 0 })

    try {
      const response = await api.get<ServiceOrderTrackingResponse>(`/service-orders/track/${code}`)
      setTrackingData(response)
      setCodes(prev => {
        const existingIndex = prev.findIndex(c => c.trackingCode === code)
        if (existingIndex !== -1) {
          const updatedCodes = [...prev]
          updatedCodes[existingIndex] = response
          return updatedCodes
        }
        return [...prev, response]
      })
      setStatus('idle')
    } catch (error) {
      setStatus('not-found')
    }
  }

  const handleRevalidateTrackingCodes = useEffectEvent(() => {
    const cacheCodes = codes
      .filter(code => code.status !== OS_STATUS.FINISHED)
    
    if (cacheCodes.length === 0) return

    api.post<ServiceOrderTrackingResponse[]>('/service-orders/track', {
      trackingCodes: cacheCodes.map(code => code.trackingCode)
    }).then(response => {
      setCodes(prevState => {
        const updatedCodes = prevState.map(code => {
          const updatedCode = response.find(c => c.trackingCode === code.trackingCode)
          return updatedCode ? updatedCode : code
        })
        return updatedCodes
      })
    })
  })

  useEffect(() => {
    handleRevalidateTrackingCodes()
  }, [])

  useEffect(() => {
    if (!code) return;
    handleCodeClick(code)
  }, [code])

  return (
    <>
      {(trackingData || status === 'loading-code') && (        
        <TrackingProgress 
          data={trackingData} 
          onBackward={() => setTrackingData(null)} 
          loading={status === 'loading-code'}
        />
      )}
      {!trackingData && status !== 'loading-code' && (
        <div className="min-h-[calc(100vh-86px)] flex flex-col items-center justify-center gap-6 px-4">
          <h1 className="text-base sm:text-lg md:text-xl text-card-foreground">Rastreamento</h1>
          <h2 className="text-5xl text-center font-bold">Acompanhe seu reparo.</h2>
          <p className="text-2xl text-center">Digite o numero da OS para ver o status em tempo real.</p>
          <div className="w-full max-w-[780px] border border-outline items-center flex flex-col gap-2 bg-background rounded-2xl p-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full grid md:grid-cols-[1fr_auto] items-start gap-4"
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
              Você recebe o código por WhatsApp ao deixar o aparelho
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
          <section className="border border-outline bg-background w-full rounded-lg">
            <header className="p-4 border-b border-outline">
              <h2 className="text-[10px] uppercase text-card-foreground font-medium">Consultas recentes</h2>
            </header>
            <ul>
              {codes.map(code => {
                const isCurrentStatusSince = code.createdAt

                return (
                  <li 
                    key={code.trackingCode} 
                    className="px-4 py-2 border-b border-outline last:border-0 cursor-pointer hover:bg-card/50 flex items-center gap-3" 
                    onClick={() => handleCodeClick(code.trackingCode)}
                  >
                    <div className="size-8 bg-card rounded flex items-center justify-center text-card-foreground">
                      <Icon 
                        size={14}
                        name={DEVICE_TYPE_ICONS[code.device.type as keyof typeof DEVICE_TYPE_ICONS]} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-card-foreground">#{String(code.displayId).padStart(4, '0')}</span>
                      <span className="text-sm text-foreground font-semibold">{code.device.brand} {code.device.model}</span>
                      <span className="text-xs text-card-foreground pt-2">{OS_STATUS_LABELS[code.status as keyof typeof OS_STATUS_LABELS]} ·  desde {new Date(isCurrentStatusSince).toLocaleDateString()}</span>
                    </div>
                    <Icon name="ChevronRight" size={16} className="ml-auto text-card-foreground" aria-hidden="true" />
                  </li>
                )
              })}
            </ul>
          </section>
        </div>
      )}
    </>
  )
}
