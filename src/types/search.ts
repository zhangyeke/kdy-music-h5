import {Album,Song} from "./song"
export interface Search{
  title:string,
  id:number
}

export interface SearchHistory{
  list:Search[]
}

// 搜索结果
export interface SearchResult {
  alg: string;
  feature: string;
  keyword: string;
  lastKeyword: string;
  type: number;
}


// 综合结果
export interface SynthesisResult{
  album:{
    albums:Album[],//专辑列表
    more:boolean,//是否有更多
    moreText?:string,//更多专辑按钮文本
    resourceIds:number[]//资源id
  }
  song:{
    more:boolean,//是否有更多
    moreText?:string,//更多专辑按钮文本
    resourceIds:number[]//资源id
    songs:Song[],
    [key:string]:any
  }
}