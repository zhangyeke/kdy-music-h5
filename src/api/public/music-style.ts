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
