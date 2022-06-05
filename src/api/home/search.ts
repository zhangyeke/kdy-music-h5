import axios from "@/assets/lib/http";
// 获取默认搜索关键词
export const getDefaultKeyword = () => axios.get('/search/default');

// 搜索建议
export const searchAdvice = (value:string)=> axios.get(`/search/suggest?keywords=${value}&type=mobile`)

// 获取搜索结果
export const getSearchResult = ({keywords,type,limit,page}:{keywords:string,type:number,limit?:number,page?:number})=> axios.get(`/search?keywords=${keywords}&type=${type}${limit && page?`&limit=${page*limit}`:''}`)