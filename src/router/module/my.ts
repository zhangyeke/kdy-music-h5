import { RouteRecordRaw } from "vue-router";

import editPlaylist from "@/pages/my/edit-playlist.vue";
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
];

export default router;
