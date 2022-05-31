import axios from "@/assets/lib/http";

/**
 * @Author: kkk
 * @description: 获取用户信息
 * @return {*}
 */
export const getUser = ()=> axios.get("/user/account")


/**
 * @Author: kkk
 * @description:关注用户
 * @param {number} id 用户id
 * @param {number} t  1为关注，其他为取消关注
 * @return {*}
 */
export const focusUser = (id:number,t:number | boolean)=> axios.get(`/follow?id=${id}&t=${t}`)


/**
 * @Author: kkk
 * @description: 获取用户歌单
 * @param {number} id  用户id
 * @param {number} limit 一页返回数量
 * @param {number} page 第几页
 * @return {*}
 */
export const getUserPlaylist = (
  id: number,
  page: number = 1,
  limit: number = 30
) =>
  axios.get(
    `/user/playlist?uid=${id}&limit=${limit}&offset=${(page - 1) * limit}`
  );