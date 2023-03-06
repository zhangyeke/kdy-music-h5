import { RouteRecordRaw } from "vue-router";

import editPlaylist from "@/pages/my/edit-playlist.vue";
import pushSong from "@/pages/my/push-song.vue";
const router: Array<RouteRecordRaw> = [
  {
    name: "editPlaylist",
    path: "/editPlaylist/:id",
    component: editPlaylist,
    meta: {
      showPlayer: false,
      title: "编辑歌单信息",
    },
  },
  {
    name: "pushSong",
    path: "/pushSong/:id",
    component: pushSong,
    meta: {
      showPlayer: true,
      title: "添加音乐到歌单",
    },
  },
];

export default router;
