import {RouteRecordRaw} from "vue-router";

const public_router:Array<RouteRecordRaw> = [
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
]



export default public_router