/*
 * @Author: 可达鸭 997610780@qq.com
 * @Date: 2023-02-07 21:57:44
 * @LastEditors: 可达鸭 997610780@qq.com
 * @LastEditTime: 2023-02-26 14:48:13
 * @FilePath: \zyk-music-h5\src\api\public\playlist.ts
 * @Description: 歌单相关的接口
 */
import axios from "@/assets/lib/http";
let tool = useTool();

/**
 * @Author: kkk
 * @description: 歌单 ( 网友精选碟 )
 * @param {cat}  tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * @param {limit}  取出歌单数量 , 默认为 50
 * @param {offset} 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 * @return {*}
 */
export const selectSongs = <P>(param:P) => axios.get(`/top/playlist${tool.obj2str(param)}`);

/**
 * @Author: kkk
 * @description: 收藏歌单
 * @param {id}  歌单id
 * @param {t}  取1:收藏,2:取消收藏
 * @return {*}
 */
export const subPlaylist = <P>(param:P) => axios.get(`/playlist/subscribe${tool.obj2str(param)}`);

/**
 * @Author: kkk
 * @description: 相似歌单
 * @param {id} 歌曲id
 * @return {*}
 */
export const simiSongs = (id: number | string) => axios.get(`/simi/playlist?id=${id}&timestamp=${new Date().getTime()}`);
/**
 * @Author: kkk
 * @description: 获取歌单所有歌曲
 * @param {limit} 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
 * @param {id} 歌单id
 * @param {offset} 默认值为0 页码
 * @return {*}
 */
export const songListAllSong = <Param>(param: Param) =>
  axios.get(`/playlist/track/all${tool.obj2str(param)}`);

/**
 * @Author: kkk
 * @description: 获取歌单分类
 * @return {*}
 */
export const songsCat = () => axios.get(`/playlist/catlist`);
/**
 * @Author: kkk
 * @description: 精品歌单标签列表
 * @return {*}
 */
export const hiyTags = () => axios.get(`/playlist/highquality/tags`);

/**
 * @Author: kkk
 * @description: 获取精品歌单
 * @param {cat} 比如 " 华语 "、" 古风 " 、" 欧美 "可从精品歌单标签列表接口获取  --可选
 * @param {limit} 取出的数量
 * @param {before} 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 * @return {*}
 */
export const hiySongs = <P>(param?:P) => axios.get(`/top/playlist/highquality${tool.obj2str(param)}`);

/**
 * @Author: kkk
 * @description: 获取歌单详情
 * @param {id} 歌单id
 * @param {s} 歌单最近的 s 个收藏者,默认为 8
 * @return {*}
 */
export const getSongListDetail = <Param>(param: Param) =>
  axios.get(`/playlist/detail${tool.obj2str(param)}`);

/**
 * @Author: kkk
 * @description: 添加或者删除歌单的歌曲
 * @param {op} 从歌单增加单曲为 add, 删除为 del
 * @param {pid} 歌单id
 * @param {tracks} 歌曲id 可多个,用逗号隔开
 * @return {*}
 */
export const handlePlaylist = <Param>(param: Param) =>
  axios.get(`/playlist/tracks${tool.obj2str(param)}`);

/**
 * @Author: kkk
 * @description: 新建歌单
 * @param {name}  歌单名称
 * @param {privacy} 是否设置为隐私歌单，默认否，传'10'则设置成隐私歌单
 * @param {type} 歌单类型 默认'NORMAL',传 'VIDEO'则为视频歌单,传 'SHARED'则为共享歌单
 * @return {*}
 */
export const newPlaylist = ({
  name,
  privacy = 0,
  type = "NORMAL",
}: {
  name: string;
  privacy: string | number;
  type: string;
}) =>
  axios.get(`/playlist/create?name=${name}&privacy=${privacy}&type=${type}`);
