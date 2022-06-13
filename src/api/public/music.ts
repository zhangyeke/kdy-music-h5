import axios from "@/assets/lib/http";
let tool = useTool()
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
 * @description: 添加或者删除歌单的歌曲
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

  
/**
 * @Author: kkk
 * @description: 获取专辑详情
 * @param {number} id 专辑id
 * @return {*}
 */
export const getAlbumDetail = (id:number|string)=> axios.get(`/album?id=${id}`)


/**
 * @Author: kkk
 * @description:收藏专辑
 * @param {*} id 专辑id 
 * @param {*} t 1为收藏 其他为取消
 * @return {*}
 */
export const collectAlbum = <P>(params:P)=> axios.get(`/album/sub${tool.obj2str(params)}`)