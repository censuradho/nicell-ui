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
};

export const SERVICE_ORDER_TYPE = {
  NORMAL: 'NORMAL',
  WARRANTY: 'WARRANTY',
  RETOUCH: 'RETOUCH', // Opcional: quando é um ajuste que não chega a ser garantia
} as const

type OSStatus = typeof OS_STATUS[keyof typeof OS_STATUS]
export type ServiceOrderType = typeof SERVICE_ORDER_TYPE[keyof typeof SERVICE_ORDER_TYPE]
export interface ServiceOrderTrackingResponse {
    trackingCode: string,
    displayId: number,
    status: OSStatus,
    estimatedDelivery: string,
    type: ServiceOrderType,
    createdAt: string,
    accessories: string[]
    partner: { name: string }
    subtotal: number | null;
    total: number | null;
    discount: number | null;
    serviceValue: number | null;
    warrantyExpiry: string | null;
    technician: {
        name: string,
    }
    device: {
        brand: string,
        model: string
        type: string
    },
    statusHistory: [
        {
            status: OSStatus,
            notes: string | null,
            createdAt: string
        }
    ]
    items: Array<{
        name: string,
        quantity: number,
    }>
}