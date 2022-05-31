/*
 * @Author: your name
 * @Date: 2022-03-24 17:16:32
 * @LastEditTime: 2022-05-31 10:10:25
 * @LastEditors: [you name]
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \zyk-music-h5\src\router\route.ts
 * 
 */
import {RouteRecordRaw} from "vue-router"

import layout from "@/layout/kdy-page.vue";
import indexPage from "@/pages/index/index.vue";
import podcastPage from "@/pages/index/podcast.vue";
import centerPage from "@/pages/index/center.vue";
import focusPage from "@/pages/index/focus.vue";
import communityPage from "@/pages/index/community.vue";
import search from "@/pages/home/search.vue";
import searchResult from "@/pages/home/search-result.vue";
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
      {
        path: "/index",
        name: "index",
        component:indexPage,
      },
      {
        path: "/podcast",
        name: "podcast",
        component:podcastPage,
      },
      {
        path: "/center",
        name: "center",
        component:centerPage,
      },
      {
        path: "/focus",
        name: "focus",
        component: focusPage,
      },
      {
        path: "/community",
        name: "community",
        component:communityPage,
      },
      {
        name: "search",
        path: "/search",
        component:search,
      },
      {
        name: "searchResult",
        path: "/searchResult/:keyword",
        component:searchResult,
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