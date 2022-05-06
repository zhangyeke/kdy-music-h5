import { defineStore } from "pinia";

export default defineStore({
  id: "userStore",
  state: () => {
    return {
      token: "",
      userInfo: {},
    };
  },
  actions: {
    setToken(value: string) {
      this.token = value;
    },
    // 手机密码登录
    async phoneLogin(phone: string | number, pwd: string) {
      let res: any = await kdyAxios.get(
        `/login/cellphone?phone=${phone}&password=${pwd}`
      );
      this.setToken(res.token);
      this.getUserInfo()
      return Promise.resolve()
    },
    // 获取用户信息
    async getUserInfo(){
      let res:any = await kdyAxios.get('/user/account')
      this.userInfo = res.profile
    },
    // 退出登录
    async logout(){
      let res = await kdyAxios.get('/logout')
      this.setToken("")
      this.userInfo = {}
      return Promise.resolve()
    }
  },
  getters: {},
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["token",'userInfo'],
      },
    ],
  },
});
