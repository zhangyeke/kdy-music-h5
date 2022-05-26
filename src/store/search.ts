import { getSearchResult } from "@/api/home/search";
import {SynthesisResult} from "@/types/search";
import {Song,Single} from "@/types/song";
import {searchTypes,searchType} from "@/enum-file/search-types"
interface searchState {
  keyword:string,//搜索关键词
  type:number,//搜索类型
  page:number,//第几页
  limit:number,//一页返回数量
  count:number,//数据总数
  list:Array<any>,
  result:SynthesisResult
}
export default defineStore({
  id:"search",
  state: ():searchState=>{
    return {
      keyword:"",//搜索关键词
      type:0,//搜索类型
      page:1,//第几页
      limit:10,//一页返回数量
      count:0,//数据总数
      list:new Array,
      result:<SynthesisResult>{},
    }
  },
  getters:{
    // 单曲列表
    song_list():Song[] | Single[]{
      return this.result?.song?.songs || this.list
    },
    countKey():string{
      let i = searchTypes.findIndex((item:searchType)=>item.value == this.type)
      return searchTypes[i].countKey
    },
    listKey(){
      let i = searchTypes.findIndex((item:searchType)=>item.value == this.type)
      return searchTypes[i].listKey
    },
    pageCount():number{
      return Math.floor(this.count / this.limit) || 1
    }
  },
  actions:{
    lookMore(value:number){
      this.type = value
    },
    /**
     * @Author: kkk
     * @description: 初始化请求参数
     * @return {*}
     */
    initParams(){
      this.page = 1
      this.list.length = 0
    },
    /**
     * @Author: kkk
     * @description: 获取搜索结果
     * @return {*}
     */
    getList(){
      return new Promise<boolean>((resolve, reject) => {
        getSearchResult({
          keywords: this.keyword,
          type: this.type,
          page: this.page,
          limit: this.limit,
        }).then((res: any) => {
          if (this.type == 1018) {
            this.list.length = 0;
            this.result = res.result;
          } else {
            this.result = <SynthesisResult>{};
            this.list = res.result[this.listKey]
            this.count = res.result[this.countKey]
          }
          console.log(res, "结果列表", this.list);
          resolve(true)
        }).catch((e:Error)=>{
          reject(e)
        })
      });
    }
  }
})