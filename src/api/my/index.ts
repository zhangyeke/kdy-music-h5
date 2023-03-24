/*
 * @Author: zyk 997610780@qq.com
 * @Date: 2022-06-27 16:49:17
 * @LastEditors: 可达鸭 997610780@qq.com
 * @LastEditTime: 2023-03-21 23:25:20
 * @FilePath: \zyk-music-h5\src\api\my\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "@/assets/lib/http";
let tool = useTool();

/**
 * @Author: kkk
 * @description: 收藏的专辑
 * @param {number} limit 一页返回数量
 * @param {number} page 第几页
 * @return {*}
 */
export const collectAlbum = (page: number, limit: number = 30) =>
  axios.get(`/album/sublist?offset=${(page - 1) * limit}&limit=${limit}`);
/**
 * @Author: kkk
 * @description: 收藏的MV
 * @return {*}
 */
export const collectMv = () => axios.get(`/mv/sublist`);

/**
 * @Author: kkk
 * @description: 已购单曲
 * @param {number} limit 一页返回数量
 * @param {number} page 第几页
 * @return {*}
 */
export const purchased = (page: number, limit: number = 30) =>
  axios.get(`/song/purchased?offset=${(page - 1) * limit}&limit=${limit}`);

/**
 * @Author: kkk
 * @description: 云盘
 * @param {number} limit 一页返回数量
 * @param {number} page 第几页
 * @return {*}
 */
export const cloudData = (page: number, limit: number = 30) =>
  axios.get(`/user/cloud?offset=${(page - 1) * limit}&limit=${limit}`);

/**
 * @Author: kkk
 * @description: 获取最近播放
 * @return {*}
 */
export const latelyPlayed = (value: string, limit: number = 300) =>
  axios.get(`/record/recent/${value}?limit=${limit}`);

/**
 * @Author: kkk
 * @description: 获取用户信息 , 歌单，收藏，mv, dj 数量
 * @return {*}
 */
export const userSubcount = () => axios.get("/user/subcount");

/**
 * @Author: kkk
 * @description: 获取本人账号信息
 * @return {*}
 */
export const getUser = () => axios.get("/user/account");

/**
 * @Author: kkk
 * @description: 获取用户详情
 * @param {number} id 用户id 或 账户id
 * @return {*}
 */
export const userDetail = (id: number | string) => axios.get(`/user/detail?uid=${id}`);

/**
 * @Author: kkk
 * @description:关注用户
 * @param {number} id 用户id
 * @param {number} t  1为关注，其他为取消关注
 * @return {*}
 */
export const focusUser = (id: number, t: number | boolean) =>
  axios.get(`/follow?id=${id}&t=${t}`);

  /**
 * @Author: kkk
 * @description:收藏/取消收藏歌手
 * @param {number} id 歌手 id
 * @param {number} t  1 为收藏,其他为取消收藏
 * @return {*}
 */
export const focusSinger = (id: number, t: number | boolean) =>
axios.get(`/artist/sub?id=${id}&t=${t}`);


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

/**
 * @Author: kkk
 * @description: 获取用户关注列表
 * @param {number} id 用户id
 * @param {number} page 第几页
 * @param {number} limit 一页返回数量
 * @return {*}
 */
export const getFollows = (id: number, page: number = 1, limit: number = 30) =>

  axios.get(
    `/user/follows?uid=${id}&limit=${limit}&offset=${(page - 1) * limit}`
  );
/**
 * @Author: kkk
 * @description: 获取关注的歌手列表
 * @param {number} page 第几页
 * @param {number} limit 一页返回数量
 * @return {*}
 */
export const followSingers = (page: number = 1, limit: number = 30) =>

  axios.get(
    `/artist/sublist?limit=${limit}&offset=${(page - 1) * limit}`
  );

/**
 * @Author: kkk
 * @description: 获取用户的粉丝列表
 * @param {number} id
 * @param {number} lasttime
 * @param {number} limit
 * @return {*}
 */
export const getUserFans = (id: number, page: number, limit: number = 30) =>
  axios.get(
    `/user/followeds?uid=${id}&limit=${limit}&offset=${(page - 1) * limit}`
  );
