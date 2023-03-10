/*
 * @Author: 可达鸭 997610780@qq.com
 * @Date: 2023-02-07 22:02:17
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-02-24 18:17:46
 * @FilePath: \zyk-music-h5\src\api\public\album.ts
 * @Description: 专辑相关的接口
 */
import axios from "@/assets/lib/http";
let tool = useTool()

/**
 * @Author: kkk
 * @description: 获取专辑详情
 * @param {number} id 专辑id
 * @return {*}
 */
export const getAlbumDetail = (id:number|string)=> axios.get(`/album?id=${id}`)


/**
 * @Author: kkk
 * @description:收藏专辑 
 * @param {*} id 专辑id 
 * @param {*} t 1为收藏 其他为取消
 * @return {*}
 */
export const collectAlbum = <P extends Object>(params:P)=> axios.get(`/album/sub${tool.obj2str(params)}`)

/**
 * @Author: kkk
 * @description:专辑动态信息,如是否收藏,收藏数,评论数,分享数
 * @param {*} id 专辑id 
 * @return {*}
 */
 export const albumInfo = (id:number)=> axios.get(`/album/detail/dynamic?id=${id}`)