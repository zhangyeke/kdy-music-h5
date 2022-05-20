/*
 * @Author: your name
 * @Date: 2022-03-24 17:16:32
 * @LastEditTime: 2022-05-12 10:10:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\router\route.ts
 */
import {RouteRecordRaw} from "vue-router"

import layout from "@/layout/kdy-page.vue"
import useSongStore from "@/store/song"
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
      {
        path: "/index",
        name: "index",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/pages/index/index.vue"),
      },
      {
        path: "/podcast",
        name: "podcast",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/pages/index/podcast.vue"),
      },
      {
        path: "/center",
        name: "center",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/pages/index/center.vue"),
      },
      {
        path: "/focus",
        name: "focus",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/pages/index/focus.vue"),
      },
      {
        path: "/community",
        name: "community",
        component: () =>
          import(/* webpackChunkName: "index" */ "@/pages/index/community.vue"),
      },
      {
        name: "search",
        path: "/search",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/pages/home/search.vue"),
      },
    ],
  },
  {
    name: "login",
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "public" */ "@/pages/public/login.vue"),
  },
  {
    name: "register",
    path: "/register",
    component: () =>
      import(/* webpackChunkName: "public" */ "@/pages/public/register.vue"),
  },

  {
    name: "404",
    path: "/:pathMatch(.*)*",
    component: () =>
      import(/* webpackChunkName: "public" */ "@/pages/public/404.vue"),
  },
];

export default routes