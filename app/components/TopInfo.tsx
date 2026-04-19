import { appSettings } from "@/config/app";

export function TopInfo() {

  return (
    <div className="bg-card text-card-foreground  px-4 py-2">
      <div className="container flex items-center justify-between text-xs">
        <p className="text-card-foreground">Atendimento de seg. a sáb. — 9h às 19h</p>
        <aside className="flex items-center gap-2">
          <a className="anchor" href={`tel:${appSettings.phone}`}>Contato</a>
          <span>·</span>
          <a 
            className="anchor" 
            href={`https://wa.me/${appSettings.phone}`}
            target="_blank"
            rel="noopener noreferrer"
          >WhatsApp</a>
        </aside>
      </div>
    </div>
  )
}