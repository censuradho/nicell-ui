import { cn } from "@/lib/utils";
import { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { Icon, IconNames } from "./icons";

const variants = {
  fill: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90',
  text: 'text-primary',
  white: 'bg-white text-[#1d1d1f] hover:bg-[#f5f5f7] focus:bg-[#f5f5f7]',
} as const

const sizes = {
  sm: 'text-xs h-[32px] px-[14px]',
  md: 'text-lg h-[49px] px-[22px]',
}

interface AnchorButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  headIcon?: IconNames
}

export function AnchorButton(props: PropsWithChildren<AnchorButtonProps>) {
  const {
    children,
    className,
    variant = 'fill',
    size = 'md',
    headIcon,
    ...otherProps
  } = props

  const currentVariant = variants[variant]
  const currentSize = sizes[size]

  return (
    <a
      {...otherProps}
      className={cn(
        'outline-none whitespace-nowrap flex items-center gap-2 leading-none rounded-full cursor-pointer transition-colors duration-200 w-max',
        currentVariant,
        currentSize,
        className,
      )}
    >
      {children}
      {headIcon && (
        <Icon name={headIcon} size={16} />
      )}
    </a>
  )
}
