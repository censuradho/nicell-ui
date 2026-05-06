import type { IconNames } from "@/components/icons"

export const DEVICE_TYPES = {
  SMARTPHONE:  'SMARTPHONE',
  TABLET:      'TABLET',
  NOTEBOOK:    'NOTEBOOK',
  PC:          'PC',
  CONSOLE:     'CONSOLE',
  SMART_WATCH: 'SMART_WATCH',
  OTHER:       'OTHER',
} as const

export type DeviceTypeKey = keyof typeof DEVICE_TYPES

export const DEVICE_TYPES_LABELS: Record<DeviceTypeKey, string> = {
  SMARTPHONE:  'Celular',
  TABLET:      'Tablet',
  NOTEBOOK:    'Notebook',
  PC:          'PC',
  CONSOLE:     'Console',
  SMART_WATCH: 'Smart Watch',
  OTHER:       'Outro',
} as const

export const DEVICE_TYPES_OPTIONS = Object.entries(DEVICE_TYPES).map(([key, value]) => ({
  label: DEVICE_TYPES_LABELS[key as DeviceTypeKey],
  value,
}))


export const DEVICE_TYPE_ICONS: Record<DeviceTypeKey, IconNames> = {
  SMARTPHONE:  'Smartphone',
  TABLET:      'Tablet',
  NOTEBOOK:    'Laptop',
  PC:          'Cpu',
  CONSOLE:     'Gamepad2',
  SMART_WATCH: 'Watch',
  OTHER:       'Monitor',
} as const

export const DEVICE_TYPE_LIST = (Object.keys(DEVICE_TYPES) as DeviceTypeKey[]).map((key) => ({
  value: DEVICE_TYPES[key],
  label: DEVICE_TYPES_LABELS[key],
  icon:  DEVICE_TYPE_ICONS[key],
}))
