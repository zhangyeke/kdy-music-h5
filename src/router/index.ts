/*
 * @Author: your name
 * @Date: 2022-03-24 17:14:21
 * @LastEditTime: 2023-03-07 12:16:26
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\router\index.ts
 */

import {createRouter, createWebHistory,createWebHashHistory} from "vue-router"
import routes from "./routes";
import NProgress from 'nprogress';
import { tabBarList, TabBar } from '@/enum-file/tabbar';
import pinia from "@/store/index";
import useUserStore from "@/store/user";
let tool = useTool()
const router = createRouter({
  routes,
  history:createWebHistory(import.meta.env.VITE_BASE_PATH),
  // history:createWebHashHistory()
  scrollBehavior(){
    return {top:0}
  }
})
// 跳转白名单
let jump_white = ["login","register","404",'/']
let userStore = useUserStore(pinia)
// 路由前置守卫
router.beforeEach((to, from,next) => {
  tool.setStorage('is_tab',tabBarList.findIndex((item:TabBar)=>to.path == item.pagePath) != -1)
  let token = tool.getStorage('token')
  if(!token && !jump_white.includes(to.name as string)){
    userStore.redirect = to
    tool.toast({content:"登录时间已失效,请重新登录"})
    return next("/login")
  }
	NProgress.start()
  next()
})
// 路由后置守卫
router.afterEach((to,from) => {
	NProgress.done()
})


export default router