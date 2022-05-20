export interface Song {
  id:number,
  name:string,
  [key:string]:any
}

export interface NewSong extends Song{
  picUrl:string,//图片
  type:number,
  song:Song,//音乐详情
  copywriter:string,//文案
}