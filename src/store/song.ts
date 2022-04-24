import { defineStore } from "pinia";
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
    };
  },

  actions: {
    setSongPaused(status: boolean) {
      this.paused = status;
    },
    getSongList() {},
    async getSong(id: number) {
      // 获取歌单url
      let res: any = await this.getSongUrl(id);
      if (!this.songList.some((item: any) => item.id == id)) {
        // 获取歌曲详情
        let reusult: any = await kdyAxios.get(`/song/detail?ids=${id}`);
        let { songs, privileges } = reusult;
        songs = songs.map((item: any) => {
          item.song_url = res.url;
          return item;
        });
        this.songList.push(...songs);
      }
      this.curSong = this.songList.find((item: any) => item.id == id);
      console.log("当前播放的歌曲是：",id,this.curSongUrl);
      
    },
    async getSongUrl(id: number) {
      // 获取歌单url
      let res = await kdyAxios.get(`/song/url?id=${id}`);
      let [song] = res.data;
      this.curSongUrl = song.url;
      return new Promise<void>((resolve, reject) => {
        resolve(song);
      });
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["songList", "curSong"],
      },
    ],
  },
});

export default useSongStore;
