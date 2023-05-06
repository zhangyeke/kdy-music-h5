export interface styleCate{
  tagName:string,
  tagId:number | string,
  showText?:string,
  enName:string,
  picUrl:string,
  tabs?:string[],
  colorDeep:string,
  colorShallow:string,
  childrenTags?:styleCate[],
  preferences?:any
  [key:any]:any
}

export interface songStyle {
  artistNum: string | number; //艺人数量
  colorDeep: string;
  colorShallow: string;
  desc: string; //描述
  name: string;
  songNum: string | number; //歌曲数量
  tagId: string | number;
  cover: string[],//封面
  enName:string,
  [key:any]:any
}