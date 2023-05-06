/*
 * @Author: zyk 997610780@qq.com
 * @Date: 2023-04-13 10:17:13
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-04-14 15:46:36
 * @FilePath: \zyk-music-h5\src\api\public\music-style.ts
 * @Description: 曲风相关接口
 */
import axios from "@/assets/lib/http";
let tool = useTool()
/**
 * @Author: kkk
 * @description: 获取我的曲风偏好
 * @return {*}
 */
 export const preference = ()=> axios.get('/style/preference')

/**
 * @Author: kkk
 * @description: 获取曲风列表及其对应的 tagId
 * @return {*}
 */
export const styleList = ()=> axios.get('/style/list')

/**
 * @Author: kkk
 * @description: 获取曲风详情
 * @param {number} tagId 曲风id
 * @return {*}
 */
 export const styleDetail = (tagId:number|string)=> axios.get(`/style/detail?tagId=${tagId}`)

 /**
 * @Author: kkk
 * @description: 获取曲风歌曲、艺人、专辑、歌单
 * @param {string} apiname 接口名称
 * @param {number} tagId 曲风id
 * @return {*}
 */
  export const styleData = (
    apiname: string,
    tagId: string | number,
    cursor: number
  ) => axios.get(`/style/${apiname}?tagId=${tagId}&cursor=${cursor}`);
