import { icons } from './icons';

export type IconNames = keyof typeof icons;

export interface IconProps  {
  name: IconNames;
  className?: string
  size?: number | string
}

export function Icon (props: IconProps) {
  const { name, className, size } = props;
  const Component = icons[name];

  return (
    <Component 
      className={className} 
      size={size}
    />
  )
}