import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

const variants = {
  fill:  'bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90',
  ghost: 'bg-card text-foreground hover:bg-outline focus:bg-outline',
  text:  'text-primary',
} as const

const sizes = {
  sm: 'text-xs h-[32px] px-[14px]',
  md: 'text-base font-medium h-[49px] px-8',
} as const

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export function Button({
  children, className, variant = 'fill', size = 'md', type = 'button', ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={type}
      {...props}
      className={cn(
        'outline-none whitespace-nowrap flex items-center gap-2 leading-none rounded-full cursor-pointer transition-colors duration-200 w-max disabled:opacity-40 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </button>
  )
}
