import { ButtonProps } from "@varlet/ui"

export interface ButtonAttr extends ButtonProps {
  txt?: string;
}

export interface detailPopupProps {
  modelValue?: boolean
  des?:string,
  title?:string,
  subtitle?:string,
  cover?:string,
  showTag?:boolean,
  btns?: ButtonAttr[],
  isMy?:boolean
  tags?:string[],
  params?:any[],
}