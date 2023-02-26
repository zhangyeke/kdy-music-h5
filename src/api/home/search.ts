/*
 * @Author: 可达鸭 997610780@qq.com
 * @Date: 2023-02-13 21:14:21
 * @LastEditors: 可达鸭 997610780@qq.com
 * @LastEditTime: 2023-02-26 20:48:19
 * @FilePath: \zyk-music-h5\src\api\home\search.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "@/assets/lib/http";

const tool = useTool()
// 获取默认搜索关键词
export const getDefaultKeyword = () => axios.get('/search/default');

// 搜索建议
export const searchAdvice = (value:string)=> axios.get(`/search/suggest?keywords=${value}&type=mobile`)

/**
 * @Author: kkk
 * @description: 获取搜索结果
 * @param keywords: 关键词
 * @param limit:返回数量
 * @param offset:偏移数量，用于分页
 * @param type:搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音
 * @return {*}
 */
export const searchResult = <P extends Object>(p:P)=> axios.get(`/cloudsearch${tool.obj2str(p)}`)