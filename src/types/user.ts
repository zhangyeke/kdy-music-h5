export interface User {
  nickname: string;
  userId: number | string;
  userName: string;
  avatarUrl: string;//头像
  backgroundUrl: string;//背景墙图片
  followed: boolean;
  gender: number;//性别 1男 2女
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
// 主播-播客
export interface Anchor extends User{
  signature:string,//个人简介
  mutual:boolean,//相互关注?
  followed:boolean,//是否关注
  [key:string]:any
}