/*
 * @Author: zyk 997610780@qq.com
 * @Date: 2023-02-07 17:31:02
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-02-07 18:28:10
 * @FilePath: \zyk-music-h5\src\router\module\tabbar.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {RouteRecordRaw} from "vue-router";
import indexPage from "@/pages/index/index.vue";
import podcastPage from "@/pages/index/podcast.vue";
import centerPage from "@/pages/index/center.vue";
import focusPage from "@/pages/index/focus.vue";
import communityPage from "@/pages/index/community.vue";

const tabbar:Array<RouteRecordRaw> = [
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
]

export default tabbar