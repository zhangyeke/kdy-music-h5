import axios from "@/assets/lib/http";

/**
 * @Author: kkk
 * @description: 获取用户信息
 * @return {*}
 */
export const getUser = ()=> axios.get("/user/account")