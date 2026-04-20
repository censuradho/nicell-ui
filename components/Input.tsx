import { cn } from '@/lib/utils'
import { InputHTMLAttributes } from 'react'

const base =
  'w-full border rounded-xl px-4 py-3.5 text-base outline-none ' +
  'focus:ring-4 transition placeholder:text-card-foreground/60'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errorMessage?: string
  ref?: any
  className?: string
  renderLabel?: boolean
}

export function Input({ label, errorMessage, className, id, renderLabel = true, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  const hasError = !!errorMessage

  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && renderLabel && (
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-label={label}
        {...props}
        className={cn(
          base,
          hasError
            ? 'border-destructive focus:border-destructive focus:ring-destructive/10'
            : 'border-outline focus:border-primary focus:ring-primary/10',
        )}
      />
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  )
}
