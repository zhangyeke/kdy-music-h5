/*
 * @Author: your name
 * @Date: 2022-03-24 17:16:32
 * @LastEditTime: 2023-02-07 17:33:43
 * @LastEditors: zyk 997610780@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\router\route.ts
 * 
 */
import {RouteRecordRaw} from "vue-router"

import layout from "@/layout/kdy-page.vue";
import tabbar from "./module/tabbar";
import discover from "./module/discover";

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
    ],
  },
  {
    name: "login",
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "public" */ "@/pages/public/login.vue"),
    meta: {
      showPlayer: false,
      title: "登录",
    },
  },
  {
    name: "register",
    path: "/register",
    component: () =>
      import(/* webpackChunkName: "public" */ "@/pages/public/register.vue"),
    meta: {
      showPlayer: false,
      title: "注册",
    },
  },

  {
    name: "404",
    path: "/:pathMatch(.*)*",
    component: () =>
      import(/* webpackChunkName: "public" */ "@/pages/public/404.vue"),
    meta: {
      showPlayer: false,
      title: "未找到相应页面",
    },
  },
];

export default routes