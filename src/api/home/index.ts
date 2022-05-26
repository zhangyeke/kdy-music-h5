import axios from "@/assets/lib/http";

// 获取首页数据
export const getPageData = ()=> axios('/homepage/block/page')

// 获取banner图
export const getBanner = (type:string | number)=> axios(`/banner?type=${type}`)

// 获取导航栏
export const getNav = () => axios("/homepage/dragon/ball");