import axios from "@/assets/lib/http";

/**
 * @Author: kkk
 * @description: 获取音乐url
 * @param 歌曲id
 * @return {*}
 */
export const getMusicUrl = (id:number|string)=> axios.get(`/song/url?id=${id}`)
/**
 * @Author: kkk
 * @description: 获取音乐详情
 * @param ids 歌曲id 可以传多个 用,分开
 * @return {*}
 */
export const getMusicDetail = (ids:number|string)=> axios.get(`/song/detail?ids=${ids}`)


/**
 * @Author: kkk
 * @description: 获取歌曲评论
 * @param {object} param1
 * @return {*}
 */
export const getMusicComment = ({id,limit = 20,page = 1}:{id:number,limit?:number,page?:number}) => axios.get(`/comment/music?id=${id}&offset=${(page-1)*limit}`)


/**
 * @Author: kkk
 * @description: 
 * @param {op} 从歌单增加单曲为 add, 删除为 del
 * @param {pid} 歌单id
 * @param {tracks} 歌曲id 可多个,用逗号隔开
 * @return {*}
 */
export const handlePlaylist = ({
  op,
  pid,
  tracks,
}: {
  op: string;
  pid: number | string;
  tracks: number | string[] | string;
}) => axios.get(`/playlist/tracks?op=${op}&pid=${pid}&tracks=${tracks}`);