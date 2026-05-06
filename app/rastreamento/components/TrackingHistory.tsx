import { Icon, IconNames } from "@/components/icons"
import { PropsWithChildren } from "react"

function ConnectLine () {
  return (
    <div className="absolute left-[17px] top-9 bottom-0 w-0.5 bg-outline" />
  )
}

interface IndicatorProps {
  isCurrent?: boolean
  done?: boolean
  icon: IconNames
}

function Indicator({ isCurrent, done, icon }: IndicatorProps) {
  // 1. Estado Concluído (Done)
  if (done) {
    return (
      <div className="z-10 flex items-center justify-center min-w-9 min-h-9 h-9 w-9 rounded-full bg-primary border-2 border-primary text-primary-foreground shadow-sm">
        <Icon name="Check" size={16} />
      </div>
    );
  }

  // 2. Estado Atual (Current) - Com pulse apenas no fundo
  if (isCurrent) {
    return (
      <div className="relative z-10 flex items-center justify-center min-w-9 min-h-9 h-9 w-9">
        {/* Camada de animação (Background apenas) */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        
        {/* Círculo Principal Estático */}
        <div className="relative size-full rounded-full bg-background border-2 border-primary text-primary flex items-center justify-center shadow-sm">
          <Icon name={icon} size={16} />
        </div>
      </div>
    );
  }

  // 3. Estado Futuro (Default/Pending)
  return (
    <div className="z-10 flex items-center justify-center min-w-9 min-h-9 h-9 w-9 rounded-full bg-muted border-2 border-outline text-card-foreground/50 opacity-50">
      <Icon name={icon} size={16} />
    </div>
  );
}

interface ContentProps {
  date?: string
  label: string
  note?: string
}

function Content ({ date, label, note }: ContentProps) {
  return (
    <div className="flex flex-col gap-1 pt-1">
      <h3 className="text-sm font-semibold">{label}</h3>
      {date && <span className="text-[10px] font-mono text-card-foreground">{date}</span>}
      {note && (
        <p className="text-sm text-card-foreground mt-1 bg-muted p-3 rounded-lg">
          {note}
        </p>
      )}
    </div>
  )
}

function Root ({ children }: PropsWithChildren) {
  return (
    <div className="relative flex gap-4 pb-8">
      {children}
    </div>
  )
}


export {
  ConnectLine,
  Indicator,
  Content,
  Root
}