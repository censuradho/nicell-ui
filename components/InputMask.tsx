import { useIMask } from "react-imask";
import { Input, InputProps } from "./Input";
import { useImperativeHandle } from "react";

const masks = {
  phone: '(00) 00000-0000'
}

interface InputMaskProps extends InputProps {
  mask: keyof typeof masks
}

export function InputMask (props: InputMaskProps) {
  const { mask, ref: externalRef, ...otherProps } = props

  const currentMask = masks[mask];

  const {
    ref: maskInputRef,
  } = useIMask({
    mask: currentMask,
  })

  useImperativeHandle(externalRef, () => maskInputRef.current as HTMLInputElement);

  return (
    <Input
      ref={maskInputRef}
      {...otherProps} 
    />
  )
}