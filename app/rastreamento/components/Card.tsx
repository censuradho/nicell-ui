import { cn } from "@/lib/utils"
import { PropsWithChildren } from "react"

interface ClassName {
  className?: string
}

function Root ({
  children,
  className
}: PropsWithChildren<ClassName>) {
  return (
    <section className={cn(
      'border border-outline bg-background w-full rounded-lg',
      className
    )}>
      {children}
    </section>
  )
}

function Header ({
  children,
  className
}: PropsWithChildren<ClassName>) {
  return (
    <header className={cn(
      '',
      className
    )}>
      {children}
    </header>
  )
}

function Content ({
  children,
  className
}: PropsWithChildren<ClassName>) {
  return (
    <div className={cn(
      'p-4',
      className
    )}>
      {children}
    </div>
  )
}

function Title ({
  children,
  className
}: PropsWithChildren<ClassName>) {
  return (
    <h2 className={cn(
      'text-xs uppercase font-bold text-foreground',
      className
    )}>
      {children}
    </h2>
  )
} 
export {
  Root,
  Header,
  Content,
  Title
}