import { defineStore } from "pinia";
export default defineStore({
  id: "userStore",
  state: () => {
    return {
      token: "",
      userInfo:{
        nickname: "",
        userId: 0,
        userName: "",
        avatarUrl: "",
        backgroundUrl: "",
      },
    };
  },
  actions: {
    setToken(value: string) {
      this.token = value;
    },
    // 获取用户信息
    async getUserInfo() {
      let res: any = await kdyAxios.get("/user/account");
      console.log(res,"用户信息");
      this.userInfo = res.profile;
    },
    // 退出登录
    async logout() {
      let res = await kdyAxios.get("/logout");
      this.$reset()
      return Promise.resolve();
    },
  },
  getters: {},
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["token", "userInfo"],
      },
    ],
  },
});
