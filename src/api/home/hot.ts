import axios from "@/assets/lib/http";

/**
 * @Author: kkk
 * @description: 获取热搜列表
 * @param type 1：简略 2：详细
 * @return
 */
export const getHot = (type:number|string=2)=>{
  if(type == 1){
    return axios.get("/search/hot");
  }
  if(type == 2){
    return axios.get('/search/hot/detail')
  }
}

/**
 * @Author: kkk
 * @description: 获取热门话题
 * @param limit:一页的数量
 * @param page:页码 第几页
 * @return {*}
 */
export const getHopic = (limit:number = 10,page:number = 1) => axios.get(`/hot/topic?limit=${limit}&offset=${(page-1)*limit}`)

/**
 * @Author: kkk
 * @description: 获取热门
 * @param limit:一页的数量
 * @param page:页码
 * @return {*}
 */
export const getHotRadio = (limit:number = 20,page:number = 1) => axios.get(`/dj/hot?limit=${limit}&offset=${(page-1)*limit}`)


/**
 * @Author: kkk
 * @description: 获取热门歌单分类
 * @return {*}
 */
export const getHotPlaylist = () => axios.get(`/playlist/hot`)

