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
  name:string,
  id:number,
  [key:string]:any
}