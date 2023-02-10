
// 歌单分类
export interface SongsCategory {
  name:string,
  id:number,
  hot:boolean,//是否热门
  type:number,
  category:number,//归属哪个大分类
  [key:string]:any
}

// 歌单
export interface SongsList {
  name:string,//歌单名称
  id:number,//歌单id
  picUrl:string,//封面
  playcount:number,//播放数量
  [key:string]:any
}