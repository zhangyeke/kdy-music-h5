import axios from "@/assets/lib/http";

/**
 * @Author: kkk
 * @description: 获取用户信息
 * @return {*}
 */
export const getUser = ()=> axios.get("/user/account")


/**
 * @Author: kkk
 * @description: 
 * @param {number} id 用户id
 * @param {number} t  1为关注，其他为取消关注
 * @return {*}
 */
export const focusUser = (id:number,t:number | boolean)=> axios.get(`/follow?id=${id}&t=${t}`)