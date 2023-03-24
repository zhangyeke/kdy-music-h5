/*
 * @Author: zyk 997610780@qq.com
 * @Date: 2023-03-24 10:41:57
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-03-24 10:42:58
 * @FilePath: \zyk-music-h5\src\api\public\rank.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "@/assets/lib/http";
let tool = useTool();

/**
 * @Author: kkk
 * @description: 获取所有榜单
 * @return {*}
 */
export const allRank = () => axios.get(`/toplist`);
