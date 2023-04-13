export interface styleCate{
  tagName:string,
  tagId:number | string,
  showText:string,
  enName:string,
  picUrl:string,
  tabs:string[],
  colorDeep:string,
  colorShallow:string,
  childrenTags?:styleCate[]
  [key:any]:any
}