import axios from "@/assets/lib/http";
let tool = useTool();
/**
 * @Author: kkk
 * @description: 获取歌手详情
 * @param {number} id 歌手id
 * @return {*}
 */
 export const getSingerDetail = (id:number) => axios.get(`/artist/detail?id=${id}`)

 /**
  * @Author: kkk
  * @description: 获取歌手描述
  * @param {number} id 歌手id
  * @return {*}
  */
 export const getSingerDes = (id:number) => axios.get(`/artist/desc?id=${id}`)

 /**
  * @Author: kkk
  * @description: 获取歌手粉丝
  * @param {number} id 歌手id
  * @return {*}
  */
 export const getSingerFans = (id:number) => axios.get(`/artist/fans?id=${id}`)

/**
 * @Author: kkk
 * @description: 获取歌手热门50首歌曲
 * @param {number} id 歌手id
 * @return {*}
 */
export const getSingerHotSong = (id:number) => axios.get(`/artist/top/song?id=${id}`)

/**
 * @Author: kkk
 * @description: 获取歌手全部歌曲
 * @param {*} id : 歌手 id
 * @param {*} order : hot ,time 按照热门或者时间排序
 * @param {*} limit: 取出歌单数量 , 默认为 50
 * @param {*} offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 * @return {*} 
 */
export const getSingerAllSong = <P>(params:P) => axios.get(`/artist/songs/song${tool.obj2str(params)}}`)

/**
 * @Author: kkk
 * @description: 获取歌手专辑
 * @param {number} id 歌手id
 * @param {number} limit 取出的数量
 * @return {*}
 */
export const getSingerAlbum = (id: number, limit: number = 300) =>
  axios.get(`/artist/album?id=${id}&limit=${limit}`);
