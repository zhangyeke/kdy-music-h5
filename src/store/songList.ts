import { defineStore } from "pinia";

const useSongListStore = defineStore("songListStore", {
  state: () => {
    return {
      id: 0,//歌单id
      sid:1,//要播放的歌曲
    };
  },
});

export default useSongListStore;
