import {Artist,User,Anchor} from "./user"
// 音乐
export interface Song {
  id:number,
  name:string,
  al:Album,
  alia:string[],
  ar:Artist[],
  originCoverType:number,
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
  artists:Artist[],//专辑作者数组
  name:string,//专辑名称
  id:number,//专辑id
  copyrightId:number,//版权id
  publishTime:number,//发布时间
  size:number,//大小？
  status:number,//状态
  picUrl:string,//封面
  onSale:boolean,//是否出售
  alias:string[],//别名数组
  description:string,//描述
  paid:boolean,//是否支付
  [key:string]:any,
}

// 单曲
export interface Single{
  album:Album,//所属专辑
  artists: Artist[],
  copyrightId:number,//版权id
  id:number,//单曲id
  name:string,//单曲名称
  lyrics?:Lyric,//歌词
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
  privacy:boolean,//是否隐私
  userId:number,//创建人id
  [key:string]:any
}

// 播客
export interface Podcast{
  dj:Anchor,//主播
  id:number,
  name:string,//名称
  picUrl:string,//封面
  playCount:number,//播放量
  desc:string,//描述
  shareCount:number,//分享数量
  commentCount:number,//评论数量
  buyed:boolean,//是否购买
  createTime:number,//创建时间
  categoryId:number,//分类一id
  category:string,//分类一名称
  secondCategoryId?:number,//分类二 id
  secondCategory?:string,//分类二名称
  [key:string]:any
}

// 歌词
export interface Lyric {
  txt:string,//富文本
  [key:string]:any
}