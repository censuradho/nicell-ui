import { Icon } from "@/components/icons";
import { RangeProgress } from "@/components/RangeProgress";
import { getOSProgress, OS_STATUS_LABELS } from "@/constants/serviceOrder";
import { ServiceOrderTrackingResponse } from "@/services/types";
import { format } from 'date-fns'
import * as Card from './Card'

import WhatsApp from '@/public/whatsapp.svg'
import { appSettings } from "@/config/app";
import { generateWhatsAppLink } from "@/utils/generateWhatsAppLink";

interface TrackingProgressProps {
  data: ServiceOrderTrackingResponse
  onBackward: () => void
}
export function TrackingProgress(props: TrackingProgressProps) {
  const {
    data,
    onBackward
  } = props

  const {
    device,
    partner,
    createdAt,
    estimatedDelivery,
    status,
    trackingCode
  } = data

  const progress = getOSProgress(status)

  return ( 
    <div className="flex flex-col gap-2 w-full h-full flex-1 container-md py-10">
      <button 
        onClick={() => onBackward()}
        className="flex items-center gap-2 text-sm font-medium cursor-pointer">
        <Icon name="ChevronLeft" size={14}/>
        Consultar outro código
      </button>
      <Card.Root className="mt-4">
        <header className="rounded-md overflow-hidden bg-background">
          <div className="bg-primary p-4">
            <strong className="text-xs bg-primary-foreground/20 py-1 px-2.5 rounded-full text-primary-foreground">#{String(trackingCode).padStart(4, '0')}</strong>
            <h1 className="text-md text-primary-foreground font-semibold mt-4">{device?.brand} {device?.model}</h1>
            <p className="text-xs text-primary-foreground mt-2">Olá, {partner.name}! Estamos cuidando do seu aparelho</p>
          </div>
          <div className="p-4 flex flex-col">
            <span className="text-xs text-card-foreground uppercase font-semibold">Status atual</span>
            <span className="text-lg text-foreground font-bold">{OS_STATUS_LABELS[status as keyof typeof OS_STATUS_LABELS]}</span>
            <p className="text-xs mt-2 text-card-foreground">Iniciado em <strong>{format(new Date(createdAt), 'dd/MM/yyyy')}</strong> às <strong>{format(new Date(createdAt), 'HH:mm')}</strong> — previsão de conclusão em <strong>{format(new Date(estimatedDelivery), 'dd/MM/yyyy')}</strong></p>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <RangeProgress 
              percentage={progress.percentage}
            />
            <div className="flex justify-between items-center">
              <span className="text-xs">
                <strong>{progress.current}</strong> de <span>{progress.total}</span> concluídas
              </span>
              <span className="text-xs text-card-foreground">{progress.percentage}% concluído</span>
            </div>
          </div>
        </header>
      </Card.Root>

      <Card.Root className="mt-4">
        <Card.Header className="p-4 border-b border-outline">
          <Card.Title className="text-xs uppercase tracking-wider text-card-foreground font-semibold">
      Histórico do reparo
          </Card.Title>
        </Card.Header>
  
        <Card.Content className="p-6">
          <div className="flex flex-col">
      
            {/* Item 1: Concluído */}
            <div className="relative flex gap-4 pb-8">
              {/* Linha Conectora individual */}
              <div className="absolute left-[17px] top-9 bottom-0 w-0.5 bg-outline" />
        
              <div className="z-10 flex items-center justify-center size-9 rounded-full bg-primary border-2 border-primary text-primary-foreground shadow-sm">
                <Icon name="Check" size={16} />
              </div>
              <div className="flex flex-col gap-1 pt-1">
                <h3 className="text-sm font-semibold">Aparelho recebido</h3>
                <span className="text-[10px] font-mono text-card-foreground">24/04/2026 · 14:08</span>
                <p className="text-sm text-card-foreground mt-1 bg-muted p-3 rounded-lg">
            Recebemos seu aparelho e registramos a entrada no sistema.
                </p>
              </div>
            </div>

            {/* Item 2: Corrente (Com Pulse apenas no Background) */}
            <div className="relative flex gap-4 pb-8">
              <div className="absolute left-[17px] top-9 bottom-0 w-0.5 bg-outline" />
        
              <div className="relative z-10 flex items-center justify-center size-9">
                {/* Elemento de pulsação (Apenas Cor/Background) */}
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          
                {/* Indicador Estático */}
                <div className="relative size-full rounded-full bg-background border-2 border-primary text-primary flex items-center justify-center shadow-sm">
                  <Icon name="Wrench" size={16} />
                </div>
              </div>

              <div className="flex flex-col gap-1 pt-1">
                <h3 className="text-sm font-bold text-primary">Em reparo</h3>
                <span className="text-[10px] font-mono text-card-foreground">Iniciado em 05/05/2026</span>
                <div className="flex gap-2 mt-2">
                  <div className="size-16 rounded-md bg-muted border border-outline flex items-center justify-center text-card-foreground/30">
                    <Icon name="Camera" size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Item 3: Futuro (Sem linha atravessando) */}
            <div className="relative flex gap-4">
              {/* Note que aqui não há a div da linha, pois é o último item */}
              <div className="z-10 flex items-center justify-center size-9 rounded-full bg-muted border-2 border-outline text-card-foreground/50 opacity-50">
                <Icon name="Bell" size={16} />
              </div>
              <div className="flex flex-col gap-1 pt-1 opacity-50">
                <h3 className="text-sm font-medium">Pronto para retirada</h3>
                <span className="text-[10px] font-mono">Aguardando finalização</span>
              </div>
            </div>

          </div>
        </Card.Content>
      </Card.Root>

      <Card.Root>
        <Card.Header className="p-4">
          <Card.Title>Precisa falar com a gente?</Card.Title>
          <Card.Content className="flex items-center gap-4">
            <a 
              className="flex items-center gap-4 border border-outline rounded-xl p-4 w-full hover:bg-card transition"
              href={generateWhatsAppLink(appSettings.phone, `Olá, gostaria de saber mais informações sobre a minha ordem de serviço (código: ${trackingCode})`)}
            >
              <div className="size-10 rounded-full flex items-center justify-center bg-[#E7F6ED]">
                <WhatsApp 
                  className="size-5 text-[#16A34A]"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-card-foreground">Atendimento rápido</span>
                <strong className="text-sm">WhatsApp</strong>
              </div>
            </a>
            <a 
              className="flex items-center gap-4 border border-outline rounded-xl p-4 w-full hover:bg-card transition"
              href={`tel:${appSettings.phone.replace(/\D/g, '')}`}
            >
              <div className="size-10 rounded-full flex items-center justify-center bg-muted text-card-foreground">
                <Icon
                  name="Phone" 
                  size={16}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-card-foreground">Telefone</span>
                <strong className="text-sm">{appSettings.phone}</strong>
              </div>
            </a>
          </Card.Content>
        </Card.Header>
      </Card.Root>
    </div>
  )
}