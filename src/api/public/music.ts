

/*
 * @Author: zyk 997610780@qq.com
 * @Date: 2022-06-27 16:49:17
 * @LastEditors: 可达鸭 997610780@qq.com
 * @LastEditTime: 2023-02-07 22:03:39
 * @FilePath: \zyk-music-h5\src\api\public\music.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "@/assets/lib/http";
let tool = useTool()
/**
 * @Author: kkk
 * @description: 获取音乐url
 * @param 歌曲id
 * @return {*}
 */
export const getMusicUrl = (id:number|string)=> axios.get(`/song/url?id=${id}`)
/**
 * @Author: kkk
 * @description: 获取音乐详情
 * @param ids 歌曲id 可以传多个 用,分开
 * @return {*}
 */
export const getMusicDetail = (ids:number|string)=> axios.get(`/song/detail?ids=${ids}`)


/**
 * @Author: kkk
 * @description:获取歌词
 * @param {*} id 音乐id 
 * @return {*}
 */
export const getLyrics = (id:number | string)=> axios.get(`/lyric/new?id=${id}`)

/**
 * @Author: kkk
 * @description:最近播放-歌曲
 * @param {*} limit 返回数量 , 默认为 100
 * @return {*}
 */
 export const latelyPlay = (limit:number | string = 100)=> axios.get(`/record/recent/song?limit=${limit}`)