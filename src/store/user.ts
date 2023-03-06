import { defineStore } from "pinia";
import {exitLogin} from "@/api/public/index";
import {getUser} from "@/api/my/index";
import {User} from "@/types/user";
import { SongsList } from "@/types/songList";
import {getUserPlaylist } from "@/api/my/index";

interface UserPlaylist {
  loveSongs: SongsList[]; //喜欢的歌单
  collectSongs: SongsList[]; //收藏的歌单
  createSongs: SongsList[]; //创建的歌单
}
interface UserState {
  token:string,
  userInfo:User,
  playlist:UserPlaylist
}
let tool = useTool()
export default defineStore({
  id: "userStore",
  state: (): UserState => {
    return {
      token: tool.getStorage("token"),
      userInfo: tool.getStorage("userStore"),
      playlist: tool.getStorage("user_playlist") || {
        loveSongs: [],
        collectSongs: [],
        createSongs: [],
      },
    };
  },
  getters: {
    userId(): number {
      return this.userInfo.userId;
    },
    loveSongs(): SongsList[] {
      return this.playlist.loveSongs;
    },
    collectSongs(): SongsList[] {
      return this.playlist.collectSongs;
    },
    createSongs(): SongsList[] {
      return this.playlist.createSongs;
    },
    // allPlaylist(): SongsList[] {
    //   return [...this.loveSongs,...this.collectSongs,...this.createSongs]
    // },
  },
  actions: {
    initPlaylist(){
      this.playlist.loveSongs.length = 0
      this.playlist.createSongs.length = 0
      this.playlist.collectSongs.length = 0
    },

    // 获取用户歌单
    async getUserPlaylist() {
      let res: any = await getUserPlaylist(this.userId, 1, 300);
      res.playlist.forEach((item: SongsList) => {
        if (item.specialType == 5 && !item.subscribed) {
          this.playlist.loveSongs.push(item);
        } else if (item.subscribed) {
          this.playlist.collectSongs.push(item);
        } else {
          this.playlist.createSongs.push(item);
        }
      });

      tool.setStorage("user_playlist", this.playlist);
    },
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
        gender: 0,
      };
      tool.setStorage(this.$id, this.userInfo);
      return Promise.resolve();
    },
  },
});
