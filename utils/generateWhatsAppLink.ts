import { appSettings } from "@/config/app"

export function generateWhatsAppLink(message: string, phone: string = appSettings.phone) {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encodedMessage}`
}

