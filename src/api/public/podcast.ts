/*
 * @Author: zyk 997610780@qq.com
 * @Date: 2023-04-11 11:46:02
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-04-11 11:58:40
 * @FilePath: \zyk-music-h5\src\api\public\podcast.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "@/assets/lib/http";
import { Paging } from "@/types/public";

let tool = useTool();

/**
 * @Author: kkk
 * @description: 获取电台节目
 * @param {number} id 电台id
 * @return {*}
 */
export const programList = (id: number | string, paging: Paging) =>
  axios.get(
    `/dj/program?rid=${id}&limit=${paging.limit}&offset=${
      (paging.page - 1) * paging.limit
    }`
  );

/**
 * @Author: kkk
 * @description: 获取电台详情
 * @param {number} id 电台id
 * @return {*}
 */
export const radioDetail = (id: number | string) =>
  axios.get(`/dj/detail?rid=${id}`);

/**
 * @Author: kkk
 * @description: 获取节目详情
 * @param {number} id 节目id
 * @return {*}
 */
 export const programDetail = (id: number | string) =>
 axios.get(`/dj/program/detail?id=${id}`);

