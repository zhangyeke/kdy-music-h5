import {User} from "@/types/user"
export interface Comment{
  commentId:number,//评论id
  content:string,
  user:User,
  timeStr:string,//时间格式化
  time:number,//时间戳
  needDisplayTime:boolean,//是否需要展示时间
  liked:boolean,//是否点赞
  likedCount:number,//点赞数
  [key:string]:any
}