/*
 * @Author: your name
 * @Date: 2022-03-24 17:16:32
 * @LastEditTime: 2022-03-31 20:51:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\router\route.ts
 */
import {RouteRecordRaw} from "vue-router"

import layout from "@/layout/kdy-page.vue"

const routes:Array<RouteRecordRaw> = [
  {
    name:"layout",
    path:"/",
    component:layout,
    redirect:"/index",
    children:[
      {
        path:"/index",
        name:"index",
        component: () => import(/* webpackChunkName: "home" */"@/pages/index/index.vue")
      }
    ]
  },
  {
    name:"login",
    path:"/login",
    component: () => import("@/pages/login/login.vue")
  },
  {
    name:"404",
    path:"/:pathMatch(.*)*",
    component: () => import("@/pages/404/404.vue")
  }
]

export default routes