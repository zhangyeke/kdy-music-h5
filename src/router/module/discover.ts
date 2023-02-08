/*
 * @Author: zyk 997610780@qq.com
 * @Date: 2023-02-07 18:27:57
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-02-08 16:47:00
 * @FilePath: \zyk-music-h5\src\router\module\discover.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {RouteRecordRaw} from "vue-router";

import search from "@/pages/home/search.vue";
import searchResult from "@/pages/home/search-result.vue";
import comment from "@/pages/home/comment.vue";
import singerDetail from "@/pages/home/singer-detail.vue";
import albumDetail from "@/pages/home/album-detail.vue";
import songDetail from "@/pages/home/song-detail.vue";
import everyDayRmd from "@/pages/home/every-day-rmd.vue";
import playlistSquare from "@/pages/home/playlist-square.vue";
const discover: Array<RouteRecordRaw> = [
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
    path: "/comment/:id/:type",
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
  {
    name: "albumDetail",
    path: "/albumDetail/:id",
    component: albumDetail,
    meta: {
      showPlayer: true,
      title: "专辑详情",
    },
  },
  {
    name: "songDetail",
    path: "/songDetail/:id",
    component: songDetail,
    meta: {
      showPlayer: false,
      title: "歌曲详情",
    },
  },
  {
    name: "everyDayRmd",
    path: "/everyDayRmd",
    component: everyDayRmd,
    meta: {
      showPlayer: true,
      title: "每日推荐",
    },
  },
  {
    name: "playlistSquare",
    path: "/playlistSquare",
    component: playlistSquare,
    meta: {
      showPlayer: true,
      title: "歌单广场",
    },
  },
];


export default discover