import {RouteRecordRaw} from "vue-router";

import search from "@/pages/home/search.vue";
import searchResult from "@/pages/home/search-result.vue";
import comment from "@/pages/home/comment.vue";
import singerDetail from "@/pages/home/singer-detail.vue";
import albumDetail from "@/pages/home/album-detail.vue";
import songDetail from "@/pages/home/song-detail.vue";

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
];


export default discover