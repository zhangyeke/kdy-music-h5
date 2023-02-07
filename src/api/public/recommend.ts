/*
 * @Author: 可达鸭 997610780@qq.com
 * @Date: 2023-02-07 21:42:19
 * @LastEditors: 可达鸭 997610780@qq.com
 * @LastEditTime: 2023-02-07 21:54:24
 * @FilePath: \zyk-music-h5\src\api\public\recommend.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "@/assets/lib/http";
let tool = useTool()

/**
 * @Author: kkk
 * @description: 每日推荐歌曲 --需要登录
 * @return {*}
 */
export const getEveryRmdMusic = ()=> axios.get(`/recommend/songs`)

/**
 * @Author: kkk
 * @description: 推荐歌单
 * @param {limit} 取出数量
 * @return {*}
 */
export const getRmdSongList = (limit:number)=> axios.get(`/personalized?limit=${limit}`)


/**
 * @Author: kkk
 * @description: 推荐新音乐
 * @return {*}
 */
export const getNewMusic = (limit:number = 10) => axios.get(`/personalized/newsong?limit=${limit}`)