import axios from "@/assets/lib/http";
// 获取默认搜索关键词
export const getDefaultKeyword = () => axios.get('/search/default');

// 搜索建议
export const searchAdvice = (value:string)=> axios.get(`/search/suggest?keywords=${value}&type=mobile`)