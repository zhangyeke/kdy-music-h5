/*
 * @Author: zyk 997610780@qq.com
 * @Date: 2022-06-27 16:49:17
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-04-17 18:22:57
 * @FilePath: \zyk-music-h5\src\router\routes.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import {RouteRecordRaw} from "vue-router"

import layout from "@/layout/kdy-page.vue";
import tabbar from "./module/tabbar";
import discover from "./module/discover";
import musicStyle from "./module/music-style";
import my from "./module/my";
import public_router from "./module/public";
import useSongStore from "@/store/song";

// import(/* webpackChunkName: "index" */ "@/pages/index/community.vue")
const routes: Array<RouteRecordRaw> = [
  {
    name: "layout",
    path: "/",
    component: layout,
    redirect: "/index",
    beforeEnter: () => {
      let songStore = useSongStore();
      songStore.getSongUrl(songStore.curSong.id);
    },
    children: [
      ...tabbar,
      ...discover,
      ...musicStyle,
      ...my,
      ...public_router
    ],
  },

];

export default routes