/*
 * @Author: 可达鸭 997610780@qq.com
 * @Date: 2023-03-13 22:37:25
 * @LastEditors: 可达鸭 997610780@qq.com
 * @LastEditTime: 2023-03-13 22:39:58
 * @FilePath: \zyk-music-h5\src\types\video.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {User} from "./user";

export interface Video {
  vid:number,
  title:string,
  coverUrl:string,
  creator:User | User[],
  playTime:number,
  durationms:number,
  type:number
}