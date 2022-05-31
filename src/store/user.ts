import { defineStore } from "pinia";
import {exitLogin} from "@/api/public/index";
import {getUser} from "@/api/my/index";
import {User} from "@/types/user"
interface UserState {
  token:string,
  userInfo:User
}
let tool = useTool()
export default defineStore({
  id: "userStore",
  state: (): UserState => {
    return {
      token: tool.getStorage("token"),
      userInfo: tool.getStorage("userStore"),
    };
  },
  getters:{
    userId():number{
      return this.userInfo.userId
    }
  },
  actions: {
    setToken(value: string) {
      this.token = value;
      tool.setStorage("token", this.token);
    },
    // 获取用户信息
    async getUserInfo() {
      let res: any = await getUser();
      this.userInfo = res.profile;
      tool.setStorage(this.$id, this.userInfo);
    },
    // 退出登录
    async logout() {
      await exitLogin();
      tool.removeStorage(this.$id);
      this.setToken("");
      this.userInfo = {
        nickname: "",
        userId: 0,
        userName: "",
        avatarUrl: "",
        backgroundUrl: "",
        gender:0,
      };
      tool.setStorage(this.$id, this.userInfo);
      return Promise.resolve();
    },
  },
});
