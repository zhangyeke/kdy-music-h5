import {Artist,User} from "./user"
// 音乐
export interface Song {
  id:number,
  name:string,
  [key:string]:any
}
// 新音乐
export interface NewSong extends Song{
  picUrl:string,//图片
  type:number,
  song:Song,//音乐详情
  copywriter:string,//文案
}
// 专辑
export interface Album {
  artist:Artist,//专辑作者
  name:string,//专辑名称
  id:number,//专辑id
  copyrightId:number,//版权id
  publishTime:number,//发布时间
  size:number,//大小？
  status:number,//状态
}

// 单曲
export interface Single{
  album:Album,//所属专辑
  artists: Artist[],
  copyrightId:number,//版权id
  id:number,//单曲id
  name:string,//单曲名称
  [key:string]:any
}


// 歌单
export interface Playlist{
  id:number,//歌单id
  name:string,//歌单名称
  bookCount:number,//订阅数量
  subscribed:boolean,//是否订阅
  coverImgUrl:string,//封面
  creator:User,//创建歌单的用户
  description:string,//描述
  playCount:number,//播放数量
  trackCount:number,//歌曲数量
  track?:Single,//单曲
  [key:string]:any
}