import { cn } from '@/lib/utils'
import { TextareaHTMLAttributes } from 'react'

const base =
  'w-full border rounded-xl px-4 py-3.5 text-base outline-none ' +
  'focus:ring-4 transition placeholder:text-card-foreground/60 resize-none'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  errorMessage?: string
}

export function Textarea({ label, errorMessage, className, id, ...props }: TextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  const hasError = !!errorMessage

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        {...props}
        className={cn(
          base,
          hasError
            ? 'border-destructive focus:border-destructive focus:ring-destructive/10'
            : 'border-outline focus:border-primary focus:ring-primary/10',
          className,
        )}
      />
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  )
}
