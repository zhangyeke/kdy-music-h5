/*
 * @Author: 可达鸭 997610780@qq.com
 * @Date: 2023-03-01 21:07:49
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-03-24 15:48:24
 * @FilePath: \zyk-music-h5\src\router\module\my.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { RouteRecordRaw } from "vue-router";

import editPlaylist from "@/pages/my/edit-playlist.vue";
import pushSong from "@/pages/my/push-song.vue";
import batchHandleSong from "@/pages/my/batch-handle-song.vue";
import batchHandlePlaylist from "@/pages/my/batch-handle-playlist.vue";
import latelyPlayed from "@/pages/my/lately-played.vue";
import cloudDisk from "@/pages/my/cloud-disk.vue";
import purchased from "@/pages/my/purchased.vue";
import collect from "@/pages/my/collect.vue";
import goodsFriend from "@/pages/my/goods-friend.vue";
import userDetail from "@/pages/my/user-detail.vue";
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
  {
    name: "batchHandleSong",
    path: "/batchHandleSong/:id/:uid",
    component: batchHandleSong,
    meta: {
      showPlayer: false,
      title: "批量处理歌曲",
    },
  },
  {
    name: "batchHandlePlaylist",
    path: "/batchHandlePlaylist/:key",
    component: batchHandlePlaylist,
    meta: {
      showPlayer: false,
      title: "批量处理歌单",
    },
  },
  {
    name: "latelyPlayed",
    path: "/latelyPlayed",
    component: latelyPlayed,
    meta: {
      showPlayer: true,
      title: "最近播放",
      KeepAlive:true
    },
  },
  {
    name: "cloudDisk",
    path: "/cloudDisk",
    component: cloudDisk,
    meta: {
      showPlayer: true,
      title: "音乐云盘"
    },
  },
  {
    name: "purchased",
    path: "/purchased",
    component: purchased,
    meta: {
      showPlayer: false,
      title: "已购"
    },
  },
  {
    name: "collect",
    path: "/collect",
    component: collect,
    meta: {
      showPlayer: false,
      title: "我的收藏"
    },
  },
  {
    name: "goodsFriend",
    path: "/goodsFriend",
    component: goodsFriend,
    meta: {
      showPlayer: true,
      title: "我的好友"
    },
  },
  {
    name: "userDetail",
    path: "/userDetail/:id",
    component: userDetail,
    meta: {
      showPlayer: true,
      title: "个人主页"
    },
  },
];

export default router;
