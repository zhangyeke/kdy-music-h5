/*
 * @Author: your name
 * @Date: 2022-03-24 17:16:32
 * @LastEditTime: 2022-03-24 17:51:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\router\route.ts
 */
import {RouteRecordRaw} from "vue-router"

const routes:Array<RouteRecordRaw> = [
  {
    name:"index",
    path:"/",
    component: () => import(/* webpackChunkName: "home" */ '@/pages/index/index.vue')
  }
]

export default routes