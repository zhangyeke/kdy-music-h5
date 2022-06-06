/*
 * @Author: your name
 * @Date: 2022-03-24 17:16:32
 * @LastEditTime: 2022-06-06 16:19:20
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
import comment from "@/pages/home/comment.vue";
import singerDetail from "@/pages/home/singer-detail.vue";
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
        component: indexPage,
        meta: {
          showPlayer: true,
          title: "首页",
        },
      },
      {
        path: "/podcast",
        name: "podcast",
        component: podcastPage,
        meta: {
          showPlayer: true,
          title: "播客",
        },
      },
      {
        path: "/center",
        name: "center",
        component: centerPage,
        meta: {
          showPlayer: true,
          title: "我的",
        },
      },
      {
        path: "/focus",
        name: "focus",
        component: focusPage,
        meta: {
          showPlayer: true,
          title: "关注",
        },
      },
      {
        path: "/community",
        name: "community",
        component: communityPage,
        meta: {
          showPlayer: true,
          title: "云村",
        },
      },
      {
        name: "search",
        path: "/search",
        component: search,
        meta: {
          showPlayer: true,
          title: "搜索",
        },
      },
      {
        name: "searchResult",
        path: "/searchResult/:keyword",
        component: searchResult,
        meta: {
          showPlayer: true,
          title: "搜索结果",
        },
      },
      {
        name: "comment",
        path: "/comment/:id",
        component: comment,
        meta: {
          showPlayer: false,
          title: "评论",
        },
      },
      {
        name: "singerDetail",
        path: "/singerDetail/:id",
        component: singerDetail,
        meta: {
          showPlayer: true,
          title: "歌手详情",
        },
      },
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