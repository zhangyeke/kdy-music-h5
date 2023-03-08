import { defineStore } from "pinia";
import { getMusicDetail, getMusicUrl } from "@/api/public/music";
import { Song } from "@/types/song";
import { Artist } from "@/types/user";
import mitt from "@/assets/lib/bus";
const tool = useTool();
interface songStore {
  curSong: Song;
  songList: Song[];
  curSongUrl: string;
  paused: boolean;
  cycleIndex: number;
  progress: number;
  isCalcProgress: boolean;
  duration: number;
  currentTime: number;
  isEnd: boolean;
}
const useSongStore = defineStore({
  id: "songListStore",
  state: (): songStore => {
    return {
      // id: 0, //歌单id
      // sid: 0, //歌曲id
      // 当前播放的歌曲信息
      curSong: {
        id: 0,
        name: "",
        ar: new Array(), //作者
        alia: [],
        //专辑
        al: {
          id: 0,
          name: "",
          pic: 0,
          picUrl: "",
          pic_str: "",
          tns: [],
          alias: [],
          publishTime: 0,
          copyrightId: 0,
          size: 0,
        },
      },
      songList: new Array<Song>(), //歌单
      curSongUrl: "", //当前播放歌曲的url
      paused: true, //音乐播放状态 true:暂停
      cycleIndex: 0, //音乐播放类型 循环播放 随机播放 单曲循环
      progress: 0, //播放的进度 百分比
      isCalcProgress: true, //是否计算播放进度
      duration: 0, //歌曲的时间总长
      currentTime: 0, //歌曲已播放时长
      isEnd: false, //播放结束
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
    // 获取歌曲列表
    async getSongList(ids: string) {
      let res: any = await getMusicDetail(ids);
      let { songs, privileges } = res;
      this.songList.push(...songs);
      return new Promise<void>((resolve, reject) => {
        resolve();
      });
    },
    // 获取歌曲
    async getSong(id: number | string) {
      await this.getSongUrl(id);
      if (!this.songList.some((item: any) => item.id == id)) {
        // 获取歌曲详情
        let reusult: any = await getMusicDetail(id);
        let { songs, privileges } = reusult;
        this.songList.push(...songs);
      }
      this.curSong = this.songList.find((item: any) => item.id == id) as Song;
    },
    // 获取歌曲url
    async getSongUrl(id: number | string) {
      let res = await getMusicUrl(id);
      let [song] = res.data;
      if (song.url) {
        this.curSongUrl = song.url;
      } else {
        tool.toast({
          content: "该歌曲无法播放,已为您切换到下一首歌曲",
          type: "error",
        });
        this.playNext();
      }
    },
    // 播放上一首
    playPrve() {
      let cur_song_index = this.songList.findIndex(
        (item: any) => item.id == this.curSong.id
      );
      let song: Song;
      if (cur_song_index - 1 <= 0) {
        song = this.songList[this.songList.length - 1];
      } else {
        song = this.songList[cur_song_index - 1];
      }
      this.getSong(song.id);
    },
    // 播放下一首
    playNext() {
      let cur_song_index = this.songList.findIndex(
        (item: any) => item.id == this.curSong.id
      );
      let song: Song;
      if (cur_song_index + 1 >= this.songList.length) {
        song = this.songList[0];
      } else {
        song = this.songList[cur_song_index + 1];
      }
      this.getSong(song.id);
    },
    // 预约下一首播放
    nextSong(id: number) {
      return new Promise<void>(async (resolve, reject) => {
        try {
          // 寻找当前播放歌曲的索引
          let cur_song_index = this.songList.findIndex(
            (item) => item.id == this.curSong.id
          );
          // 判断选中的歌曲是否已存在播放列表中
          if (
            this.songList.length &&
            this.songList.some((item) => item.id == id)
          ) {
            // 找出的选中的歌曲
            let song = this.songList.find((item) => item.id == id);
            // 过滤掉选中的歌曲
            this.songList = this.songList.filter((item) => item.id != id);
            // 添加到当前播放歌曲位置的下一个
            this.songList.splice(cur_song_index + 1, 0, song as Song);
          } else {
            // 获取歌曲详情
            let reusult: any = await getMusicDetail(id);
            let { songs, privileges } = reusult;
            let song = songs[0];
            this.songList.splice(cur_song_index + 1, 0, song);
          }
          resolve();
        } catch (e: any) {
          reject(e);
        }
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
    // 歌单循环播放
    loopPlay() {
      // 播放下一首
      if (
        this.songList.findIndex((item: Song) => item.id == this.curSong.id) !=
        this.songList.length - 1
      ) {
        let nextIndex =
          this.songList.findIndex((item: Song) => item.id == this.curSong.id) +
          1;
        this.getSongUrl(this.songList[nextIndex].id);
        this.curSong = this.songList[nextIndex];
      } else {
        // 回到第一首
        this.getSongUrl(this.songList[0].id);
        this.curSong = this.songList[0];
        !this.paused && mitt.emit('playAudio')
      }
      console.log("循环播放");
    },

    // 歌单随机播放
    randomPlay() {
      if (this.songList.length < 2) return;
      let max = this.songList.length;
      let randomIndex = Math.floor(Math.random() * max);
      if (
        randomIndex ==
        this.songList.findIndex((item: Song) => item.id == this.curSong.id)
      ) {
        this.randomPlay();
      } else {
        this.getSongUrl(this.songList[randomIndex].id);
        this.curSong = this.songList[randomIndex];
      }
      console.log("随机播放");
    },
    // 开始播放
    startPlay() {
      mitt.emit("playAudio");
      this.setSongPaused(false);
    },
    // 暂停播放
    pausePlay() {
      mitt.emit("pausedAudio");
      this.setSongPaused(true);
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: [
          "songList",
          "curSong",
          "cycleIndex",
          "showPlayer",
          "progress",
          "currentTime",
          "duration",
        ],
      },
    ],
  },
});

export default useSongStore;
