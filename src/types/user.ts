export interface User {
  nickname: string;
  userId: number;
  userName: string;
  avatarUrl: string;
  backgroundUrl: string;
  [key: string]: any;
}

// 艺术家
export interface Artist {
  name:string,//名字
  id:number,//id
  picId:number,//头像图片id
  picUrl:string,//头像
  followed:boolean,//是否关注
  accountId:number,//账户id
  [key:string]:any
}