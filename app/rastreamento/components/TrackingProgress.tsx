import { Icon } from "@/components/icons";
import { RangeProgress } from "@/components/RangeProgress";
import { getOSProgress, OS_STATUS_LABELS } from "@/constants/serviceOrder";
import { ServiceOrderTrackingResponse } from "@/services/types";
import { format } from 'date-fns'
import * as Card from './Card'
import * as TrackHistory from './TrackingHistory'

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
    trackingCode,
    accessories,
    technician
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

          <TrackHistory.Root>
            <TrackHistory.ConnectLine />
            <TrackHistory.Indicator 
              icon="Clock8"
              done
            />
            <TrackHistory.Content 
              date="24/04/2026 · 14:08"
              label="Aparelho recebido"
              note="Recebemos seu iPhone 14 Pro junto com capa, película e chip. Tudo registrado com fotos no momento da entrega."
            />
          </TrackHistory.Root>
          
          <TrackHistory.Root>
            <TrackHistory.ConnectLine />
            <TrackHistory.Indicator 
              icon="ClipboardClock"
              done
            />
            <TrackHistory.Content 
              date="24/04/2026 · 14:08"
              label="Aguardando aprovação do orçamento"
              note="Enviamos o orçamento detalhado para você via WhatsApp. Total: R$ 1.480,00."
            />
          </TrackHistory.Root>
          <TrackHistory.Root>
            <TrackHistory.ConnectLine />
            <TrackHistory.Indicator 
              icon="ClipboardCheck"
              done
            />
            <TrackHistory.Content 
              date="24/04/2026 · 14:08"
              label="Orçamento aprovado por você"
              note="Obrigado pela confirmação!"
            />
          </TrackHistory.Root>
          <TrackHistory.Root>
            <TrackHistory.ConnectLine />
            <TrackHistory.Indicator 
              icon="Wrench"
              isCurrent
            />
            <TrackHistory.Content 
              date="24/04/2026 · 15:40"
              label="Em reparo"
              note="Marcos está com seu aparelho na bancada. Bateria já substituída — agora trocando o conector."
            />
          </TrackHistory.Root>
          <TrackHistory.Root>
            <TrackHistory.ConnectLine />
            <TrackHistory.Indicator 
              icon="Bell"
            />
            <TrackHistory.Content 
              date="previsto para 30/04/2026"
              label="Pronto para retirada"
            />
          </TrackHistory.Root>
          <TrackHistory.Root>
            <TrackHistory.Indicator 
              icon="PartyPopper"
            />
            <TrackHistory.Content 
              label="Aparelho entregue"
            />
          </TrackHistory.Root>
        </Card.Content>
      </Card.Root>
      <Card.Root className="mt-4">
        <Card.Header className="p-4">
          <Card.Title>Aparelho na assistência</Card.Title>
        </Card.Header>
        <Card.Content>
          <ul className="">
            <li className="flex justify-between border-b border-outline py-2">
              <span className="text-sm">Modelo</span>
              <span className="text-sm font-semibold">{device.model} · {device.brand}</span>
            </li>
            <li className="flex justify-between border-b border-outline py-2">
              <span className="text-sm">Acessórios</span>
              <span className="text-sm font-semibold">{accessories.join(' · ')}</span>
            </li>
            <li className="flex justify-between border-b border-outline py-2">
              <span className="text-sm">Recebido em</span>
              <span className="text-sm font-semibold">{new Date(createdAt).toLocaleDateString()}</span>
            </li>
            <li className="flex justify-between py-2">
              <span className="text-sm">Técnico responsável</span>
              <span className="text-sm font-semibold">{technician.name}</span>
            </li>
          </ul>
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