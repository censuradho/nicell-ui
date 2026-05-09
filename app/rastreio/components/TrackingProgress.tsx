import { Icon } from "@/components/icons";
import { RangeProgress } from "@/components/RangeProgress";
import { Skeleton } from "@/components/ui/skeleton"; // Certifique-se de ter esse componente
import { getOSProgress, OS_PROGRESS_STAGES, OS_STATUS_LABELS, STATUS_METADATA } from "@/constants/serviceOrder";
import { SERVICE_ORDER_TYPE, ServiceOrderTrackingResponse } from "@/services/types";
import { format } from 'date-fns'
import * as Card from './Card'
import * as TrackHistory from './TrackingHistory'

import WhatsApp from '@/public/whatsapp.svg'
import { appSettings } from "@/config/app";
import { generateWhatsAppLink } from "@/utils/generateWhatsAppLink";

interface TrackingProgressProps {
  data?: ServiceOrderTrackingResponse | null
  onBackward: () => void
  loading?: boolean
}

export function TrackingProgress({ data, onBackward, loading }: TrackingProgressProps) {
  const {
    device,
    partner,
    createdAt,
    estimatedDelivery,
    status = '',
    trackingCode,
    accessories = [],
    technician,
    items = [],
    subtotal,
    total,
    discount,
    type
  } = data || {}

  const isWarranty = type === SERVICE_ORDER_TYPE.WARRANTY

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

  const progress = getOSProgress(status)

  return (
    <div className="flex flex-col gap-2 w-full h-full flex-1 container-md py-10">
      <button 
        onClick={() => onBackward()}
        className="flex items-center gap-2 text-sm font-medium cursor-pointer">
        <Icon name="ChevronLeft" size={14}/>
        Consultar outro código
      </button>

      {/* CARD PRINCIPAL: STATUS E PROGRESSO */}
      <Card.Root className="mt-4">
        <header className="rounded-md overflow-hidden bg-background">
          <div className="bg-primary p-4">
            {loading ? (
              <>
                <Skeleton className="h-5 w-16 rounded-full bg-primary-foreground/20" />
                <Skeleton className="h-7 w-48 mt-4 bg-primary-foreground/20" />
                <Skeleton className="h-4 w-64 mt-2 bg-primary-foreground/20" />
              </>
            ) : (
              <>
                <strong className="text-xs bg-primary-foreground/20 py-1 px-2.5 rounded-full text-primary-foreground">#{String(trackingCode).padStart(4, '0')}</strong>
                <h1 className="text-md text-primary-foreground font-semibold mt-4">{device?.brand} {device?.model}</h1>
                <p className="text-xs text-primary-foreground mt-2">Olá, {partner?.name}! Estamos cuidando do seu aparelho</p>
              </>
            )}
          </div>
          
          <div className="p-4 flex flex-col gap-2">
            <span className="text-xs text-card-foreground uppercase font-semibold">Status atual</span>
            {loading ? (
              <>
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-4 w-full mt-1" />
              </>
            ) : (
              <>
                <span className="text-lg text-foreground font-bold">{OS_STATUS_LABELS[status as keyof typeof OS_STATUS_LABELS]}</span>
                <p className="text-xs text-card-foreground">
                  Iniciado em <strong>{createdAt ? format(new Date(createdAt), 'dd/MM/yyyy') : '--'}</strong> às <strong>{createdAt ? format(new Date(createdAt), 'HH:mm') : '--'}</strong> — previsão de conclusão em <strong>{estimatedDelivery ? format(new Date(estimatedDelivery), 'dd/MM/yyyy') : '--'}</strong>
                </p>
              </>
            )}
          </div>

          <div className="p-4 flex flex-col gap-2">
            {loading ? (
              <Skeleton className="h-3 w-full rounded-full" />
            ) : (
              <RangeProgress percentage={progress.percentage} />
            )}
            <div className="flex justify-between items-center">
              {loading ? (
                <>
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-16" />
                </>
              ) : (
                <>
                  <span className="text-xs">
                    <strong>{progress.current}</strong> de <span>{progress.total}</span> concluídas
                  </span>
                  <span className="text-xs text-card-foreground">{progress.percentage}% concluído</span>
                </>
              )}
            </div>
          </div>
        </header>
      </Card.Root>

      {/* CARD HISTÓRICO: TRATADO VIA COMPONENTE TRACKHISTORY */}
      <Card.Root>
        <Card.Header className="p-4">
          <Card.Title>Histórico do reparo</Card.Title>
        </Card.Header>
        <Card.Content className="p-6">
          {loading ? (
          // Skeleton Loader (conforme definido anteriormente)
            Array.from({ length: 3 }).map((_, i) => (
              <TrackHistory.Root key={i}>
                <TrackHistory.Indicator icon="Bell" />
                <div className="flex flex-col gap-2 w-full pt-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-12 w-full rounded-lg" />
                </div>
              </TrackHistory.Root>
            ))
          ) : (
            OS_PROGRESS_STAGES.map((stage, index) => {
            // Verifica se este estágio já aconteceu (está no histórico)
              const historyItem = data?.statusHistory?.find(h => h.status === stage);
              const isCurrent = data?.status === stage;
              const isDone = !!historyItem && !isCurrent;
      
              // Se não está no histórico e não é o atual, é um estágio futuro
              const isFuture = !historyItem && !isCurrent;

              // Se o status for CANCELLED, você pode adicionar uma lógica extra, 
              // mas aqui seguimos o fluxo feliz de OS_PROGRESS_STAGES.
      
              const metadata = STATUS_METADATA[stage] || { label: stage, icon: 'Circle' };

              return (
                <TrackHistory.Root key={stage}>
                  {/* Linha conectora: não renderiza no último item da lista */}
                  {index !== OS_PROGRESS_STAGES.length - 1 && (
                    <TrackHistory.ConnectLine />
                  )}

                  <TrackHistory.Indicator 
                    icon={metadata.icon}
                    done={isDone}
                    isCurrent={isCurrent}
                  />

                  <TrackHistory.Content 
                    label={metadata.label}
                    date={historyItem ? format(new Date(historyItem.createdAt), "dd/MM/yyyy · HH:mm") : undefined}
                    note={historyItem?.notes || undefined}
                  />
                </TrackHistory.Root>
              );
            })
          )}
        </Card.Content>
      </Card.Root>

      {/* CARD DETALHES DO APARELHO */}
      <Card.Root className="mt-4">
        <Card.Header className="p-4">
          <Card.Title>Aparelho na assistência</Card.Title>
        </Card.Header>
        <Card.Content>
          <ul className="flex flex-col">
            {[
              { label: 'Modelo', value: device ? `${device.model} · ${device.brand}` : null },
              { label: 'Acessórios', value: accessories?.length > 0 ? accessories.join(' · ') : 'Nenhum' },
              { label: 'Recebido em', value: createdAt ? new Date(createdAt).toLocaleDateString() : null },
              { label: 'Técnico responsável', value: technician?.name }
            ].map((item, idx) => (
              <li key={idx} className={`flex justify-between py-2 ${idx !== 3 ? 'border-b border-outline' : ''}`}>
                <span className="text-sm">{item.label}</span>
                {loading ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  <span className="text-sm font-semibold">{item.value}</span>
                )}
              </li>
            ))}
          </ul>
        </Card.Content>
      </Card.Root>

      {/* CARD RESUMO DO PEDIDO */}
      {(loading || items.length > 0 || total !== null) && (
        <Card.Root>
          <Card.Header className="p-4">
            <Card.Title>Resumo do pedido</Card.Title>
          </Card.Header>
          <Card.Content>
            {loading ? (
              <div className="flex flex-col gap-3 px-4 pb-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
                <div className="flex justify-between mt-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            ) : (
              <ul className="flex flex-col">
                {items.map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center py-2 border-b border-outline px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-xs text-card-foreground bg-muted px-1.5 py-0.5 rounded">×{item.quantity}</span>
                    </div>
                  </li>
                ))}
                {!isWarranty && subtotal != null && (
                  <li className="flex justify-between py-2 border-b border-outline px-4">
                    <span className="text-sm text-card-foreground">Subtotal</span>
                    <span className="text-sm">{formatCurrency(subtotal)}</span>
                  </li>
                )}
                {!isWarranty && discount != null && discount > 0 && (
                  <li className="flex justify-between py-2 border-b border-outline px-4">
                    <span className="text-sm text-card-foreground">Desconto</span>
                    <span className="text-sm text-green-600">- {formatCurrency(discount)}</span>
                  </li>
                )}
                <li className="flex justify-between py-2 px-4">
                  <span className="text-sm font-semibold">Total</span>
                  {isWarranty ? (
                    <span className="text-sm font-semibold text-primary">Coberto pela garantia</span>
                  ) : total != null ? (
                    <span className="text-sm font-bold">{formatCurrency(total)}</span>
                  ) : null}
                </li>
              </ul>
            )}
          </Card.Content>
        </Card.Root>
      )}

      {/* CONTATO (Mantém botões mas esconde dados sensíveis) */}
      <Card.Root>
        <Card.Header className="p-4">
          <Card.Title>Precisa falar com a gente?</Card.Title>
          <Card.Content className="grid md:grid-cols-2 gap-4">
            <a 
              className="flex items-center gap-4 border border-outline rounded-xl p-4 w-full hover:bg-card transition"
              href={!loading ? generateWhatsAppLink(`Olá, gostaria de saber mais sobre a OS #${trackingCode}`) : '#'}
            >
              <div className="size-10 rounded-full flex items-center justify-center bg-[#E7F6ED] shrink-0">
                <WhatsApp className="size-5 text-[#16A34A]" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-card-foreground">Atendimento rápido</span>
                <strong className="text-sm">WhatsApp</strong>
              </div>
            </a>
            <a 
              className="flex items-center gap-4 border border-outline rounded-xl p-4 w-full hover:bg-card transition"
              href={`tel:${appSettings.phone.replace(/\D/g, '')}`}
            >
              <div className="size-10 rounded-full flex items-center justify-center bg-muted text-card-foreground shrink-0">
                <Icon name="Phone" size={16} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-card-foreground">Telefone</span>
                {loading ? <Skeleton className="h-4 w-24" /> : <strong className="text-sm">{appSettings.phone}</strong>}
              </div>
            </a>
          </Card.Content>
        </Card.Header>
      </Card.Root>
    </div>
  )
}