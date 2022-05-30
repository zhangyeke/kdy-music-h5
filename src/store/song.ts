import { defineStore } from "pinia";
import {getMusicDetail,getMusicUrl} from "@/api/public/music";
import {Song} from "@/types/song";
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
    async getSongList(ids:string) {
      let res: any = await getMusicDetail(ids);
      let { songs, privileges } = res;
      this.songList.push(...songs);
      return new Promise<void>((resolve, reject) => {
        resolve()
      })
    },
    // 获取歌曲
    async getSong(id: number) {
      await this.getSongUrl(id)
      if (!this.songList.some((item: any) => item.id == id)) {
        // 获取歌曲详情
        let reusult: any = await getMusicDetail(id);
        let { songs, privileges } = reusult;
        this.songList.push(...songs);
      }
      this.curSong = this.songList.find((item: any) => item.id == id);
    },
    // 获取歌曲url
    async getSongUrl(id: number) {
      let res = await getMusicUrl(id);
      let [song] = res.data;
      this.curSongUrl = song.url;
    },
    // 下一首播放
    nextSong(id:number){
      return new Promise<void>(async(resolve, reject) => {
        try{
          // 寻找当前播放歌曲的索引
          let cur_song_index = this.songList.findIndex((item: any) => item.id == this.curSong.id);
          // 判断选中的歌曲是否已存在播放列表中
          if (this.songList.length && this.songList.some((item: any) => item.id == id)) {
            // 找出的选中的歌曲
            let song = this.songList.find((item: any) => item.id == id);
            // 过滤掉选中的歌曲
            this.songList = this.songList.filter((item: any) => item.id != id);
            // 添加到当前播放歌曲位置的下一个
            this.songList.splice(cur_song_index + 1, 0, song);
          } else {
            // 获取歌曲详情
            let reusult: any = await getMusicDetail(id);
            let { songs, privileges } = reusult;
            let song = songs[0];
            this.songList.splice(cur_song_index + 1, 0, song);
          }
          resolve()
          }catch(e:any){
            reject(e)
          }
      })
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
