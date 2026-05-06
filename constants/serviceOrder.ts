import type { IconNames } from '@/components/icons';

export const OS_STATUS = {
  AWAITING_PICKUP: 'AWAITING_PICKUP',
  IN_TRANSIT_TO_LAB: 'IN_TRANSIT_TO_LAB',
  UNDER_ANALYSIS: 'UNDER_ANALYSIS',
  WAITING_APPROVAL: 'WAITING_APPROVAL',
  IN_REPAIR: 'IN_REPAIR',
  READY_FOR_DELIVERY: 'READY_FOR_DELIVERY',
  IN_TRANSIT_TO_USER: 'IN_TRANSIT_TO_USER',
  FINISHED: 'FINISHED',
  CANCELLED: 'CANCELLED',
  PENDING: 'PENDING',
} as const;

export const OS_STATUS_LABELS = {
  [OS_STATUS.AWAITING_PICKUP]: 'Aguardando retirada',
  [OS_STATUS.IN_TRANSIT_TO_LAB]: 'Em trânsito para o laboratório',
  [OS_STATUS.UNDER_ANALYSIS]: 'Em análise',
  [OS_STATUS.WAITING_APPROVAL]: 'Aguardando aprovação',
  [OS_STATUS.IN_REPAIR]: 'Em reparo',
  [OS_STATUS.READY_FOR_DELIVERY]: 'Pronto para entrega',
  [OS_STATUS.IN_TRANSIT_TO_USER]: 'Em trânsito para o usuário',
  [OS_STATUS.FINISHED]: 'Finalizado',
  [OS_STATUS.CANCELLED]: 'Cancelado',
  [OS_STATUS.PENDING]: 'Pendente',
} as const

export const OS_PROGRESS_STAGES = [
  OS_STATUS.PENDING,
  OS_STATUS.UNDER_ANALYSIS,
  OS_STATUS.WAITING_APPROVAL,
  OS_STATUS.IN_REPAIR,
  OS_STATUS.READY_FOR_DELIVERY,
  OS_STATUS.FINISHED,
]

export const PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
} as const;

export const PRIORITY_LABELS = {
  [PRIORITY.LOW]: 'Baixa',
  [PRIORITY.MEDIUM]: 'Média',
  [PRIORITY.HIGH]: 'Alta',
} as const

export const PRIORITY_OPTIONS = Object.entries(PRIORITY_LABELS).map(([value, label]) => ({
  value,
  label
}) as const)

export const SERVICE_ORDER_TYPE = {
  NORMAL: 'NORMAL',
  WARRANTY: 'WARRANTY',
  RETOUCH: 'RETOUCH',
} as const;

export type ServiceOrderType = typeof SERVICE_ORDER_TYPE[keyof typeof SERVICE_ORDER_TYPE]

export const SERVICE_ORDER_TYPE_LABELS = {
  [SERVICE_ORDER_TYPE.NORMAL]: 'Normal',
  [SERVICE_ORDER_TYPE.WARRANTY]: 'Garantia',
  [SERVICE_ORDER_TYPE.RETOUCH]: 'Retoque',
} as const

export const SERVICE_ORDER_TYPE_OPTIONS = Object.entries(SERVICE_ORDER_TYPE).map(([ key, value ]) => ({
  value,
  label: SERVICE_ORDER_TYPE_LABELS[key as ServiceOrderType]
}) as const)


export const getOSProgress = (status: string) => {
  const currentStep = OS_PROGRESS_STAGES.indexOf(status as typeof OS_PROGRESS_STAGES[number]) + 1;
  const totalSteps = OS_PROGRESS_STAGES.length;

  // Tratativa para status que estão fora da linha de progresso
  if (currentStep === 0) {
    return {
      current: 0,
      total: totalSteps,
      percentage: 0,
      label: 'Exceção/Pendente'
    };
  }

  return {
    current: currentStep,
    total: totalSteps,
    percentage: Math.round((currentStep / totalSteps) * 100),
  };
};