/*
 * @Author: 可达鸭 997610780@qq.com
 * @Date: 2023-03-01 21:07:49
 * @LastEditors: zyk 997610780@qq.com
 * @LastEditTime: 2023-04-17 18:09:46
 * @FilePath: \zyk-music-h5\src\router\module\my.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { RouteRecordRaw } from "vue-router";

const router: Array<RouteRecordRaw> = [
  {
    name: "styleDetail",
    path: "/styleDetail/:id",
    component: () =>
      import(/* webpackChunkName: "musicStyle" */ "@/pages/musicStyle/style-detail.vue"),
    meta: {
      showPlayer: true,
      title: "曲风详情",
    },
  },
];

export default router;
