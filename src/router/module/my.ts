/*
 * @Author: 可达鸭 997610780@qq.com
 * @Date: 2023-03-01 21:07:49
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-04-06 14:52:13
 * @FilePath: \zyk-music-h5\src\router\module\my.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { RouteRecordRaw } from "vue-router";

const router: Array<RouteRecordRaw> = [
  {
    name: "editPlaylist",
    path: "/editPlaylist/:id",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/pages/my/edit-playlist.vue"),
    meta: {
      showPlayer: false,
      title: "编辑歌单信息",
    },
  },
  {
    name: "pushSong",
    path: "/pushSong/:id",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/pages/my/push-song.vue"),
    meta: {
      showPlayer: true,
      title: "添加音乐到歌单",
    },
  },
  {
    name: "batchHandleSong",
    path: "/batchHandleSong/:id/:uid",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/pages/my/batch-handle-song.vue"),
    meta: {
      showPlayer: false,
      title: "批量处理歌曲",
    },
  },
  {
    name: "batchHandlePlaylist",
    path: "/batchHandlePlaylist/:key",
    component: () =>
      import(
        /* webpackChunkName: "my" */ "@/pages/my/batch-handle-playlist.vue"
      ),
    meta: {
      showPlayer: false,
      title: "批量处理歌单",
    },
  },
  {
    name: "latelyPlayed",
    path: "/latelyPlayed",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/pages/my/lately-played.vue"),
    meta: {
      showPlayer: true,
      title: "最近播放",
      KeepAlive: true,
    },
  },
  {
    name: "cloudDisk",
    path: "/cloudDisk",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/pages/my/cloud-disk.vue"),
    meta: {
      showPlayer: true,
      title: "音乐云盘",
    },
  },
  {
    name: "purchased",
    path: "/purchased",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/pages/my/purchased.vue"),
    meta: {
      showPlayer: false,
      title: "已购",
    },
  },
  {
    name: "collect",
    path: "/collect",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/pages/my/collect.vue"),
    meta: {
      showPlayer: false,
      title: "我的收藏",
    },
  },
  {
    name: "goodFriend",
    path: "/goodFriend",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/pages/my/good-friend.vue"),
    meta: {
      showPlayer: true,
      title: "我的好友",
    },
  },
  {
    name: "userDetail",
    path: "/userDetail/:id",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/pages/my/user-detail.vue"),
    meta: {
      showPlayer: true,
      title: "个人主页",
    },
  },
  {
    name: "userPlaylist",
    path: "/userPlaylist/:nickname/:id/:type",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/pages/my/user-playlist.vue"),
    meta: {
      showPlayer: false,
      title: "用户歌单",
    },
  },
  {
    name: "editUserInfo",
    path: "/editUserInfo",
    component: () =>
      import(/* webpackChunkName: "my" */ "@/pages/my/edit-user-info.vue"),
    meta: {
      showPlayer: false,
      title: "我的资料",
    },
  },
];

export default router;
