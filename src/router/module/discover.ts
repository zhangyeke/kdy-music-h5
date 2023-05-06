/*
 * @Author: zyk 997610780@qq.com
 * @Date: 2023-02-07 18:27:57
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-04-11 13:38:49
 * @FilePath: \zyk-music-h5\src\router\module\discover.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {RouteRecordRaw} from "vue-router";

const discover: Array<RouteRecordRaw> = [
  {
    name: "search",
    path: "/search",
    component: () =>
    import(/* webpackChunkName: "home" */ "@/pages/home/search.vue"),
    meta: {
      showPlayer: true,
      title: "搜索",
    },
  },
  {
    name: "searchResult",
    path: "/searchResult/:keyword",
    component: () =>
    import(/* webpackChunkName: "home" */ "@/pages/home/search-result.vue"),
    meta: {
      showPlayer: true,
      title: "搜索结果",
    },
  },
  {
    name: "comment",
    path: "/comment/:type/:id",
    component: () =>
    import(/* webpackChunkName: "home" */ "@/pages/home/comment.vue"),
    meta: {
      showPlayer: false,
      title: "评论",
    },
  },
  {
    name: "singerDetail",
    path: "/singerDetail/:id/:type",
    component: () =>
    import(/* webpackChunkName: "home" */ "@/pages/home/singer-detail.vue"),
    meta: {
      showPlayer: true,
      title: "歌手详情",
    },
  },
  {
    name: "albumDetail",
    path: "/albumDetail/:id",
    component: () =>
    import(/* webpackChunkName: "home" */ "@/pages/home/album-detail.vue"),
    meta: {
      showPlayer: true,
      title: "专辑详情",
    },
  },
  {
    name: "songDetail",
    path: "/songDetail/:id",
    component: () =>
    import(/* webpackChunkName: "home" */ "@/pages/home/song-detail.vue"),
    meta: {
      showPlayer: false,
      title: "歌曲详情",
    },
  },
  {
    name: "everyDayRmd",
    path: "/everyDayRmd",
    component: () =>
    import(/* webpackChunkName: "home" */ "@/pages/home/every-day-rmd.vue"),
    meta: {
      showPlayer: true,
      title: "每日推荐",
    },
  },
  {
    name: "playlistSquare",
    path: "/playlistSquare",
    component: () =>
    import(/* webpackChunkName: "home" */ "@/pages/home/playlist-square.vue"),
    meta: {
      showPlayer: true,
      title: "歌单广场",
      KeepAlive:true
    },
  },
  {
    name: "playlistTag",
    path: "/playlistTag",
    component: () =>
    import(/* webpackChunkName: "home" */ "@/pages/home/playlist-tag.vue"),
    meta: {
      showPlayer: true,
      title: "歌单标签",
    },
  },
  {
    name: "playlist",
    path: "/playlist/:name",
    component: () =>
    import(/* webpackChunkName: "home" */ "@/pages/home/playlist.vue"),
    meta: {
      showPlayer: true,
      title: "歌单",
    },
  },
  {
    name: "playlistDetail",
    path: "/playlistDetail/:id",
    component: () =>
    import(/* webpackChunkName: "home" */ "@/pages/home/playlist-detail.vue"),
    meta: {
      showPlayer: true,
      title: "歌单",
    },
  },
  {
    name: "allSingle",
    path: "/allSingle/:type/:id",
    component: () =>
    import(/* webpackChunkName: "home" */ "@/pages/home/all-single.vue"),
    meta: {
      showPlayer: true,
      title: "全部单曲",
    },
  },
  {
    name: "singerCategory",
    path: "/singerCategory",
    component: () =>
    import(/* webpackChunkName: "home" */ "@/pages/home/singer-category.vue"),
    meta: {
      showPlayer: true,
      title: "歌手分类",
      KeepAlive:true
    },
  },
  {
    name: "rank",
    path: "/rank",
    component: () =>
    import(/* webpackChunkName: "home" */ "@/pages/home/rank.vue"),
    meta: {
      showPlayer: true,
      title: "排行榜",
      KeepAlive:true
    },
  },

];


export default discover