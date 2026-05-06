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

type OSStatus = typeof OS_STATUS[keyof typeof OS_STATUS]

export interface ServiceOrderTrackingResponse {
    trackingCode: string,
    displayId: number,
    status: OSStatus,
    estimatedDelivery: string,
    createdAt: string,
    partner: { name: string }
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
}