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