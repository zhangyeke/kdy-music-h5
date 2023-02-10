/*
 * @Author: 可达鸭 997610780@qq.com
 * @Date: 2023-02-07 21:57:44
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-02-10 17:04:30
 * @FilePath: \zyk-music-h5\src\api\public\playlist.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "@/assets/lib/http";
let tool = useTool();
/**
 * @Author: kkk
 * @description: 相似歌单
 * @param {id} 歌单id
 * @return {*}
 */
export const simiSongs = (id: number) => axios.get(`/simi/playlist?id=${id}`);
/**
 * @Author: kkk
 * @description: 获取歌单所有歌曲
 * @param {limit} 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
 * @param {id} 歌单id
 * @param {offset} 默认值为0 页码
 * @return {*}
 */
export const getSongListAll = <Param>(param: Param) =>
  axios.get(`/playlist/track/all${tool.obj2str(param)}`);

/**
 * @Author: kkk
 * @description: 获取歌单分类
 * @return {*}
 */
export const getSongsCat = () => axios.get(`/playlist/catlist`);
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
