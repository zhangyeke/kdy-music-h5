import axios from "@/assets/lib/http";
import {Paging} from "@/types/public";
const tool = useTool()


/**
 * @Author: kkk
 * @description: 获取歌手分类列表
 * @param limit:一页的数量
 * @param page:页码 第几页
 * @param offset: 偏移数量，用于分页
 * @param type :取值:-1:全部 1:男歌手 2:女歌手 3:乐队
 * @param area : -1:全部 7华语 96欧美 8:日本 16韩国 0:其他
 * @param initial : 按首字母索引查找参数
 * @return {*}
 */
 export const singerList = <P extends Object & Paging>(param: P) =>
   axios.get(
     `/artist/list${tool.obj2str(param)}&offset=${
       (param.page - 1) * param.limit
     }`
   );
