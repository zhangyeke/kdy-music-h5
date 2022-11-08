/*
 * @Author: your name
 * @Date: 2022-03-24 17:14:21
 * @LastEditTime: 2022-11-04 10:25:28
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\router\index.ts
 */

import {createRouter, createWebHistory} from "vue-router"
import routes from "./routes";
import NProgress from 'nprogress';
import { tabBarList, TabBar } from '@/enum-file/tabbar';
let tool = useTool()
const router = createRouter({
  routes,
  history:createWebHistory()
})

// 路由前置守卫
router.beforeEach((to, from) => {
  tool.setStorage('is_tab',tabBarList.findIndex((item:TabBar)=>to.path == item.pagePath) != -1)
	NProgress.start()
})
// 路由后置守卫
router.afterEach((to,from) => {
	NProgress.done()
})


export default router