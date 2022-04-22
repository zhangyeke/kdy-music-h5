import { defineStore } from "pinia";
const useSongStore = defineStore({
  id: "songListStore",
  state: () => {
    return {
      id: 0, //歌单id
      sid: 0, //歌曲id
      // 当前播放的歌曲
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
        song_url: {},
      },
      songList: <any>[], //歌单
    };
  },
  actions: {
    getSongList() {},
    async getSong(id: number) {
      if (!this.songList.some((item: any) => item.id == id)) {
        // 获取歌单url
        let res = await kdyAxios.get(`/song/url?id=${id}`);
        // 获取歌曲详情
        let reusult: any = await kdyAxios.get(`/song/detail?ids=${id}`);
        let { songs, privileges } = reusult;
        let [url] = res.data;
        songs = songs.map((item: any) => {
          item.song_url = url;
          return item;
        });
        this.songList.push(...songs);
      }
      this.curSong = this.songList.find((item: any) => item.id == id);
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
