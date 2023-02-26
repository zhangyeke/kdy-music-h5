/*
 * @Author: 可达鸭 997610780@qq.com
 * @Date: 2023-02-13 21:14:21
 * @LastEditors: 可达鸭 997610780@qq.com
 * @LastEditTime: 2023-02-26 20:47:26
 * @FilePath: \zyk-music-h5\src\api\public\comment.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "@/assets/lib/http";
let tool = useTool()
/**
 * @Author: kkk
 * @description: 获取歌曲评论(最新)
 * @param {object} param1
 * @return {*}
 */
 export const getMusicComment = ({id,limit = 30,page = 1}:{id:number,limit?:number,page?:number}) => axios.get(`/comment/music?id=${id}&limit=${limit}&offset=${page*limit}`)

/**
 * @Author: kkk
 * @description: 获取热门评论
 * @param {object} id : 资源 id
 * @param {object} type:资源类型 0-歌曲 1-mv 2-歌单 3-专辑 4-电台 5-视频
 * @return {*}
 */
 export const getHotComment = ({id,type = 0,limit = 30,page = 1}:{id:number,type?:number,limit?:number,page?:number})=> axios.get(`/comment/hot?id=${id}&limit=${limit}&type=${type}&offset=${page*limit}`)

 /**
 * @Author: kkk
 * @description: 获取评论
 * @param {object} id : 资源 id
 * @param {object} type:资源类型 0-歌曲 1-mv 2-歌单 3-专辑 4-电台 5-视频 6-动态
 * @param {object} pageNo 分页参数,第 N 页,默认为 1
 * @param {object} pageSize 分页参数,每页多少条数据,默认 20
 * @param {object} pageSize 分页参数,每页多少条数据,默认 20
 * @param {object} sortType 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
 * @param {object} cursor 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
 * @return {*}
 */
export const getComment = ({
  id,
  type = 0,
  page = 1,
  pageSize = 20,
  sortType,
  cursor,
}: {
  id: number;
  type?: number;
  page?: number;
  pageSize?: number;
  sortType?: number;
  cursor?: number;
}) => axios.get(`/comment/new?id=${id}&type=${type}&pageSize=${pageSize}&sortType=${sortType}&cursor=${cursor}`);


/**
 * @Author: kkk
 * @description: 点赞
 * @param {object} id   资源 id
 * @param {object} cid  评论 id
 * @param {object} t    是否点赞 , 1 为点赞 ,0 为取消点赞
 * @param {object} type 资源类型 0-歌曲 1-mv 2-歌单 3-专辑 4-电台 5-视频 6-动态
 * @return {*}
 */
export const commentLike = ({id,cid,t,type = 0}:{id:number,cid:number,t:number,type?:number}) => axios.get(`/comment/like?id=${id}&cid=${cid}&t=${t}&type=${type}`)

/**
 * @Author: kkk
 * @description: 发送或删除评论
 * @param {object} id   资源 id
 * @param {object} commentId  评论 id
 * @param {object} t    1 发送, 2 回复
 * @param {object} content 发送的内容
 * @param {object} type 资源类型 0-歌曲 1-mv 2-歌单 3-专辑 4-电台 5-视频 6-动态
 * @return {*}
 */
export const commentHandle = ({t,type = 0,id,content,commentId}:{t:number,type?:number,id:number,content:string,commentId?:number})=>axios.get(`/comment?t=${t}&type=${type}&id=${id}&content=${content}&commentId=${commentId}`)

/**
 * @Author: kkk
 * @description: 获取楼层评论
 * @param {object} id   资源 id
 * @param {object} parentCommentId  楼层评论 id
 * @param {object} time 分页参数,取上一页最后一项的 time 获取下一页数据
 * @param {object} type 资源类型 0-歌曲 1-mv 2-歌单 3-专辑 4-电台 5-视频 6-动态
 * @param {object} limit 取出评论数量 , 默认为 20
 * @return {*}
 */
export const getFloorComment = <P extends Object>(params:P) => axios.get(`/comment/floor${tool.obj2str(params)}`);


