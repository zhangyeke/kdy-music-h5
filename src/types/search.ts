
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