import { defineStore } from "pinia";
import {getMusicDetail,getMusicUrl} from "@/api/public/music"
const useSongStore = defineStore({
  id: "songListStore",
  state: () => {
    return {
      id: 0, //歌单id
      sid: 0, //歌曲id
      // 当前播放的歌曲信息
      curSong: {
        id: 0,
        name: "",
        ar: <any>[], //作者
        //专辑
        al: {
          id: 0,
          name: "",
          pic: 0,
          picUrl: "",
          pic_str: "",
          tns: [],
        },
      },
      songList: <any>[], //歌单
      curSongUrl: "", //当前播放歌曲的url
      paused: true, //音乐播放状态 true:暂停
      cycleIndex: 0, //音乐播放类型 循环播放 随机播放 单曲循环
    };
  },

  actions: {
    // 设置播放类型
    setCycle(i: number) {
      this.cycleIndex = i;
    },
    // 设置播放状态
    setSongPaused(status: boolean) {
      this.paused = status;
    },
    getSongList() {},
    // 获取歌曲
    async getSong(id: number) {
      // 获取歌单url
      let res: any = await this.getSongUrl(id);
      if (!this.songList.some((item: any) => item.id == id)) {
        // 获取歌曲详情
        let reusult: any = await getMusicDetail(id);
        let { songs, privileges } = reusult;
        songs = songs.map((item: any) => {
          item.song_url = res.url;
          return item;
        });
        this.songList.push(...songs);
      }
      this.curSong = this.songList.find((item: any) => item.id == id);
    },
    // 获取歌曲url
    async getSongUrl(id: number) {
      let res = await getMusicUrl(id);
      let [song] = res.data;
      this.curSongUrl = song.url;
      return new Promise<void>((resolve, reject) => {
        resolve(song);
      });
    },
    // 删除歌单
    deleteSong(id: number) {
      this.songList = this.songList.filter((item: any) => item.id != id);
    },
    // 清空播放歌单
    clearSongList() {
      this.songList.length = 0;
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["songList", "curSong", "cycleIndex"],
      },
    ],
  },
});

export default useSongStore;
