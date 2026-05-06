import { icons } from './icons';

export type IconNames = keyof typeof icons;

export interface IconProps  {
  name: IconNames;
  className?: string
  size?: number | string
  onClick?: () => void
}

export function Icon (props: IconProps) {
  const { name, className, size, onClick } = props;
  const Component = icons[name];

  return (
    <Component 
      className={className} 
      style={{
        width: size,
        height: size
      }}
      onClick={onClick}
    />
  )
}