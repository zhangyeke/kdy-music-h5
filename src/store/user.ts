import { defineStore } from "pinia";
import { exitLogin } from "@/api/public/index";
import { getUser } from "@/api/my/index";
import { getUserPlaylist } from "@/api/my/index";
import { deletePlaylist } from "@/api/public/playlist";
import { User } from "@/types/user";
import { SongsList } from "@/types/songList";
import { Dialog } from "@varlet/ui";
import {RouteLocationNormalized} from "vue-router"

interface UserPlaylist {
  loveSongs: SongsList[]; //喜欢的歌单
  collectSongs: SongsList[]; //收藏的歌单
  createSongs: SongsList[]; //创建的歌单
  [key: string]: SongsList[];
}
interface UserState {
  token: string;
  userInfo: User;
  playlist: UserPlaylist;
  redirect:RouteLocationNormalized | null;
}
let tool = useTool();
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
      redirect:null
    };
  },
  getters: {
    userId(): number | string {
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
    initPlaylist() {
      this.playlist.loveSongs.length = 0;
      this.playlist.createSongs.length = 0;
      this.playlist.collectSongs.length = 0;
    },
    deletePlaylist(id:string | number,listKey:string) {
      Dialog({
        title: "",
        message: "确定要删除此歌单吗？",
        confirmButtonText: "删除",
        cancelButtonTextColor: "#666",
        onConfirm: async () => {
          await deletePlaylist(id)
          this.playlist[listKey] = this.playlist[listKey].filter(
            (item) => item.id != id
          );
          tool.toast({content:"已删除"})
        }
      });
    },
    // 获取用户歌单
    async getUserPlaylist() {
      let res: any = await getUserPlaylist(this.userId, 1, 10);
      res.playlist.forEach((item: SongsList) => {

        if(item.creator!.userId == this.userId){
          if(item.specialType == 5){
            this.playlist.loveSongs.push(item);
          }else{
            this.playlist.createSongs.push(item);
          }
          
        }else{
          this.playlist.collectSongs.push(item);
        }
      });

      tool.setStorage("user_playlist", this.playlist);
    },
    setToken(value: string) {
      this.token = value;
      tool.setStorage("token", this.token, 72);
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
        followed:false
      };
      tool.setStorage(this.$id, this.userInfo);
      return Promise.resolve();
    },
  },
});
